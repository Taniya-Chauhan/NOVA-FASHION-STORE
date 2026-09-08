import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-main">

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            NOVA<span>.</span>
          </Link>

          <p>
            Modern fashion for modern minds.
            Discover pieces that make your style
            uniquely yours.
          </p>
        </div>

        <div className="footer-column">
          <h4>SHOP</h4>

          <Link to="/shop">New Arrivals</Link>
          <Link to="/shop">Women</Link>
          <Link to="/shop">Men</Link>
          <Link to="/shop">Accessories</Link>
        </div>

        <div className="footer-column">
          <h4>HELP</h4>

          <Link to="/contact">Contact Us</Link>
          <Link to="/contact">Shipping</Link>
          <Link to="/contact">Returns</Link>
          <Link to="/contact">FAQs</Link>
        </div>

        <div className="footer-column newsletter">
          <h4>JOIN NOVA</h4>

          <p>
            Get updates about new collections
            and exclusive offers.
          </p>

          <div className="newsletter-box">
            <input
              type="email"
              placeholder="Your email"
            />

            <button>→</button>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 NOVA. All rights reserved.</p>

        <div>
          <span>Instagram</span>
          <span>Facebook</span>
          <span>Pinterest</span>
        </div>
      </div>

    </footer>
  );
}

export default Footer;