const db = require('../../common/database.js');

function removeDBId(material) {
    delete material._id;
    return material;
}

exports.list = async (req, res) => {
    let records = await db.materials.asyncFind({});
    let materials = records.map(removeDBId);
    res.send(materials);
};

exports.get = async (req, res) => {
    let material = await db.materials.asyncFindOne({ "material": req.params.materialName });
    res.send(removeDBId(material));
};