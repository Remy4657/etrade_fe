import ProductPrice from "./elements/ProductPrice";
import ProductThumbnail from "./elements/ProductThumbnail";
import ProductTitle from "./elements/ProductTitle";
import ProductRating from "./elements/ProductRating";

const ProductList = ({ product }) => {
  return (
    <div className="axil-product-list">
      <ProductThumbnail productThumb={product} width={120} height={120} />
      <div className="product-content">
        <ProductRating rating={product} />
        <ProductTitle productTitle={product} titleTag="h6" />
        <ProductPrice price={product} />
      </div>
    </div>
  );
};

export default ProductList;
