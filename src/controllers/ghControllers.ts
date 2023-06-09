import { RequestHandler } from "express";
import catchError from "../utils/catchError";
import axios, { AxiosResponse } from 'axios'
import pool from "../config/db";
import AppError from "../utils/AppError";
import Repo from "../interfaces/Repo";


export const addRepoData: RequestHandler = catchError(async (req, res, next) => {

    const url: string = req.body.url

    // validate url
    const regex: RegExp = /^https:\/\/api\.github\.com\/users\/[^/]+\/repos$/;
    if (!regex.test(url)) throw new AppError(400, "Please provide a valid github url to fetch data")

    // fetch data from given url using axios
    const response: AxiosResponse = await axios.get(url)
    // console.log({ response })
    if (response.status !== 200 || !response.data) throw new AppError(400, "Cannot fetch data from the given url")

    // save data to postgresql database
    const promises = response.data.map((repo: any) => {

        const owner = JSON.stringify({
            id: repo.owner.id,
            avatar_url: repo.owner.avatar_url,
            html_url: repo.owner.html_url,
            type: repo.owner.type,
            site_admin: repo.owner.site_admin
        })
        // insert the data only if it is not already present in the database
        // if the data is already present then do nothing
        return pool.query(`
            INSERT INTO repos (
            id, 
            name, 
            html_url, 
            description, 
            created_at, 
            open_issues, 
            watchers, 
            owner
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT (id) DO NOTHING`,
            [repo.id, repo.name, repo.html_url, repo.description, repo.created_at, repo.open_issues, repo.watchers, owner])
    })
 
    const results = await Promise.all(promises);
    const insertedRows = results.filter((result) => result.rowCount > 0);

    if (insertedRows.length === 0) {
      throw new AppError(409, "All the repos are already saved in the database");
    }

    // send response
    res.status(200).json({
        success: true,
        message: "Data saved successfully"
    })
})


export const getRepoData: RequestHandler = catchError(async (req, res, next) => {
    const id: string = req.params.id
    // check if id is valid integer ort not, if not then throw error
    if (!Number(id)) throw new AppError(400, "Please provide a valid id")

    // fetch data from postgresql database
    const repoData = await pool.query(`SELECT * FROM repos WHERE id = $1`, [id])

    let data: Repo | {}

    if (repoData.rows.length === 0) {
        data = {}
    } else {
        data = repoData.rows[0]
    }

    // send response
    res.status(200).json({
        success: true,
        data
    })
})

