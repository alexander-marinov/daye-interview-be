const { AsyncNedb } = require('nedb-async')
let products = new AsyncNedb({ filename: 'data/products.db', autoload: true });
let materials = new AsyncNedb({ filename: 'data/meterials.db', autoload: true });

module.exports = {
    products,
    materials
}