const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide rating"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide review title"],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, "Please provide review text"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);
ReviewSchema.index({ product: 1, user: 1 }, { unique: true }); //建立複合索引。每個使用者，每個產品只能有一條評論

// 靜態方法：ReviewSchema.statics.自訂名稱
ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    //aggregate：DB的聚合方法(多條件搜尋、計算)
    { $match: { product: productId } }, //mongodb語法
    {
      $group: {
        _id: null, //所有id都要group
        averageRating: { $avg: "$rating" }, // 輸出欄位: { 運算子: 要運算的欄位 }
        numOfReviews: { $sum: 1 },
      },
    },
  ]);
  // console.log(result);

  try {
    // 自動更新商品評分欄位
    await this.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0), //無條件進位
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post("save", async function () {
  //只有schema.save()時觸發
  // console.log('post save hook called');
  await this.constructor.calculateAverageRating(this.product); //呼叫自身靜態方法
});

ReviewSchema.post("remove", async function () {
  //只有schema.remove()時觸發
  // console.log('post remove hook called');
  await this.constructor.calculateAverageRating(this.product);
});

module.exports = mongoose.model("Review", ReviewSchema);
