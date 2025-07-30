import "./AdminPanel.css";
import { useEffect, useState } from "react";
import { fetchPrices, addProduct } from "../services/productService";

export default function AdminPanel() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
  });
  const [productList, setProductList] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const loadProducts = async () => {
    const data = await fetchPrices();
    setProductList(data);
  };

  const getUniqueCategories = () => {
    const categories = productList.map((p) => p.category);
    return [...new Set(categories)];
  };

  const handleAddProduct = async () => {
    if (!product.name || !product.category || !product.price) {
      alert("Please fill all fields.");
      return;
    }

    const res = await addProduct(product);
    if (res.success) {
      alert("Product added successfully.");
      setProduct({ name: "", category: "", price: "" });
      loadProducts();
    } else {
      alert("Failed to add product.");
    }
  };

const handleAddCategory = () => {
  if (!newCategory) return;

  setProduct({ ...product, category: newCategory });   // Set the typed category as selected in the product form
  const currentCategories = getUniqueCategories();
  if (!currentCategories.includes(newCategory)) {      // only new categories
    setProductList([...productList, { category: newCategory, name: "", price: 0 }]);
  }

  setNewCategory("");
};


  useEffect(() => {
    loadProducts();
  }, []);

  const categories = getUniqueCategories();

  return (
    <div className="section">
      <h2>Admin Panel</h2>

      <div className="admin-form">
        <h3>Add New Category</h3>
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory} className="button">
          Use Category
        </button>
      </div>

      <div className="admin-form">
        <h3>Add New Product</h3>
        <input
          type="text"
          placeholder="Product Name"
          value={product.name}
          onChange={(e) =>
            setProduct({ ...product, name: e.target.value })  //creates a new object by copying everything from the existing object
          }
        />

        <select
          value={product.category}
          onChange={(e) =>
            setProduct({ ...product, category: e.target.value })
          }
        >
          <option value="">Select Category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: e.target.value })
          }
        />

        <button onClick={handleAddProduct} className="button">
          Add Product
        </button>
      </div>
    </div>
  );
}
