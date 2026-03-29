import axios from "axios";

const test = async () => {
  const { data } = await axios.get("https://dummyjson.com/products");
  console.log(data.products[0]); // just print one product
};

test();