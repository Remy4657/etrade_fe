'use client';
import { useState, useEffect, useMemo } from "react";
import { getPriceRange, slugify } from "@/utils";
import { Category } from "@/data/ProductCategory";
import ProductOne from "@/components/product/ProductOne";
import ProductsData from "@/data/Products";
import Section from "@/components/elements/Section";
import { ColorAttribute } from "@/data/ProductAttribute";
import { getProductAll } from "@/services/product.service"
import { getCategoryAll } from "@/services/category.service"



const ShopNoSidebar = () => {

    const [cateProduct, setcateProduct] = useState(ProductsData);
    const [listProduct, setListProduct] = useState([])
    const [listCategory, setListCategory] = useState([])
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState(null);
    const [rangePrice, setRangePrice] = useState(null);

    const [productShow, setProductShow] = useState(12);
    const priceRange = getPriceRange(ProductsData);

    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const [cateRes, productRes] = await Promise.all([
                    getCategoryAll(),
                    getProductAll()
                ])
                setListCategory(cateRes.data)
                setListProduct(productRes.data)
            } catch (error) {
                console.error("err: ", error)
            }
        }
        fetchAllOrders()
    }, [])
    const filteredProducts = useMemo(() => {
        let result = [...listProduct];
        //  FILTER theo category
        if (category !== "all") {
            result = result.filter(
                p => slugify(p.pcate) === category
            );
        }
        //  SORT theo giá
        if (sort === "asc") {
            result.sort((a, b) => a.salePrice - b.salePrice);
        } else if (sort === "desc") {
            result.sort((a, b) => b.salePrice - a.salePrice);
        }
        // FILTER theo range price
        if (rangePrice != "null" && rangePrice != null) {
            console.log("zo day: ", rangePrice)
            const splitValue = rangePrice.split("-");
            result = result.filter(data => data.salePrice >= parseInt(splitValue[0]) && data.price <= parseInt(splitValue[1]));
        }
        return result;
    }, [listProduct, category, sort, rangePrice]);
    const sortHandler = (e) => {
        setSort(e.target.value)
    };
    const ProductShowHandler = () => {
        setProductShow(productShow + 4);
    }
    const CategoryHandler = (e) => {
        setCategory(e.target.value)
    }
    const colorHandler = (e) => {
        let getColorData = ProductsData.filter((items) => {
            let colors = items.colorAttribute?.filter(color => slugify(color.color) === e.target.value)
            return colors?.length > 0;
        })
        setcateProduct(getColorData)
    }
    const priceRangeHandler = (e) => {
        const value = e.target.value;
        setRangePrice(value)

    }
    return (
        <Section pClass="axil-shop-area">
            <div className="row">
                <div className="col-lg-12">
                    <div className="axil-shop-top">
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="category-select">
                                    <select className="single-select" onChange={CategoryHandler}>
                                        <option value="all">All Categories</option>
                                        {listCategory.map((data, index) => (
                                            <option value={slugify(data.name)} key={index}>{data.name}</option>
                                        ))}
                                    </select>
                                    {/* <select className="single-select" onChange={colorHandler}>
                                        {ColorAttribute.map((data, index) => (
                                            <option value={slugify(data)} key={index}>{data}</option>
                                        ))}
                                    </select> */}
                                    <select className="single-select" onChange={priceRangeHandler}>
                                        <option value="null">Price Range</option>
                                        {priceRange.map((data, index) => (
                                            <option value={`${data.from}-${data.to}`} key={index}>{data.from} - {data.to}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="category-select mt_md--10 mt_sm--10 justify-content-lg-end">
                                    <select className="single-select" onChange={sortHandler}>
                                        {/* <option value="latest">Sort by Latest</option>
                                        <option value="name">Sort by Name</option> */}
                                        <option value="default">Sort default</option>
                                        <option value="asc">Sort by price asc</option>
                                        <option value="desc">Sort by price desc</option>

                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row row--15">
                {filteredProducts.length > 0 ? filteredProducts.slice(0, productShow).map((data) => (
                    <div className="col-xl-3 col-lg-4 col-sm-6" key={data.id}>
                        <ProductOne product={data} pClass="mt--40" />
                    </div>
                )) : <h4 className="text-center pt--30">No Data Found</h4>}
            </div>
            <div className="text-center pt--30">
                <button className={`axil-btn btn-bg-lighter btn-load-more ${cateProduct.length < productShow ? "disabled" : ""}`} onClick={ProductShowHandler}>{cateProduct.length < productShow ? "No More Data" : "Load more"}</button>
            </div>
        </Section>
    );
}

export default ShopNoSidebar;