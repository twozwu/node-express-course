const Product = require("../models/product");

const getAllProductsStatic = async (req, res, next) => {
  const products = await Product.find({}).sort("-name price"); //name由大到小，然後price由小到大
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res, next) => {
  // console.log(req.query); //?name=John&featured=true，{ name: 'John', featured: 'true' }
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) { //數值的過濾器
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    console.log(filters); //price-$gt-40,rating-$gte-4
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  // console.log(queryObject); //最後的搜尋條件
  let result = Product.find(queryObject);
  // sort，當有排序條件才加入排序
  if (sort) {
    const sortList = sort.split(",").join(" ");
    // console.log(sortList); //{ featured: 'true', sort: 'price,-name' }
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList); //要顯示的欄位
  }
  const page = Number(req.query.page) || 1; //預設第一頁
  const limit = Number(req.query.limit) || 10; //預設一頁10筆
  const skip = (page - 1) * limit; //跳頁

  result = result.skip(skip).limit(limit);

  const products = await result; //將await放到最後面
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
