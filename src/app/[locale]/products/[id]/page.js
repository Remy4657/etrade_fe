import ProductsData from "@/data/Products";
import { slugify } from "@/utils";
import SingleLayouThree from "./SingleLayouThree";

export const dynamic = "force-dynamic";
const ProductDetails = async ({ params }) => {
    //const productDetail = await getDetailProduct(params.id);
    //console.log("productDetail: ", productDetail)
    // if (!productDetail.ok) {
    //     const data = await productDetail.json();
    //     throw new Error(data.message || "Failed to fetch product");
    // }
    return (
        <>
            <SingleLayouThree idProduct={params.id} />

        </>
    );
}

export default ProductDetails;


export async function generateStaticParams() {
    const products = ProductsData;

    return products.map((post) => ({
        id: slugify(post.id),
    }));
}