const express = require('express')
const router = express.Router()

const { conexion, connection } = require('./database/db')

router.get('/', async (req, res) => {
    try {
        const [results] = await connection.query('SELECT * FROM users');
        console.log(results)
        res.render('index', {results: results});
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal"});
    }
})

router.get('/create', (req, res) => {
    res.render('create')
})

router.get('/edit/:id', (req, res) => {
    const id = req.params.id
    conexion.query('SELECT * FROM users WHERE id=?', [id], (error, results) => {
        if(error) {
            throw error
        } else {
            res.render('edit', {user:results[0]})
        }
    })
})

router.get('/delete/:id', (req, res) => {
    const id = req.params.id
    conexion.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
        if(error) {
            throw error
        } else {
            res.redirect('/')
        }
    })
})

const crud = require('./controllers/crud')
router.post('/save', crud.save)
router.post('/update', crud.update)

module.exports = router