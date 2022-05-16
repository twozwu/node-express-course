const { StatusCodes } = require("http-status-codes");

const uploadProductImage = async (req, res, next) => {
  // console.log(req.files);
  let productImage = req.files.image; //取得圖檔包
  const imagePath = path.join(
    _dirname,
    "../public/uploads/" + `${productImage}`
  ); //取得路徑
  console.log(imagePath);
  // await productImage.mv(imagePath); //fileupload的fun，用來移動圖片
  // return res
  //   .status(StatusCodes.OK)
  //   .json({ image: { src: `/uploads/${productImage.name}` } });
};

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
