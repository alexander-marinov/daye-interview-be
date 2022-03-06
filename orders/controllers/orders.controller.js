const db = require('../../common/database.js');

exports.execute = async (req, res) => {
    let materials = await db.materials.asyncFind({});
    let onStock = new Map(materials.map(m => [m.material, m.quantity]));

    for (var i in req.body) {
        let item = req.body[i];
        let product = await db.products.asyncFindOne({ "id": item.product_id });
        for (var s in product.specification) {
            let ingredient = product.specification[s];
            let stockQuantity = onStock.get(ingredient.material);
            let quantityLeft = stockQuantity - (ingredient.quantity * item.quantity);
            onStock.set(ingredient.material, quantityLeft);
        }
    }

    let notEnough = false;
    onStock.forEach((val) => notEnough = val < 0 ? true : notEnough);
    if (notEnough) {
        res.send({ status: "not enough materials on stock" });
        return;
    }

    onStock.forEach((quantity, material) => updateAvailability(material, quantity));
    res.send({ status: "ок" });
};


async function updateAvailability(material, quantity) {
    let materialRec = await db.materials.asyncFindOne({ "material": material });
    materialRec.quantity = quantity;
    await db.materials.asyncUpdate({ _id: materialRec._id }, materialRec);
}