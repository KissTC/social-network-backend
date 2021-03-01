const db = {
    'user': [
        { id: '1', name: 'Julio'},
    ]
};

async function list(tabla) {
    return db[tabla];
}

async function get(tabla, id) {
    let collection = await list(tabla);
    console.log(tabla);
    console.log(collection);
    return collection.filter( item => item.id === id)[0] || null;
}

async function upsert(tabla, data) {
    const newData = {
        id: db[tabla].length + 1,
        data: data.name,
    }
    db[tabla].push(newData);
    return newData;
}

async function remove(tabla, id) {
    return true;
}

module.exports = {
    list,
    get, 
    upsert,
    remove
}