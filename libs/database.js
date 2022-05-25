const knex = require('./knex/knex.js');

export async function storeState() {
    let insert = await knex('states').insert({
        on_timestamp: knex.fn.now()
    })
    return insert;
}

export async function getState(id) {
    let select = await knex('states').select('*').where({
        id: id
    }).first();
    return select;
}

export async function closeState(id) {
    let update = await knex('states').where({
        id: id
    }).update({
        off_timestamp: new Date()
    });
    return update;
}

export async function storeColor(color) {
    let insert = await knex('colors').insert({
        color: color
    })
    return insert;
}

export async function getColor(date = Date.now()) {
    let select = await knex('colors').select('*').where({
        date: knex.fn.now()
    }).orderBy('id', 'desc').first();
    return select;
}