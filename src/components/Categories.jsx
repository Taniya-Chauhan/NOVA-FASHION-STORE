import { Link } from "react-router-dom";

const categories = [
  {
    title: "WOMEN",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "MEN",
    image:
      "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "ACCESSORIES",
    image:
      "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=800&q=80",
  },
];

function Categories() {
  return (
    <section className="categories section">

      <div className="section-heading">
        <div>
          <p className="eyebrow">SHOP BY CATEGORY</p>
          <h2>Find Your Look</h2>
        </div>

        <Link to="/shop" className="view-link">
          VIEW ALL →
        </Link>
      </div>

      <div className="category-grid">

        {categories.map((category) => (
          <Link
            to="/shop"
            className="category-card"
            key={category.title}
          >
            <img src={category.image} alt={category.title} />

            <div className="category-overlay">
              <h3>{category.title}</h3>
              <span>SHOP NOW →</span>
            </div>
          </Link>
        ))}

      </div>

    </section>
  );
}

export default Categories;