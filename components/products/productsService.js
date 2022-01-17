const { models } = require('../../models');
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('clothesstoreweb', 'root', 'root', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});
exports.list = (page = 0, searchName, gt, price1, price2, mau, itemPerPage = 9) => {
    if (searchName && searchName != "")
        return models.quanao.findAll({
            attributes: ['QUANAO_ID', 'LOAI.TEN_LOAI', 'MAU', 'GIOI_TINH', 'THUONGHIEU.TEN_THUONG_HIEU', 'link', 'GIA'],
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
            attributes: ['QUANAO_ID', 'LOAI.TEN_LOAI', 'MAU', 'GIOI_TINH', 'THUONGHIEU.TEN_THUONG_HIEU', 'link', 'GIA'],
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
exports.listUser = (id) => {
    return models.users.findAll({
        where: {
            USER_ID: id
        },
        raw: true
    })
}

exports.addCart = (user_id, quanao_id) => {
    return models.giohang.findOne({

        where: {
            USER_ID: user_id
        },
        raw: true
    })
}

exports.createCart = (giohang_id, quanao_id) => {
    const sql = `
    INSERT INTO ct_giohang (GIOHANG_ID,QUANAO_ID,SO_LUONG)
    VALUES ('${giohang_id}','${quanao_id}',1);
  `
    return sequelize.query(sql, {
        type: sequelize.QueryTypes.INSERT
    })
}

exports.findCartDetail = (giohang_id, quanao_id) => {
    return models.ct_giohang.findOne({
        where: {
            QUANAO_ID: quanao_id,
            GIOHANG_ID: giohang_id
        },
        raw: true
    })
}

exports.update = (GIOHANG_ID1, QUANAO_ID1, SO_LUONG1) => {
    return models.ct_giohang.update({
        SO_LUONG: SO_LUONG1
    }, {
        where: {
            GIOHANG_ID: GIOHANG_ID1,
            QUANAO_ID: QUANAO_ID1
        },
    });


}

exports.showDetail = (ID) => {
    return models.quanao.findAll({
        attributes: ['LOAI.TEN_LOAI', 'MAU', 'GIOI_TINH', 'THUONGHIEU.TEN_THUONG_HIEU', 'link', 'GIA'],
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