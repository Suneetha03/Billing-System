import axios from "axios";

const API_BASE = "https://billing-system-backend-0bla.onrender.com/api/bills";
// const API_BASE = "http://localhost:5000/api/bills";

export const saveBill = async (bill) => {
  try {
    const res = await axios.post(API_BASE, bill);
    return res.data;
  } catch (err) {
    console.error("Save bill failed:", err);
    return { success: false };
  }
};

export const fetchBills = async () => {
  try {
    const res = await axios.get(API_BASE);
    return res.data;
  } catch (err) {
    console.error("Fetch bills failed:", err);
    return [];
  }
};
