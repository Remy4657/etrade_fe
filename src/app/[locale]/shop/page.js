import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import ShopNoSidebar from "./ShopNoSidebar";
import ProductService from "@/services/product.service"
import CategoryService from "@/services/category.service"

const Shop = async () => {
    const products = await ProductService.getProductAll()
    const categories = await CategoryService.getCategoryAll()
    return (
        <>
            <Breadcrumb activeItem="Sản phẩm" title="" />
            <main className="main-wrapper">
                <ShopNoSidebar products={products} categories={categories} />
            </main>
        </>
    );
}

export default Shop;