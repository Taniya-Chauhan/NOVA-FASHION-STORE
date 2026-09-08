import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <section className="wishlist-page">

      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR FAVORITES</p>
          <h2>My Wishlist</h2>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <h3>Your wishlist is empty</h3>
          <p>Save your favorite pieces here.</p>

          <Link to="/shop" className="view-link">
            CONTINUE SHOPPING →
          </Link>
        </div>
      ) : (
        <div className="product-grid">

          {wishlist.map((product) => (
            <div className="product-card" key={product.id}>

              <div className="product-image">

                <img
                  src={product.image}
                  alt={product.name}
                />

                <button
                  className="heart active"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  ♥
                </button>

              </div>

              <div className="product-info">

                <p>{product.category}</p>

                <h3>{product.name}</h3>

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

export default Wishlist;