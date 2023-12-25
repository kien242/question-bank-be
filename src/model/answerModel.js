const mongoose = require("mongoose");

const productModel = mongoose.Schema({
    productId : {
        type: mongoose.Types.ObjectId,
        ref: 'product2s'
    }
    ,
    Choice: {
        noiDung: { type: String },
        dapAn: [
            {
                type: String,
                isTrue: { type: Boolean, default: false }
            },

        ]
    },
    multiChoice: {
        noiDung: { type: String },
        dapAn: [
            { type: String },
        ]
    },
    textInput: {
        noiDung: { type: String },
        dapAnDung: { type: String },
    },
    doKho: {
        type: String,
        enum: ['Nhận biết', 'Thông hiểu', 'Vận dụng'],
        required: true,
    },
    
})

module.exports = mongoose.model('answers', productModel);