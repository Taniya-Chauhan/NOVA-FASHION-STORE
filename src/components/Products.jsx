import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="products section">

      <div className="section-heading">
        <div>
          <p className="eyebrow">TRENDING NOW</p>
          <h2>Featured Pieces</h2>
        </div>

        <Link to="/shop" className="view-link">
          SHOP ALL →
        </Link>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="product-grid">

          {products.map((product) => (
            <div className="product-card" key={product.id}>

              <Link to={`/product/${product.id}`}>
                <div className="product-image">

                  <span className="product-tag">
                    NEW
                  </span>

                 <button
  className={`heart ${
    isInWishlist(product.id) ? "active" : ""
  }`}
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }}
>
  {isInWishlist(product.id) ? "♥" : "♡"}
</button>

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                </div>
              </Link>

              <div className="product-info">

                <p>{product.category}</p>

                <Link to={`/product/${product.id}`}>
                  <h3>{product.name}</h3>
                </Link>

                <strong>
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </strong>

              </div>

            </div>
          ))}

        </div>
      )}

    </section>
  );
}

export default Products;