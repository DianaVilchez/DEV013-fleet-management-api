import express from 'express'

const router = express.Router()

router.get('/',(_req,res) => {
 res.send('taxis rutas')
})

router.post('/',(_req, res) => {
    res.send('guardar taxis rutas')
})

export default router