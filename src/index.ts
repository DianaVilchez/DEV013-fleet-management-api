import express from "express"
// import taxisRouter from './routes/taxis'
const app = express()
app.use(express.json()) //middleware tranforma la req.body a un json

const PORT = 3000 
//endpoint
app.get('/ping',(_req, res) =>{
    console.log('someone pinged here!!')
    res.send('pong')
})
app.use('/api',taxisRouter )

app.listen(PORT,() => {
     console.log(`server running on port ${PORT}`)
})
