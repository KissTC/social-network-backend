const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');
const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret);
}

function verify(token) {
    return jwt.verify(token, secret);
}


//recibe la autorizacion
function getToken(auth) {
    if (!auth) {
        throw new Error('No viene token');
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw new Error('Formato invalido');
    }

    let token = auth.replace('Bearer ', '');
    return token;
}


//esta funcion recibe la request y generamos el token decodificado
function decodeHeader(req) {
    // es el header que queremos recibir
    const authorization = req.headers.authorization || "";
    // token. funcion que saca el token desde el tipo de cabecera que venga
    const token = getToken(authorization);
    //ejecuta una funcion que verifica que el token es valido
    const decoded = verify(token);

    // lo dejamos en la req por si quermos usarla mas adelante
    req.user = decoded;

    return decoded;
}

const check = {

    own: function(req, owner) {
        // primero se decodifica el token
        const decoded = decodeHeader(req);
        console.log(decoded);

        //si el id del usuario es igual al ower todo ok
        if (decoded.id !== owner) {
            throw error('No tienes privilegios para hacer esto', 401);
        }

        //Comprobar si es o no propio

    },

}

module.exports = {
    sign,
    check,
};