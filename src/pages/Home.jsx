import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Products from "../components/Products";

function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <Products />

      <section className="promo-section">

        <div className="promo-content">
          <p className="eyebrow">NOVA ESSENTIALS</p>

          <h2>
            LESS NOISE.
            <br />
            MORE STYLE.
          </h2>

          <p>
            Simple. Confident. Timeless.
            Build your wardrobe with pieces
            made to stay.
          </p>

          <a href="/shop" className="primary-btn">
            EXPLORE COLLECTION
          </a>
        </div>

      </section>
    </main>
  );
}

export default Home;