const connection = require('../database/db')

exports.save = async (req, res) => {
    const user = req.body.user
    const rol = req.body.rol
    try {
        await connection.query('INSERT INTO users SET ?', {user:user, rol:rol});
        res.redirect('/');
    } catch (error) {
        return res.status(500).json({message: "Error al guardar usuario"});
    }
}

exports.update = async (req, res) => {
    const id = req.body.id
    const user = req.body.user
    const rol = req.body.rol
    try {
        await connection.query('UPDATE users SET ? WHERE id = ?', [{user:user, rol:rol}, id]);
        res.redirect('/');
    } catch (error) {
        return res.status(500).json({message: "Error al actualizar usuario"});
    }
}