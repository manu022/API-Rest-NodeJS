const { Router } = require('express');
const router = Router();
const passport = require('passport');
const { getBooks, createBook, getBookById, deleteBook, updateBook } = require("../controllers/index.controller")
require("../middleware/auth.google");
const authService = require('../middleware/auth.jwt');

router.use(function(req, res, next) {
    let allowedOrigins = ['*']; 
    let origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Expose-Headers', 'Content-Disposition');
    next();
  });

router.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Algo anda mal!');
  });

// Autentificación Google


router.get('/failed', (req,res) => res.send('No te has autentificado!'))

router.get('/verify', authService.checkTokenMW, (req, res) => {
    authService.verifyToken(req, res);
    if (null === req.authData) {
      res.sendStatus(403);
    } else {
      res.json(req.authData);
    }
  });

router.get('/auth/google',
  passport.authenticate('google', {session: false, scope: ['profile',  'email'] }));

router.get('/callback', 
  passport.authenticate('google', {session: false, failureRedirect: '/failed' }),
  function(req, res) {
    //Emite el token después de un login exitoso.
    authService.signToken(req, res);
  });


// rutas CRUD

router.get('/allBooks', authService.checkTokenMW, (req,res,next)=> {
  authService.verifyToken(req, res);
  if (null === req.authData) {
    res.sendStatus(403);
  }else {
    next();
  }
  
  }, getBooks);

router.get('/get/book/:id', authService.checkTokenMW, (req,res,next)=> {
  authService.verifyToken(req, res);
  if (null === req.authData) {
    res.sendStatus(403);
  }else {
    next();
  }
  
  }, getBookById);
  
router.post('/create/book',authService.checkTokenMW, (req,res, next)=> {
  authService.verifyToken(req, res);
  if (null === req.authData) {
    res.sendStatus(403);
  }
  else{
    next();
  }
  
  }, createBook);

router.delete('/delete/book/:id', authService.checkTokenMW, (req,res, next)=> {
  authService.verifyToken(req, res);
  if (null === req.authData) {
    res.sendStatus(403);
  }
  else{
    next();
  }
  
  }, deleteBook)

router.put('/update/book/:id', authService.checkTokenMW, (req,res, next)=> {
  authService.verifyToken(req, res);
  if (null === req.authData) {
    res.sendStatus(403);
  }
  else{
    next();
  }
  
  }, updateBook)

module.exports = router;