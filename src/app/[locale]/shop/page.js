import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import ShopNoSidebar from "./ShopNoSidebar";


const Shop = () => {
    return (
        <>
            <Breadcrumb activeItem="Sản phẩm" title="" />
            <main className="main-wrapper">
                <ShopNoSidebar />
            </main>
        </>
    );
}

export default Shop;