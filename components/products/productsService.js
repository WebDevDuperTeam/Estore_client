const {models} = require('../../models');
const {Sequelize} = require("sequelize");

// exports.list = (page = 0, itemPerPage = 9) => {
//     return models.quanao.findAll({
//         attributes: ['QUANAO_ID', 'LOAI.TEN_LOAI', 'MAU', 'GIOI_TINH', 'THUONGHIEU.TEN_THUONG_HIEU', 'LINK', 'GIA'],
//         include: [{
//                 model: models.loai,
//                 as: "LOAI",
//                 required: true
//             },
//             {
//                 model: models.thuonghieu,
//                 as: "THUONGHIEU",
//                 required: true
//             }
//         ],
//         where: [{
//             DA_XOA:{[Sequelize.Op.is]: false}
//         }],
//         offset: page * itemPerPage,
//         limit: itemPerPage,
//         raw: true
//     });
// };

exports.list = (page = 0, searchName, gt, price1, price2, mau, itemPerPage = 9) => {
    if (searchName && searchName !== "")
        return models.quanao.findAll({
            attributes: ['QUANAO_ID', 'LOAI.TEN_LOAI', 'MAU', 'GIOI_TINH', 'THUONGHIEU.TEN_THUONG_HIEU', 'LINK', 'GIA'],
            include: [{
                model: models.loai,
                as: "LOAI",
                required: true,
                where: {
                    TEN_LOAI: {
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
                DA_XOA: {
                    [Sequelize.Op.is]: false
                },
                GIOI_TINH: gt,
                GIA: {
                    [Sequelize.Op.between]: [price1, price2]
                },
                MAU: mau


            }],
            offset: page * itemPerPage,
            limit: itemPerPage,
            raw: true
        });
    else
        return models.quanao.findAll({
            attributes: ['QUANAO_ID', 'LOAI.TEN_LOAI', 'MAU', 'GIOI_TINH', 'THUONGHIEU.TEN_THUONG_HIEU', 'LINK', 'GIA'],
            include: [{
                model: models.loai,
                as: "LOAI",
                required: true,


            },
                {
                    model: models.thuonghieu,
                    as: "THUONGHIEU",
                    required: true

                }
            ],
            where: [{
                DA_XOA: {
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
        attributes: ['QUANAO_ID', 'LOAI.TEN_LOAI', 'MAU', 'GIOI_TINH', 'THUONGHIEU.TEN_THUONG_HIEU', 'LINK', 'GIA'],
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

exports.Commentlist = (ID, page = 0, itemPerPage = 2) => {
    return models.binhluan.findAll({
        attributes: ['QUANAO_ID', 'USERNAME', 'DIEM', 'NOI_DUNG'],
        include: [{
            model: models.quanao,
            as: "QUANAO",
            required: true
        }],
        where: [{
            [Sequelize.Op.or]: [
                { QUANAO_ID: ID }
            ]
        }],

        offset: page * itemPerPage,
        limit: itemPerPage,
        raw: true
    });
};
