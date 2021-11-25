const {models} = require('../../models');
exports.list = () => {
    return models.quanao.findAll();
};