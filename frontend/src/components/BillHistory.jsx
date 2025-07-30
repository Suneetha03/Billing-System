import "./BillHistory.css"; 
import { useState } from "react";
import { fetchBills } from "../services/billService";

export default function BillHistory() {
  const [bills, setBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);

  const handleShowBills = async () => {
    const data = await fetchBills();
    setBills(data);
    setShow(true);
  };

  const handleHideBills = () => {
    setShow(false);
    setSearchTerm("");   // empty search box
  };

  const filteredBills = bills.filter((bill) => {     //each item in bills assigned to bill
    const term = searchTerm.toLowerCase();
    return (
      bill.customerName.toLowerCase().includes(term) ||      // search  by everything
      bill.phone.includes(term) ||
      String(bill.billNo).includes(term)
    );
  });



  return (
    <div className="section">
      <center>
        {!show ? (
          <button className="button" onClick={handleShowBills}>
            Show All Bills
          </button>                                                   // condition ? if true : if false (toggel)
        ) : (
          <button className="button" onClick={handleHideBills}>
            Hide Bills
          </button>
        )}
      </center>



      {show && (
        <>
          <input
            type="text"
            placeholder="Search by name, phone, or bill number"     //Another way of same above
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />




          {filteredBills.length === 0 ? (
            <p className="text-muted">No bills found.</p>
          ) : (
            <div className="bill-container">
              {filteredBills.map((bill, i) => (         // To transform each item in an array
                <div key={i} className="bill-box">
                  <strong>Bill No:</strong> {bill.billNo || "N/A"} <br />
                  <strong>Name:</strong> {bill.customerName} <br />
                  <strong>Phone:</strong> {bill.phone} <br />
                  <strong>Total:</strong> ₹{bill.total}
                  <ul>
                    {bill.items.map((item, idx) => (
                      <li key={idx}>
                         {item.name} x {item.qty} = ₹{item.qty * item.price}   {/* Direct Java Script */}
                      </li>
                    ))}
                  </ul>
                  <div className="text-muted">
                     Date: {new Date(bill.date).toLocaleString()}   {/* xx/xx/xxxx, xx:xx:xx pm */}
                  </div>
                </div>
              ))}


            </div>
          )}
        </>
      )}
    </div>
  );
}
