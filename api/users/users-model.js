const db = require('../data/db-config.js')

function getUsers() {
    return db('users');
}

function getBy(filter) {
    return db('users').where(filter);
}

function getById(user_id) {
    return db('users').where({ user_id }).first();
}

async function createUser(user) {
    const [user_id] = await db('users').insert(user, 'user_id');
    return db('users').where({ user_id }).first();
}


async function changeUser(user_id, user) {
    await db('users').where({ user_id }).update(user);
    return db('users').where({ user_id }).first()
}

function deleteUser(user_id) {
    return db('users').where({ user_id }).del();
}







module.exports = {
    getUsers,
    getBy,
    getById,
    createUser,
    deleteUser,
    changeUser

}