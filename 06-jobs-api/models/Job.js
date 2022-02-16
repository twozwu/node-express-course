
const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'], //enum：常數陣列
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId, //數據庫中模型的特定實例
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

/*
"job": {
    "status": "pending",
    "_id": "620b5d79eed69405d44bbad9",
    "company": "google",
    "position": "intern",
    "createdBy": "620b546190463c1f28b64724",
    "createdAt": "2022-02-15T07:59:53.763Z",
    "updatedAt": "2022-02-15T07:59:53.763Z",
    "__v": 0
}
*/

module.exports = mongoose.model('Job', JobSchema)