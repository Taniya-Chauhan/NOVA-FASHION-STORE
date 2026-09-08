import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { wishlist } = useWishlist();
  const { cart } = useCart();

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim() !== "") {
      navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header className="navbar">
      <div className="nav-container">

        <Link to="/" className="logo">
          NOVA<span>.</span>
        </Link>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <nav
          className={menuOpen ? "nav-links active" : "nav-links"}
        >
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/shop" onClick={() => setMenuOpen(false)}>
            Shop
          </NavLink>

          <NavLink to="/about" onClick={() => setMenuOpen(false)}>
            About
          </NavLink>

          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>

          <NavLink to="/orders" onClick={() => setMenuOpen(false)}>
            Orders
          </NavLink>
        </nav>

        <div className="nav-icons">

          {/* SEARCH */}
          <button
            title="Search"
            className="search-btn"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            ⌕
          </button>

          {/* WISHLIST */}
          <Link
            to="/wishlist"
            className="wishlist-icon"
            title="Wishlist"
          >
            ♡

            {wishlist.length > 0 && (
              <span className="wishlist-badge">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* CART */}
          <Link
            to="/cart"
            className="cart-icon"
            title="Cart"
          >
            <span className="cart-symbol">
              🛒
            </span>

            {cart.length > 0 && (
              <span className="cart-badge">
                {cart.length}
              </span>
            )}
          </Link>

        </div>

        {/* SEARCH BOX */}
        {searchOpen && (
          <form
            className="search-box"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />

            <button type="submit">
              Search
            </button>
          </form>
        )}

      </div>
    </header>
  );
}

export default Navbar;