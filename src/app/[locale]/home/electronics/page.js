'use client';
import Link from "next/link";
import CategoryElectronics from "@/components/category/CategoryElectronics";
import Section from "@/components/elements/Section";
import SectionTitle from "@/components/elements/SectionTitle";
import SlickSlider from "@/components/elements/SlickSlider";
import BannerOne from "@/components/hero-banner/BannerOne";
import PosterOne from "@/components/poster/PosterOne";
import Product from "@/components/product/Product";
import TestimonialOne from "@/components/testimonial/TestimonialOne";
import WhyChoose from "@/components/why-choose/WhyChoose";
import ProductList from "@/components/product/ProductList";
import { mapInSlices, slugify } from "@/utils";
import { useEffect, useState } from "react";
import { getCategoryAll } from "@/services/category.service"
import { getProductBestseller, getProductNewest } from "@/services/product.service"
import { fetchAllProductAPI } from "@/store/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";


const HomeElectronics = () => {
    const dispatch = useDispatch()
    const { listProducts, isLoading } = useSelector((state) => state.productData);

    const [listCategory, setListCategory] = useState([])
    const [listProductNewest, setListProductNewest] = useState([])
    const [listProductBestseller, setListProductBestseller] = useState([])

    const exploreProductSeperate = mapInSlices(listProducts, 12);

    useEffect(() => {
        dispatch(fetchAllProductAPI())
    }, [dispatch])

    console.log("isLoading: ", isLoading)

    useEffect(() => {
        const fetchAllCategory = async () => {
            try {
                const [cateRes] = await Promise.all([
                    getCategoryAll(),
                ])
                setListCategory(cateRes.data)
            } catch (error) {
                console.log(error)
            }
        }
        const fetchAllProductBestseller = async () => {
            try {
                const res = await getProductBestseller()
                setListProductBestseller(res?.data)
            } catch (error) {
                console.log(error)

            }

        }
        const fetchAllProductNewest = async () => {
            try {
                const res = await getProductNewest()
                setListProductNewest(res?.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllProductBestseller()
        fetchAllProductNewest()
        fetchAllCategory()
    }, [])
    if (isLoading) {
        return <>Loading...</>
    }

    return (
        <>
            <main className="main-wrapper">
                <BannerOne />
                <CategoryElectronics listCategory={listCategory} />
                <PosterOne singleAnimation />
                <Section>
                    <SectionTitle
                        title=""
                        subtitle="Sản phẩm"
                        subtitleIcon="far fa-shopping-basket"
                        subColor="highlighter-secondary"
                    />
                    <SlickSlider
                        class="explore-product-activation slick-layout-wrapper slick-layout-wrapper--15 axil-slick-arrow arrow-top-slide"
                        slidesToShow={1}
                    >
                        {exploreProductSeperate.slice(0, 2)?.map((product, index) => (
                            <div key={index}>
                                <div className="row row--15">
                                    {product?.map((data) => (
                                        <div className="col-xl-3 col-lg-4 col-sm-6 col-12 mb--30" key={data.id}>
                                            <Product product={data} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </SlickSlider>
                    <div className="row">
                        <div className="col-lg-12 text-center mt--20 mt_sm--0">
                            <Link href="/shop" className="axil-btn btn-bg-lighter btn-load-more">Xem thêm</Link>
                        </div>
                    </div>
                </Section>
                <TestimonialOne />
                <Section pClass="pb--0" borderBottom="pb--50">
                    <SectionTitle
                        title=""
                        subtitle="Sản phẩm mới"
                        subtitleIcon="far fa-shopping-basket"
                        subColor="highlighter-primary"
                    />

                    <SlickSlider
                        class="slick-layout-wrapper--30 axil-slick-arrow arrow-top-slide"
                        slidesToShow={4}
                        infinite={false}
                        responsive={[
                            {
                                breakpoint: 1400,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 3,
                                }
                            },
                            {
                                breakpoint: 992,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2,
                                }
                            },
                            {
                                breakpoint: 575,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                }
                            },
                        ]}
                    >
                        {listProductNewest?.map((data) => (
                            <Product product={data} key={data.id} />
                        ))}

                    </SlickSlider>

                </Section>
                <Section pClass="axil-most-sold-product" borderBottom="pb--50">
                    <SectionTitle
                        title=""
                        subtitle="Sản phẩm bán chạy"
                        subtitleIcon="fas fa-star"
                        subColor="highlighter-primary"
                        pClass="section-title-center"
                    />
                    <div className="row row-cols-xl-2 row-cols-1 row--15">
                        {listProductBestseller?.map((data) => (
                            <div className="col" key={data.id}>
                                <ProductList product={data} />
                            </div>
                        ))}
                    </div>
                </Section>
                <WhyChoose />

            </main>
        </>
    );
}

export default HomeElectronics;