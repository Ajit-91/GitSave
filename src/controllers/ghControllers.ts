import { RequestHandler } from "express";
import catchError from "../utils/catchError";
import axios, { AxiosResponse } from 'axios'

export const addRepoData: RequestHandler = catchError(async (req, res, next) => {
    const url: string = req.body.url
    // fetcj data from given url using axios
    const data: AxiosResponse = await axios.get(url)
    console.log({ data })
    // parse data

    // save data to postgresql database
        
    // send response
    res.status(200).json({
        status: "success",
        data
    })
})


export const getRepoData: RequestHandler = catchError(async (req, res, next) => {
    // fetch data from postgresql database
    // send response
    res.status(200).json({
        status: "success",
        data: "data"
    })
})