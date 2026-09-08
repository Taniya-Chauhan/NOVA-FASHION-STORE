import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="product-card">

      <div className="product-image">
        <img src={product.image} alt={product.name} />

        <button
          className={`wishlist-btn ${inWishlist ? "active" : ""}`}
          onClick={handleWishlist}
          title="Wishlist"
        >
          {inWishlist ? "♥" : "♡"}
        </button>
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>

        <p className="product-price">
          ₹{product.price}
        </p>

        <button
          className="add-cart-btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>

    </div>
  );
}

export default ProductCard;