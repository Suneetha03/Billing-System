import { useEffect, useState } from "react";
import CustomerForm from "./components/CustomerForm";
import ProductSection from "./components/ProductSection";
import BillSummary from "./components/BillSummary";
import AdminPanel from "./components/AdminPanel";
import BillHistory from "./components/BillHistory";
import { fetchBills } from "./services/billService";
import { fetchPrices } from "./services/productService";
import "./App.css";

export default function App() {
  const [customer, setCustomer] = useState({ name: "", phone: "" });
  const [products, setProducts] = useState([]);
  const [billSaved, setBillSaved] = useState(false);
  const [billHistory, setBillHistory] = useState([]);
  const [activeSection, setActiveSection] = useState("billing");

  const loadProducts = async () => {
    const data = await fetchPrices();
    const formatted = data.map((p) => ({ ...p, qty: 0 }));
    setProducts(formatted);
  };

  const loadBills = async () => {
    const data = await fetchBills();
    setBillHistory(data);
  };

  useEffect(() => {
    loadProducts();
    loadBills();
  }, []);

  return (
    <div className="container">
      <header className="top-nav">
        <button
          className={`nav-button ${activeSection === "billing" ? "active" : ""}`}
          onClick={() => setActiveSection("billing")}
        >
          Billing Section
        </button>
        <button
          className={`nav-button ${activeSection === "admin" ? "active" : ""}`}
          onClick={() => setActiveSection("admin")}
        >
          Admin Section
        </button>
      </header>

      <main className="main-section">
        {activeSection === "billing" ? (
          <>
            <h1>General Store Billing</h1>
            <CustomerForm customer={customer} setCustomer={setCustomer} />
            <ProductSection products={products} setProducts={setProducts} />
           <BillSummary
  customer={customer}
  products={products}
  setBillSaved={setBillSaved}
  fetchBillHistory={loadBills}
  resetCustomer={() => setCustomer({ name: "", phone: "" })}
  resetProducts={() => {
    setProducts((prev) =>
      prev.map((p) => ({
        ...p,
        qty: 0
      }))
    );
  }}
/>

          </>
        ) : (
          <>
            <AdminPanel />
            {/* <h2 style={{ textAlign: "center" }}>Bill History</h2> */}
            <BillHistory history={billHistory} />
          </>
        )}
      </main>
    </div>
  );
}
