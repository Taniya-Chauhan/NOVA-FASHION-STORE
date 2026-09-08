import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
function ProductDetails() {
  const { id } = useParams();
const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product not found");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="details-page">
        <p>Loading product...</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="details-page">
        <h2>Product not found</h2>
        <Link to="/shop">← Back to Shop</Link>
      </main>
    );
  }

  return (
    <main className="details-page">

      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <section className="details-container">

        <div className="details-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="details-info">

          <p className="eyebrow">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <h2>
            ₹{Number(product.price).toLocaleString("en-IN")}
          </h2>

          <div className="rating">
            ★★★★★ <span>4.8 / 5</span>
          </div>

          <p className="details-description">
            {product.description}
          </p>

          <div className="size-section">
            <div className="size-heading">
              <span>SELECT SIZE</span>
              <span>SIZE GUIDE</span>
            </div>

            <div className="sizes">
              <button>S</button>
              <button>M</button>
              <button>L</button>
              <button>XL</button>
            </div>
          </div>

          <div className="quantity">
            <button>−</button>
            <span>1</span>
            <button>+</button>
          </div>

         <button
  className="add-cart"
  onClick={() => addToCart(product)}
>
  ADD TO CART
</button>

          <div className="product-features">

            <div>
              <strong>🚚 Free Shipping</strong>
              <span>On orders above ₹1999</span>
            </div>

            <div>
              <strong>↻ Easy Returns</strong>
              <span>7 day return policy</span>
            </div>

            <div>
              <strong>✓ Secure Payment</strong>
              <span>100% secure checkout</span>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default ProductDetails;