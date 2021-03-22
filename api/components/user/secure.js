const auth = require('../../../auth');

module.exports = function checkAuth(action) {

    // el action es la acción que queremos ejecutar

    //middelware de express
    function middleware(req, res, next) {
        switch(action) {
            case 'update':
                //comprobar si el usuario puede hacer el update o no
                //decodificamos el token
                //si no puede se rompe
                const owner = req.body.id;
                //comprobar que el usuario que ha generado el token es el usuario que queremos comprobar
                auth.check.own(req, owner);
                next();
                break;


            default:
                next();
        }
    }

    return middleware;

}