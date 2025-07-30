import "./BillSummary.css";
import { saveBill } from "../services/billService";

export default function BillSummary({
  customer,
  products,
  resetCustomer,
  resetProducts
}) {

  const items = products.filter((p) => p.qty > 0);  // doesnot remove one, insted takes all needed
  const total = items.reduce((sum, p) => sum + p.qty * p.price, 0);


  const handleSaveAndPrint = async () => {
    if (!customer.name || !customer.phone || items.length === 0) {
      alert("Please fill in customer details and select at least one item.");
      return;
    }

    const bill = {
      customerName: customer.name,
      phone: customer.phone,
      items,
      total
    };

    const result = await saveBill(bill);

    if (result.success) {
      // Slight delay ensures DOM updates before printing
      setTimeout(() => {
        window.print();       // Print only the bill section  -> code is in css file
        resetCustomer();      // Reset fields after print triggers
        resetProducts();
        alert("Bill Saved successfully");
      }, 300);
    } 
    else {
      alert("Failed to save the bill.");
    }
  };

  return (
    <div className="section">
      <h2>Current Bill</h2>

       <div id="printable-bill" className="bill-box">  {/* Bill to be printed */}
        {generateBillText(customer, items, total)}
      </div>

      <button className="button" onClick={handleSaveAndPrint}>
        Save and Print Bill
      </button>
    </div>
  );
}

// Bill format
function generateBillText(customer, items, total) {
  const lines = [];

  lines.push("        GENERAL STORE");
  lines.push("==================================");
  lines.push(`Customer: ${customer.name}`);
  lines.push(`Phone   : ${customer.phone}`);
  lines.push("==================================");
  lines.push(" Item           Qty     Price");
  lines.push("----------------------------------");

  items.forEach((item) => {
    const name = item.name.padEnd(14);
    const qty = String(item.qty).padEnd(7);
    const price = `₹${item.qty * item.price}`;
    lines.push(` ${name}${qty}${price}`);
  });

  lines.push("==================================");
  lines.push(` Total: ₹${total}`);
  lines.push("==================================");
  lines.push("        THANK YOU VISIT AGAIN");
  lines.push("==================================");

  return lines.join("\n"); // Combine all lines into a single text block
}
