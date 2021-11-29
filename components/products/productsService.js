const {models} = require('../../models');
const {Sequelize} = require("sequelize");
exports.list = (page = 0, itemPerPage = 9) => {
    return models.quanao.findAll({
        attributes: ['LOAI.TENLOAI', 'MAU', 'GIOITINH', 'THUONGHIEU.TENTHUONGHIEU', 'link', 'GIA'],
        include: [{
                model: models.loai,
                as: "LOAI",
                required: true
            },
            {
                model: models.thuonghieu,
                as: "THUONGHIEU",
                required: true
            }
        ],
        where: [{
            DAXOA:{[Sequelize.Op.is]: false}
        }],
        offset: page * itemPerPage,
        limit: itemPerPage,
        raw: true
    });
};