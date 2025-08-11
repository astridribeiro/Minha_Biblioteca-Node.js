const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')


const app = express()
// CONFIGURAR O EXPRESS PARA PEGAR O BODY
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

// ROTA PARA INSERIR OS LIVROS NO BANCO
app.post('/books/insertbook', (req, res) => {
    const title = req.body.title
    const pageqty = req.body.pageqty
    const authorname = req.body.authorname
    const genres = req.body.genres
    const publishYear = req.body.publishYear

    // Para proteger o query
    const sql = `INSERT INTO books (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)` // coluna ??  | dados ?
    const data = ['title', 'pageqty', 'authorname', 'genres', 'publishYear', title, pageqty, authorname, genres, publishYear]
    console.log('Autor recebido:', authorname)


    pool.query(sql, data, function(err) {
        if(err){
            console.log(err)
            return
        }
        res.redirect('/books')
    })
})

// RESGATAER OS DADOS 
app.get('/books', (req, res) => {
    const sql = "SELECT * FROM books" 
    pool.query(sql, function (err, data){
        if(err){
            console.log(err)
            return
        }
        const books = data
        console.log(books)
        res.render('books', { books })
    })
})

//RESGATAR UM DADO ESPECIFICO
app.get('/books/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM books WHERE ?? = ?` 
    const data = ['id', id]
    pool.query(sql, data, function(err, data){
        if(err){
            console.log(err)
            return
        }
        const book = data[0]
        res.render('book', {book})
    })
})

// CRIAR UMA ROTA PARA SELECIONAR OQ VC QUER EDITAR
app.get('/books/edit/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM books WHERE ?? = ?` 
    const data = ['id', id]
    pool.query(sql, data, function(err, data){
        if(err){
            console.log(err)
            return
        }
        const book = data[0]
        res.render('editbook', {book})
    })
})

// UPDATE
app.post('/books/updatebook', function (req, res) {
    const title = req.body.title
    const pageqty = req.body.pageqty
    const authorname = req.body.authorname
    const genres = req.body.genres
    const publishYear = req.body.publishYear
    const sql = `INSERT INTO books (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)` // coluna ??  | dados ?
    const data = ['title', 'pageqty', 'authorname', 'genres', 'publishYear', title, pageqty, authorname, genres, publishYear]
    pool.query(sql, data, function (err) {
        if (err) {
        console.log(err)
        }
        res.redirect(`/books`)
    })
})

// REMOVER
app.post('/books/remove/:id', function (req, res) {
  const id = req.params.id
  const sql = `DELETE FROM books WHERE ?? = ?`
  const data = ['id', id]
  pool.query(sql, data, function (err) {
    if (err) {
      console.log(err)
    }
    res.redirect(`/books`)
  })
})

app.listen(3000)