const TABLA = 'user';

module.exports = function (injectedStore) {
    let store = injectedStore;
    
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLA);
    }
    
    function get(id) {
        return store.get(TABLA, id);
    }

    function insert(data) {
        if (!data.name) {
            return Promise.reject('No se encontro el valor de name');
        }

        const user = {
            name: data.name,
        }

        return store.upsert(TABLA, user);
    }

    return {
        list,
        get,
        insert,
    };
}
