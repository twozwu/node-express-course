require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    await Product.deleteMany()
    await Product.create(jsonProducts) //匯入json檔案資料
    console.log('Success!!!!')
    process.exit(0) //如果成功就斷線(否則會保持連線)
  } catch (error) {
    console.log(error)
    process.exit(1) //0代表成功退出，1代表失敗退出
  }
}

start()