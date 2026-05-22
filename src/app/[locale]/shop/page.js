import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import Footer from "@/components/footer/Footer";
import HeaderFive from "@/components/header/HeaderFive";
import NewsLetter from "@/components/newsletter/NewsLetter";
import ServiceTwo from "@/components/services/ServiceTwo";
import ShopNoSidebar from "./ShopNoSidebar";
import ShopWithSidebar from "./ShopWithSidebar";

const Shop = ({ searchParams }) => {
    return (
        <>
            {/* <HeaderFive headerCampaign /> */}
            <Breadcrumb activeItem="Shop" title="Explore All Products" />
            <main className="main-wrapper">
                <ShopNoSidebar />
                <NewsLetter />
                <ServiceTwo />
            </main>
            <Footer />
        </>
    );
}

export default Shop;