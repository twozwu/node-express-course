const { StatusCodes } = require("http-status-codes");
const path = require("path");
const CustomError = require('../errors')
const cloudinary = require("cloudinary").v2
const fs = require("fs")

const uploadProductImageLocal = async (req, res, next) => {
  // console.log(req.files);
  //check if file exists
  if (!req.files) {
    throw new CustomError.BadRequestError('No File uploaded')
  }
  //如果非圖片
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please uploaded Image')
  }
  const maxSie = 1000
  if (!productImage.size > maxSie) {
    throw new CustomError.BadRequestError('Please uploaded Image smaller then 1KB')
  }
  
  let productImage = req.files.image; //取得圖檔包
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  ); //取得完整路徑
  console.log(imagePath);
  await productImage.mv(imagePath); //fileupload的fun，用來移動圖片
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

const uploadProductImage = async (req, res, next) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    { 
      use_filename: true,
      folder: 'file-upload'
    }
  )
  console.log(result);
  fs.unlinkSync(req.files.image.tempFilePath) //刪除伺服器暫存檔案
  return res
  .status(StatusCodes.OK)
  .json({ image: { src: result.secure_url } }); //回傳外連網址
}

module.exports = {
  uploadProductImage,
};

// {
//   image: {
//     name: 'computer-1.jpeg',
//     data: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 01 00 48 00 48 00 00 ff e2 02 1c 49 43 43 5f 50 52 4f 46 49 4c 45 00 01 01 00 00 02 0c 6c 63 6d 73 02 10 00 00 ... 62296 more bytes>,
//     size: 62346,
//     encoding: '7bit',
//     tempFilePath: '',
//     truncated: false,
//     mimetype: 'image/jpeg',
//     md5: '2a300e280a3a84e9ede0468f0530ccd1',
//     mv: [Function: mv]
//   }
// }

// {
//   name: 'computer-3.jpeg',
//   data: <Buffer >,
//   size: 57567,
//   encoding: '7bit',
//   tempFilePath: 'C:\\Users\\allwell\\Documents\\公司\\新增資料夾\\node4project\\07-file-upload\\tmp\\tmp-1-1651465784368',
//   truncated: false,
//   mimetype: 'image/jpeg',
//   md5: 'a3a8b5808c01f83da2dc78df403587f0',
//   mv: [Function: mv]
// }