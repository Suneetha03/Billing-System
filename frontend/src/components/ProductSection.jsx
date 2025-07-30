import "./ProductSection.css";
import { useState, useEffect } from "react";

export default function ProductSection({ products, setProducts }) {
  const [searchTerms, setSearchTerms] = useState({});

  const categories = {};
  products.forEach((item) => {
    if (!categories[item.category]) {
      categories[item.category] = [];
    }
    categories[item.category].push(item);
  });


  const handleQtyChange = (index, value) => {
    const updated = [...products];
    updated[index].qty = parseInt(value) || 0;
    setProducts(updated);
  };

  const handleSearchChange = (category, value) => {
    setSearchTerms({ ...searchTerms, [category]: value });
  };

  return (
    <div className="section">
      <h2>Product Categories</h2>
      <div className="category-grid">
        {Object.entries(categories).map(([category, items]) => {
          const search = searchTerms[category]?.toLowerCase() || "";
          const filteredItems = items.filter((item) =>
            item.name.toLowerCase().includes(search)
          );

          return (
            <div className="category-box" key={category}>
              <h3>{category}</h3>
              <input
                type="text"
                placeholder="Search items..."
                className="search-input"
                value={searchTerms[category] || ""}
                onChange={(e) => handleSearchChange(category, e.target.value)}
              />
              {filteredItems.length === 0 ? (
                <p className="text-muted">No items found.</p>
              ) : (
                filteredItems.map((item, i) => {
                  const index = products.findIndex(
                    (p) => p.name === item.name && p.category === item.category
                  );
                  return (
                    <div key={i} className="product-card">
                      <span>{item.name}</span>
                      <span>₹{item.price}</span>
                      <input
                        type="number"
                        min="0"
                        value={products[index].qty}
                        onChange={(e) =>
                          handleQtyChange(index, e.target.value)
                        }
                      />
                    </div>
                  );
                })
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
