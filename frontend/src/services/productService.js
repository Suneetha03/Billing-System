import axios from "axios";

// Use deployed backend base URL
const BASE_URL = "https://billing-system-backend-0bla.onrender.com/api/prices";

// const BASE_URL = "http://localhost:5000/api/prices";

// Fetch all products from backend
export const fetchPrices = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return [];
  }
};

// Add a new product to the database
export const addProduct = async (product) => {
  try {
    const res = await axios.post(BASE_URL, product);
    return res.data;
  } catch (err) {
    console.error("Failed to add product:", err);
    return { success: false };
  }
};
