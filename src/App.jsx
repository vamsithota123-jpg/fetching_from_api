import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products"
        );
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Pagination Logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="container">
      <h1>Fake Store</h1>

      {loading && <Loader />}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {!loading &&
          !error &&
          currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>

      {!loading && !error && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default App;