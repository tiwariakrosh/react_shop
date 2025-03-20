import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/types";
import { getProductById } from "../api/product.api";
import { StarFillIcon } from "../assets/icons/StarFillIcon";
import { StarOutlineIcon } from "../assets/icons/StarOutlineIcon";
import { StarHalfIcon } from "../assets/icons/StarHalfIcon";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProductById(Number(id));
        setProduct(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Error fetching product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const averageRating = product?.rating;

  if (loading) return <div className="spinner">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <div className="product-details">
      <h1 className={"product-details-title"}>{product.title}</h1>
      <div className={"product'-content"}>
        <div className={"images"}>
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.title} ${index}`}
              width={400}
              height={400}
              className={"product-image"}
            />
          ))}
        </div>
        <div className={"details"}>
          <p className={"brand"}>Brand: {product.brand}</p>
          <p className={"description"}>{product.description}</p>
          <div className={"price-info"}>
            <span className={"original-price"}>${product.price}</span>
            <span className={"discounted-price"}>
              $
              {(product.price * (1 - product.discountPercentage / 100)).toFixed(
                2
              )}
            </span>
            <span className={"discount"}>
              ({product.discountPercentage}% off)
            </span>
          </div>
          <p className={"availability"}>
            Availability:{" "}
            <span
              className={
                product.availabilityStatus === "Low Stock"
                  ? "lowStock"
                  : "inStock"
              }
            >
              {product.availabilityStatus}
            </span>
          </p>
          <p className={"stock"}>Stock: {product.stock} units</p>
          <p className={"sku"}>SKU: {product.sku}</p>
          <p className={"weight"}>Weight: {product.weight} oz</p>
          <p className={"dimensions"}>
            Dimensions: {product.dimensions.width}×{product.dimensions.height}×
            {product.dimensions.depth} cm
          </p>
          <p className={"warranty"}>Warranty: {product.warrantyInformation}</p>
          <p className={"shipping"}>Shipping: {product.shippingInformation}</p>
          <p className={"return-policy"}>
            Return Policy: {product.returnPolicy}
          </p>
          <p className={"min-order"}>
            Minimum Order: {product.minimumOrderQuantity} units
          </p>
          <div className={"tags"}>
            {product.tags.map((tag, index) => (
              <span key={index} className={"tag"}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rating-overview">
        <div className="average-rating">{averageRating?.toFixed(1)}</div>
        <div className="stars-container">
          <RatingStars rating={averageRating || 0} />
        </div>
        <p className="review-count">
          Based on {product.reviews.length} reviews
        </p>
      </div>
      <div className="reviews-list-header">
        <h3>Customer Feedback</h3>
        <div className="reviews-badge">{product.reviews.length} Reviews</div>
      </div>
      <div className="reviews-list">
        {product.reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
              <div className="reviewer-info">
                <div className="avatar">
                  {review.reviewerName
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </div>
                <div className="reviewer-details">
                  <h4>{review.reviewerName}</h4>
                  <div className="stars-container small">
                    <RatingStars rating={review.rating} />
                  </div>
                </div>
              </div>
              <div className="review-date">
                {new Date(review.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>

            <div className="separator"></div>

            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper component to render star ratings
function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="stars">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="star full">
          <StarFillIcon />
        </span>
      ))}

      {hasHalfStar && (
        <span className="star half">
          <StarHalfIcon />
        </span>
      )}

      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="star empty">
          <StarOutlineIcon />
        </span>
      ))}
    </div>
  );
}

export default ProductDetails;
