const mongoose = require('mongoose')

const connectDB = (url) => {
    return mongoose
    .connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
}

// mongoose
//   .connect(connettionString, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//       useUnifiedTopology: true,
//   })
//   .then(() => console.log('CONNECT TO THE DB...'))
//   .catch((err) => console.log(err))

module.exports = connectDB //將連線設定導到主程式