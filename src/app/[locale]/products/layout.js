'use client';
import Footer from "@/components/footer/Footer";
import NewsLetter from "@/components/newsletter/NewsLetter";
import CustomerService from "@/components/services/CustomerService";

const SingleProductLayout = ({ children }) => {
    return (
        <>
            <main className="main-wrapper">
                {children}
                <NewsLetter />
                <CustomerService />
            </main>
            <Footer />
        </>
    );
}

export default SingleProductLayout;