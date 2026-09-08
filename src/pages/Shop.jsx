import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("featured");

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

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

  // SEARCH FILTER
  const filteredProducts = products.filter((product) => {
    if (!searchQuery.trim()) {
      return true;
    }

    const query = searchQuery.toLowerCase();

    return (
      product.name?.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query)
    );
  });

  // SORT
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "low") {
      return Number(a.price) - Number(b.price);
    }

    if (sort === "high") {
      return Number(b.price) - Number(a.price);
    }

    if (sort === "newest") {
      return Number(b.id) - Number(a.id);
    }

    return 0;
  });

  return (
    <main className="shop-page">

      {/* HEADER */}
      <section className="page-header">
        <p className="eyebrow">NOVA COLLECTION</p>

        <h1>SHOP</h1>

        <p>
          Explore our latest collection of
          modern essentials.
        </p>
      </section>

      {/* SHOP */}
      <section className="shop-section">

        <div className="shop-toolbar">

          <span>
            {loading
              ? "LOADING..."
              : searchQuery
                ? `${sortedProducts.length} RESULTS FOR "${searchQuery}"`
                : `${products.length} PRODUCTS`
            }
          </span>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="featured">
              Sort by: Featured
            </option>

            <option value="low">
              Price: Low to High
            </option>

            <option value="high">
              Price: High to Low
            </option>

            <option value="newest">
              Newest
            </option>
          </select>

        </div>

        {/* LOADING */}
        {loading ? (
          <p>Loading products...</p>

        ) : sortedProducts.length === 0 ? (

          /* NO SEARCH RESULTS */
          <div className="no-products">
            <h2>No products found</h2>

            <p>
              We couldn't find anything matching
              "{searchQuery}".
            </p>

            <Link to="/shop">
              View All Products
            </Link>
          </div>

        ) : (

          /* PRODUCTS */
          <div className="shop-grid">

            {sortedProducts.map((product) => (

              <div
                className="product-card"
                key={product.id}
              >

                <Link to={`/product/${product.id}`}>

                  <div className="product-image">

                    <span className="product-tag">
                      NEW
                    </span>

                    <button
                      className="heart"
                      onClick={(e) => e.preventDefault()}
                    >
                      ♡
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
                    ₹
                    {Number(product.price).toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}

export default Shop;