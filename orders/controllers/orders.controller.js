const db = require('../../common/database.js');

exports.execute = async (req, res) => {
    let materials = await db.materials.asyncFind({});
    let onStock = new Map(materials.map(m => [m.material, m.quantity]));

    for (let item of req.body) {
        let product = await db.products.asyncFindOne({ "id": item.product_id });
        for (let ingredient of product.specification) {
            let stockQuantity = onStock.get(ingredient.material);
            let quantityLeft = stockQuantity - (ingredient.quantity * item.quantity);
            onStock.set(ingredient.material, quantityLeft);
        }
    }

    let notEnough = Array.from(onStock.values()).some(val => val < 0);
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