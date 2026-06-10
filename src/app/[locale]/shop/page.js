import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import Footer from "@/components/footer/Footer";
import NewsLetter from "@/components/newsletter/NewsLetter";
import CustomerService from "@/components/services/CustomerService";
import ShopNoSidebar from "./ShopNoSidebar";
import ShopWithSidebar from "./ShopWithSidebar";

const Shop = ({ searchParams }) => {
    return (
        <>
            <Breadcrumb activeItem="Shop" title="Explore All Products" />
            <main className="main-wrapper">
                <ShopNoSidebar />
                <NewsLetter />
                <CustomerService />
            </main>
            <Footer />
        </>
    );
}

export default Shop;