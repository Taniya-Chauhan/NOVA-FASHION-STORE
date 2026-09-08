import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
const {
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  cartTotal,
} = useCart();

  return (
    <section className="cart-page">

      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR BAG</p>
          <h2>Shopping Cart</h2>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h3>Your cart is empty</h3>
          <p>Add some products to your cart.</p>

          <Link to="/shop" className="view-link">
            CONTINUE SHOPPING →
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">

            {cart.map((product) => (
              <div className="cart-item" key={product.id}>

                <img
                  src={product.image}
                  alt={product.name}
                />

                <div className="cart-item-info">
                  <p>{product.category}</p>
                  <h3>{product.name}</h3>
                  <strong>
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </strong>
                </div>
<div className="quantity-control">
  <button onClick={() => decreaseQuantity(product.id)}>
    −
  </button>

  <span>{product.quantity}</span>

  <button onClick={() => increaseQuantity(product.id)}>
    +
  </button>
</div>
                <button
                  className="remove-cart"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>

              </div>
            ))}

          </div>

          <div className="cart-summary">
           <h3>
  Total: ₹{cartTotal.toLocaleString("en-IN")}
</h3>

           <Link to="/checkout" className="checkout-btn">
  CHECKOUT →
</Link>
          </div>
        </>
      )}

    </section>
  );
}

export default Cart;