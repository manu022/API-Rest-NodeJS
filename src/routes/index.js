const { Router } = require('express');
const router = Router();

const { getBooks, createBook, getBookById, deleteBook, updateBook } = require("../controllers/index.controller")

router.get('/allBooks', getBooks);
router.get('/get/book/:id', getBookById)
router.post('/create/book', createBook)
router.delete('/delete/book/:id', deleteBook)
router.put('/update/book/:id', updateBook)

module.exports = router;