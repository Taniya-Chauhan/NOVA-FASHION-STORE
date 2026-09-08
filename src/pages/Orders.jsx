
import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/orders")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Orders Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="orders-page">
        <h2>My Orders</h2>
        <p>Loading orders...</p>
      </section>
    );
  }

  return (
    <section className="orders-page">

      <div className="section-heading">
        <div>
          <p className="eyebrow">NOVA</p>
          <h2>My Orders</h2>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="empty-cart">
          <h3>No orders yet</h3>
          <p>Your successful orders will appear here.</p>
        </div>
      ) : (
        <div className="orders-list">

          {orders.map((order) => (
            <div className="order-card" key={order.id}>

              <div className="order-header">
                <strong>
                  Order #{order.id}
                </strong>

                <span>
                  {order.paymentStatus}
                </span>
              </div>

              <p>
                Customer: {order.customerName}
              </p>

              <p>
                Email: {order.email}
              </p>

              <p>
                Phone: {order.phone}
              </p>

              <p>
                Address: {order.address}, {order.city} -{" "}
                {order.pinCode}
              </p>

              <p>
                Razorpay Payment ID:{" "}
                {order.razorpayPaymentId}
              </p>

              <h3>
                Total: ₹
                {order.amount.toLocaleString("en-IN")}
              </h3>

            </div>
          ))}

        </div>
      )}

    </section>
  );
}

export default Orders;

