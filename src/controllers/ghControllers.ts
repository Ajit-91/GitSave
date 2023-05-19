import { RequestHandler } from "express";
import catchError from "../utils/catchError";
import axios, { AxiosResponse } from 'axios'
import pool from "../config/db";
import AppError from "../utils/AppError";
import Repo from "../interfaces/Repo";


export const addRepoData: RequestHandler = catchError(async (req, res, next) => {

    const url: string = req.body.url
    // validate url
    const regex : RegExp = /^https:\/\/api\.github\.com\/users\/[^/]+\/repos$/;
    if(!regex.test(url)) throw new AppError(400, "Please provide a valid github url")
    
    // fetcj data from given url using axios
    const response: AxiosResponse = await axios.get(url)
    console.log({ response })
    if(response.status !== 200 || !response.data) throw new AppError(400, "Cannot fetch data from the given url")

     // save data to postgresql database
    const promises = response.data.map((repo : Repo) => {
        return pool.query(`
        INSERT INTO repos (
        id, 
        name, 
        html_url, 
        description, 
        created_at, 
        open_issues, 
        watchers, 
        owner_id, 
        owner_avatar_url, 
        owner_html_url, 
        owner_type, 
        owner_site_admin
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 , $11, $12)`, 
        [repo.id, repo.name, repo.html_url, repo.description, repo.created_at, repo.open_issues, repo.watchers, repo.owner.id, repo.owner.avatar_url, repo.owner.html_url, repo.owner.type, repo.owner.site_admin])
    })
    const data = await Promise.all(promises)
    console.log({ data })

    // send response
    res.status(200).json({
        status: "success"
    })
})


export const getRepoData: RequestHandler = catchError(async (req, res, next) => {
    // fetch data from postgresql database
    const data = await pool.query(`SELECT * FROM repos WHERE id = $1`, [req.params.id])
    console.log({ data })
    if(data.rows.length === 0) throw new AppError(404, "No data found")
    
    const finalData : Repo = {
        id: data.rows[0].id,
        name: data.rows[0].name,
        html_url: data.rows[0].html_url,
        description: data.rows[0].description,
        created_at: data.rows[0].created_at,
        open_issues: data.rows[0].open_issues,
        watchers: data.rows[0].watchers,
        owner: {
            id: data.rows[0].owner_id,
            avatar_url: data.rows[0].owner_avatar_url,
            html_url: data.rows[0].owner_html_url,
            type: data.rows[0].owner_type,
            site_admin: data.rows[0].owner_site_admin
        }
    }
    // send response
    res.status(200).json({
        success: true,
        data: finalData
    })
})