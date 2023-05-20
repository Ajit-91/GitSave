import express, {Express, Request, Response, json, urlencoded } from 'express'
import errorHandler from './middlewares/errorhandler'
import cors from 'cors'
import ghRoutes from './routes/ghRoutes'
import dotenv from 'dotenv';

dotenv.config();

const app : Express = express()

const PORT : number= 8000


// ----------MiddleWares--------------------------
app.use(json())
app.use(urlencoded({extended : true}))
app.use(cors())
// ----------MiddleWares--------------------------



//  -----------Routes-----------------------------
app.use('/github', ghRoutes)


app.get('/', (req: Request, res: Response)=>{
    res.send("Welcome to github api")
})
//  -----------Routes-----------------------------



// ----------Error Handler------------------------
app.use(errorHandler);


app.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}`)
})