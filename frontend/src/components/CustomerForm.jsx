import "./CustomerForm.css";

export default function CustomerForm({ customer, setCustomer }) {
  return (
    <div className="section">
      <h2>Customer Details</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Customer Name"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })} //e.target.value gives the current value inside the input field
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={customer.phone}
          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} //(...)instead of modifying, create a new object
        />
      </div>
    </div>
  );
}
