import SingleLayouThree from "./SingleLayouThree";
import { getDetailProduct, getProductCategory } from "@/services/product.service"

const ProductDetails = async ({ params }) => {
    const productId = await params.id
    const productDetail = await getDetailProduct(productId);
    const products = await getProductCategory(productDetail?.pcate)
    return (
        <>
            <SingleLayouThree products={products} productDetail={productDetail} />
        </>
    );
}

export default ProductDetails;
