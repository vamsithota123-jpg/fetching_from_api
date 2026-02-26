function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="price">${product.price}</p>
      <p>⭐ {product.rating.rate}</p>
    </div>
  );
}

export default ProductCard;