import dotenv from "dotenv";
import axios from "axios";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";

dotenv.config();
await connectDB();

const importData = async () => {
  try {
    const { data } = await axios.get("https://dummyjson.com/products?limit=100");

    const products = data.products.map((item) => ({
      name:         item.title,
      price:        item.price,
      description:  item.description,
      image:        item.thumbnail,
      brand:        item.brand || "",
      category:     item.category,
      countInStock: item.stock,
      rating:       item.rating,
      numReviews:   item.reviews?.length ?? 0,
      reviews:      (item.reviews ?? []).map((rev) => ({
        rating:  rev.rating,
        comment: rev.comment,
        name:    rev.reviewerName,
      })),
    }));

    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Products imported successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeder error:", error.message);
    process.exit(1);
  }
};

importData();