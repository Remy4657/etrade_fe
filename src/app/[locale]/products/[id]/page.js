import SingleLayouThree from "./SingleLayouThree";
const ProductDetails = async ({ params }) => {
    return (
        <>
            <SingleLayouThree idProduct={params.id} />
        </>
    );
}

export default ProductDetails;
