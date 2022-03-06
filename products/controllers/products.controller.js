const db = require('../../common/database.js');

function mapIdAndName(product) {
    return {
        id: product.id,
        name: product.name
    };
}

exports.list = async (req, res) => {
    let records = await db.products.asyncFind({});
    let products = records.map(mapIdAndName);
    res.send(products);
};

exports.get = async (req, res) => {
    let product = await db.products.asyncFindOne({ "id": req.params.prodId });
    delete product._id;
    res.send(product);
};