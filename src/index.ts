import express, {Express, Request, Response, json, urlencoded } from 'express'
import errorHandler from './middlewares/errorhandler'
import cors from 'cors'
import ghRoutes from './routes/ghRoutes'
import dotenv from 'dotenv';
import { createTableIfNotExists } from './config/db';

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
// ----------Error Handler------------------------


createTableIfNotExists()
  .then(() => {
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error setting up the database:', error);
  });