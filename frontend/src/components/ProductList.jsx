import "./ProductList.css";
import {useEffect} from "react";
import { fetchPrices } from "../services/productService";

export default function ProductList({ products, setProducts }) {
  useEffect(() => {
    fetchPrices().then((data) => {
      const initialized = data.map((p) => ({ ...p, qty: 0 }));
      setProducts(initialized);
    });
  }, [setProducts]);

  const updateQty = (index, qty) => {
    const updated = [...products];
    updated[index].qty = parseInt(qty) || 0;
    setProducts(updated);
  };

  return (
    <div className="mb-4">
      <h2 className="mb-2">Product List</h2>
      {products.map((product, i) => (
        <div key={i} className="mb-2">
          <span>{product.name}</span>
          <span>₹{product.price}</span>
          <input
            type="number"
            min="0"
            className="w-24"
            value={product.qty}
            onChange={(e) => updateQty(i, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}