import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <p className="hero-small">
          NEW COLLECTION 2026
        </p>

        <h1>
          DEFINE YOUR
          <br />
          <span>OWN STYLE.</span>
        </h1>

        <p className="hero-description">
          Discover modern fashion designed for people
          who don't follow trends — they create them.
        </p>

        <div className="hero-buttons">
          <Link to="/shop" className="primary-btn">
            SHOP NOW
          </Link>

          <Link to="/about" className="secondary-btn">
            EXPLORE NOVA
          </Link>
        </div>

      </div>

      <div className="hero-image">
        <div className="hero-circle"></div>

        <img
          src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85"
          alt="NOVA fashion collection"
        />

        <div className="hero-badge">
          <span>01</span>
          <p>NEW<br />ARRIVAL</p>
        </div>
      </div>

    </section>
  );
}

export default Hero;