const jwt = require('jsonwebtoken');

// Revisa si existe un token en el header y lo adjunta a la request como atributo
exports.checkTokenMW = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader.split(' ')[0];
        next();
    } else {
        res.sendStatus(403);
    }
};
// Valida el token y lo adjunta los datos a la request como atributo
exports.verifyToken = (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
            
        } else {
            return req.authData = authData;
        }
    })
};

// Emite el token
exports.signToken = (req, res) => {
    jwt.sign({userId: req.user}, 'secretkey', {expiresIn:'1 hour'}, (err, token) => {
        if(err){
            res.sendStatus(500);
        } else {
            res.json({token});
        }
    });
}