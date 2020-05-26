const mongoose = require('mongoose');

const { Schema } = mongoose;

const TokenSchema = new Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'newCompany'
      },
      token: {
        type: String,
        required: true,
        unique: true
    },
      createdAt:{
        type: Date,
        required: true,
        default: Date.now, expires: 1800
    }
 }, 
//{
//   timestamps: true,
// }
);

const TokenModel = mongoose.model('token', TokenSchema);

module.exports = TokenModel;
