
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cart, cartTotal } = useCart();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");

  const handlePayment = async () => {
    try {
      // Create Razorpay order
      const response = await fetch(
        "http://localhost:8080/api/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: cartTotal,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to create payment order");
      }

      const order = await response.json();

      console.log("Razorpay Order:", order);

      // Razorpay Checkout
      const options = {
        key: "rzp_test_TZTPoa9ckx789Q",

        amount: order.amount,
        currency: order.currency,

        name: "NOVA",
        description: "NOVA E-Commerce Order",

        order_id: order.id,

        handler: async function (paymentResponse) {
          try {
            console.log(
              "Razorpay Payment Response:",
              paymentResponse
            );

            // Verify payment
            const verifyResponse = await fetch(
              "http://localhost:8080/api/payment/verify",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  razorpay_order_id:
                    paymentResponse.razorpay_order_id,

                  razorpay_payment_id:
                    paymentResponse.razorpay_payment_id,

                  razorpay_signature:
                    paymentResponse.razorpay_signature,
                }),
              }
            );

            const result = await verifyResponse.json();

            console.log("Verification Result:", result);

            // If payment verified
            if (result.success) {

              // Save order in MySQL
              const orderResponse = await fetch(
                "http://localhost:8080/api/orders",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    razorpayOrderId:
                      paymentResponse.razorpay_order_id,

                    razorpayPaymentId:
                      paymentResponse.razorpay_payment_id,

                    paymentStatus: "PAID",

                    amount: cartTotal,

                    customerName:
                      `${firstName} ${lastName}`.trim(),

                    email: email,

                    phone: phone,

                    address: address,

                    city: city,

                    pinCode: pinCode,
                  }),
                }
              );

              if (!orderResponse.ok) {
                throw new Error(
                  "Payment successful but order could not be saved"
                );
              }

              const savedOrder =
                await orderResponse.json();

              console.log(
                "Order Saved:",
                savedOrder
              );

              alert(
                "Order placed successfully! 🎉"
              );

            } else {

              alert(
                "Payment verification failed ❌"
              );
            }

          } catch (error) {

            console.error(
              "Payment Verification / Order Error:",
              error
            );

            alert(
              "Payment successful, but order saving failed ❌"
            );
          }
        },

        modal: {
          ondismiss: function () {
            console.log("Payment popup closed");
          },
        },

        theme: {
          color: "#000000",
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();

    } catch (error) {

      console.error(
        "Payment Error:",
        error
      );

      alert(
        "Something went wrong while starting payment."
      );
    }
  };

  // Empty cart
  if (cart.length === 0) {
    return (
      <section className="checkout-page">

        <div className="empty-cart">

          <h3>
            Your cart is empty
          </h3>

          <p>
            Add some products before checkout.
          </p>

          <Link
            to="/shop"
            className="view-link"
          >
            CONTINUE SHOPPING →
          </Link>

        </div>

      </section>
    );
  }

  return (
    <section className="checkout-page">

      <div className="section-heading">

        <div>

          <p className="eyebrow">
            NOVA CHECKOUT
          </p>

          <h2>
            Complete Your Order
          </h2>

        </div>

      </div>


      <div className="checkout-layout">

        {/* CUSTOMER DETAILS */}

        <div className="checkout-form">

          <h3>
            Customer Details
          </h3>


          <div className="form-row">

            <div className="form-group">

              <label>
                First Name
              </label>

              <input
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) =>
                  setFirstName(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>
                Last Name
              </label>

              <input
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) =>
                  setLastName(e.target.value)
                }
              />

            </div>

          </div>


          <div className="form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>


          <div className="form-group">

            <label>
              Phone
            </label>

            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />

          </div>


          <h3>
            Delivery Address
          </h3>


          <div className="form-group">

            <label>
              Address
            </label>

            <textarea
              placeholder="House no., street, area"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
            ></textarea>

          </div>


          <div className="form-row">

            <div className="form-group">

              <label>
                City
              </label>

              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>
                PIN Code
              </label>

              <input
                type="text"
                placeholder="PIN code"
                value={pinCode}
                onChange={(e) =>
                  setPinCode(e.target.value)
                }
              />

            </div>

          </div>

        </div>


        {/* ORDER SUMMARY */}

        <div className="checkout-summary">

          <h3>
            Order Summary
          </h3>


          {cart.map((product) => (

            <div
              className="checkout-item"
              key={product.id}
            >

              <img
                src={product.image}
                alt={product.name}
              />


              <div>

                <h4>
                  {product.name}
                </h4>

                <p>
                  Qty: {product.quantity}
                </p>

              </div>


              <strong>
                ₹
                {(
                  product.price *
                  product.quantity
                ).toLocaleString("en-IN")}
              </strong>

            </div>

          ))}


          <div className="checkout-total">

            <span>
              Total
            </span>

            <strong>
              ₹
              {cartTotal.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>


          <button
            className="payment-btn"
            onClick={handlePayment}
          >
            PROCEED TO PAYMENT →
          </button>

        </div>

      </div>

    </section>
  );
}

export default Checkout;

