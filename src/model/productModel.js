const mongoose = require("mongoose");

const productModel = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        boMon: {
            type: String,
            required: true,
        },
        khoiLop: {
            type: String,
            required: true,
        },
        chuDe: [
           {
            type: String,
            required: true,
           }
        ],
        loiGiai: {
            type: String,
        },
        loaiCauHoi:[ {
            type: mongoose.Types.ObjectId,
            ref: 'answers'
        }]
    },
    {
        timestamps: true,
    });

module.exports = mongoose.model("product2s", productModel);
