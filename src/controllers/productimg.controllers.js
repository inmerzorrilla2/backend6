const catchError = require('../utils/catchError');
const ProductImg = require('../models/ProductImg');

const getAll = catchError(async(req, res) => {
    
    const results = await ProductImg.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {

    const url = req.protocol + "://" + req.headers.host + "/upload/" + req.file.filename;
		const filename = req.file.filename;
    const result = await ProductImg.create({ url, filename });
    return res.status(201).json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await ProductImg.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});



module.exports = {
    getAll,
    create,
    remove
    
}