const { models } = require('../../models');
const { Sequelize } = require("sequelize");
exports.list = (page = 0, searchName, itemPerPage = 9) => {
    return models.quanao.findAll({
        attributes: ['QUANAO_ID', 'LOAI.TENLOAI', 'MAU', 'GIOITINH', 'THUONGHIEU.TENTHUONGHIEU', 'link', 'GIA'],
        include: [{
                model: models.loai,
                as: "LOAI",
                required: true,
                where: {
                    TENLOAI: {
                        [Sequelize.Op.substring]: searchName
                    }
                }
            },
            {
                model: models.thuonghieu,
                as: "THUONGHIEU",
                required: true

            }
        ],
        where: [{
            DAXOA: {
                [Sequelize.Op.is]: false
            }

        }],
        offset: page * itemPerPage,
        limit: itemPerPage,
        raw: true
    });
};

exports.showDetail = (ID) => {
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
            [Sequelize.Op.or]: [
                { QUANAO_ID: ID }
            ]
        }],
        raw: true
    });
};