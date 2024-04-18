import express from "express"
const app = express()
app.use(express.json()) //middleware tranforma la req.body a un json
const PORT = 3000 

