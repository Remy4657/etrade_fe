import { discountPercentage } from "@/utils";

const ProductDiscountLabel = (props) => {
  return (
    <div className="label-block label-right">
      <div className="product-badget">
        giảm{" "}
        {`${discountPercentage(props.discount.price, props.discount.salePrice)}%`}
      </div>
    </div>
  );
};

export default ProductDiscountLabel;
