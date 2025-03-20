import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Product } from "../types/types";
import { getAllProducts } from "../api/product.api";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  console.log("products", products);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const paginatedProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="product-list">
      <h2>Products</h2>
      <div className="products-grid">
        {paginatedProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="product-card"
          >
            <div className="product-badge">
              {product.discountPercentage > 0 && (
                <span className="discount-badge">
                  -{Math.round(product.discountPercentage)}%
                </span>
              )}
            </div>
            <div className="product-image">
              <img
                src={product.thumbnail || "/placeholder.svg"}
                alt={product.title}
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-brand">Brand: {product.brand}</p>
              <p className="product-category">Category: {product.category}</p>

              <div className="product-price">
                <span className="original-price">${product.price}</span>
                <span className="discounted-price">
                  $
                  {Math.round(
                    product.price * (1 - product.discountPercentage / 100)
                  )}
                </span>
              </div>

              <div className="product-rating">
                <span className="rating-value">{product.rating}</span>
                <span className="rating-star">★</span>
              </div>

              <div className="product-stock">
                <p>Stock: {product.stock}</p>
                <p
                  className={`product-status ${
                    product.stock > 0 ? "available" : "unavailable"
                  }`}
                >
                  {product.stock > 0 ? "Available" : "Unavailable"}
                </p>
                <p className="min-order">
                  Min Order: {product.minimumOrderQuantity || "N/A"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page * itemsPerPage >= products.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
