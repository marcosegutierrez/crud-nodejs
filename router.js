const express = require('express')
const router = express.Router()

const connection = require('./database/db')

router.get('/', async (req, res) => {
    try {
        const [results] = await connection.query('SELECT * FROM users');
        res.render('index', {results: results});
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal"});
    }
})

router.get('/create', (req, res) => {
    res.render('create')
})

router.get('/edit/:id', async (req, res) => {
    const id = req.params.id
    try {
        const [results] = await connection.query('SELECT * FROM users WHERE id=?', [id]);
        res.render('edit', {user:results[0]});
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal"});
    }
})

router.get('/delete/:id', async (req, res) => {
    const id = req.params.id
    try {
        await connection.query('DELETE FROM users WHERE id = ?', [id]);
        res.redirect('/');
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal"});
    }
})

const crud = require('./controllers/crud')
router.post('/save', crud.save)
router.post('/update', crud.update)

module.exports = router