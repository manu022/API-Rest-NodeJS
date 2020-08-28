const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'software',
    database: 'biblioteca',
    port: '5432'
});

const getBooks = async (req, res) => {
    try{
        const response = await pool.query('SELECT * FROM libros');
        res.status(200).json(response.rows);
    }
    catch(e){
        console.log('token no válido, error!: ', e);
    }
};

const getBookById = async (req, res) =>{
    
    const id = req.params.id
    try{
        const response = await pool.query('SELECT * FROM libros WHERE id = $1', [id])
        res.json(response.rows);
    }
    catch(e){
        console.log('token no válido, error!: ', e);
    }
};

const createBook = async (req, res) =>{
    const { nombre, autor } = req.body;
    try{
        const response = await pool.query('INSERT INTO libros (nombre, autor) VALUES ($1, $2)', [nombre, autor]);
        console.log(response);
        res.json({
            message: 'Book Added Successfully',
            body: {
                book: {nombre, autor}
            }
        });
    }
    catch(e){
        console.log('token no válido, error!: ', e)
    }
};

const updateBook = async (req, res) =>{
    const id = req.params.id;
    const {nombre, autor } = req.body;
    try{
        const response = await pool.query('UPDATE libros SET nombre = $1, autor=$2 WHERE id = $3', [
            nombre,
            autor,
            id
        ]);
        console.log(response);
        res.json('User Updated Successfully');
    }
    catch(e){
        console.log('token no válido, error!: ', e);
    }
};

const deleteBook = async (req, res) =>{
    const id = req.params.id
    try{
        const response = await pool.query('DELETE FROM libros WHERE id = $1', [id]);
        console.log(response);
        res.json(`User ${id} deleted successfully`);
    }
    catch(e){
        console.log('token no válido, error!: ', e);
    }
};


module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}