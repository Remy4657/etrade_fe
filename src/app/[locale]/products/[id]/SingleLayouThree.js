'use client';
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import FsLightbox from "fslightbox-react";
import { addToCart, addToWishlist, addToCartAPI } from "@/store/slices/productSlice";
import SlickSlider from "@/components/elements/SlickSlider";
import { discountPercentage, reviewAverage, slugify } from "@/utils";
import { ProductReview } from "@/data/Comments";
import ProductRating from "@/components/product/elements/ProductRating";
import { getDetailProduct, getProductCategory } from "@/services/product.service"
import Section from "@/components/elements/Section";
import SectionTitle from "@/components/elements/SectionTitle";
import ProductsData from "@/data/Products";
import Product from "@/components/product/Product";
import { toast } from "react-toastify";

const SingleLayouThree = ({ idProduct }) => {
    const router = useRouter()
    const dispatch = useDispatch();
    const getWishlist = useSelector((state) => state.productData.wishlistItems);
    const userData = useSelector((state) => state.auth);

    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();
    const [quantity, setquantity] = useState(1);
    const [colorImage, setColorImage] = useState("");
    const [productSize, setProductSize] = useState("");
    const [fsToggler, setFsToggler] = useState(false);
    const [singleData, setSingleData] = useState(null)
    const [categoryProductDetail, setCategoryProductDetail] = useState("")
    const [listProductCategory, setListProductCategory] = useState([])

    const findProduct = ProductsData.filter(product => slugify(product.id) === slugify(idProduct));
    const singleProduct = findProduct[0];
    const productCategory = singleProduct?.pCate;
    const relatedProduct = ProductsData.filter(product => slugify(product.pCate) === slugify(productCategory));



    const findReview = useMemo(() => {
        if (!singleData?.id) return [];
        return ProductReview.filter(
            (data) => slugify(data.productId) === slugify(singleData.id)
        );
    }, [singleData]);

    const ratingNumber = useMemo(() => {
        if (!findReview.length) return 0;
        return reviewAverage(findReview);
    }, [findReview]);

    const isWishlistAdded = useMemo(() => {
        if (!singleData?.id) return false;
        return getWishlist.some((item) => item.id === singleData.id);
    }, [getWishlist, singleData]);

    useEffect(() => {
        const fetchDetailProduct = async () => {
            try {
                const productDetail = await getDetailProduct(idProduct);
                setSingleData(productDetail.data);
                setCategoryProductDetail(productDetail?.data?.pcate)
            } catch (error) {
                console.error("Fetch product failed:", error);
            }
        };

        if (idProduct) {
            fetchDetailProduct();
        }
    }, [idProduct]);
    useEffect(() => {
        const fetchProductCategory = async () => {
            try {
                const res = await getProductCategory(categoryProductDetail);

                setListProductCategory(res?.data)
            } catch (error) {
                console.error("Fetch product category failed:", error);
            }
        };
        if (categoryProductDetail) {

            fetchProductCategory();
        }
    }, [categoryProductDetail]);

    const handleAddToCart = async (cartAddedData) => {
        if (!userData?.login) {
            router.push("/sign-in");
            return;
        }
        let product = { ...cartAddedData }

        if (quantity > 0) {
            product.cartQuantity = quantity;
            product.productColor = colorImage.color;
            product.productSize = productSize;
            // start: rename id to productId
            product.productId = product.id;
            delete product.id;
            // end: rename id to productId
            try {
                await dispatch(addToCartAPI({
                    productId: product.productId,
                    quantity: product.cartQuantity,
                    productColor: colorImage.color,
                    productSize
                })).unwrap()
                dispatch(addToCart(product));
            } catch (error) {
                toast.error(error.message || "Có lỗi xảy ra khi thêm vào giỏ hàng");
            }

        } else {
            alert("Please select minimum 1 quantity")
        }
    };

    const handleAddToWishlist = (product) => {
        dispatch(addToWishlist(product));
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setquantity(quantity - 1);
        }
    }

    const incrementQuantity = () => {
        setquantity(quantity + 1);
    }

    const colorImageHandler = (color) => {
        setColorImage(color);
    };

    const productSizeHandler = (size) => {
        setProductSize(size);
    };
    const getFullscreenPreview = () => {
        let galleryPreview = [];
        if (singleData.gallery) {
            singleData.gallery?.map((img) => {
                galleryPreview.push(img);
            })
        } else {
            galleryPreview.push(singleData.thumbnail);
        }
        return galleryPreview;
    }
    if (!singleData) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <section className="axil-single-product-area axil-section-gap pb--0">
                <div className="single-product-thumb mb--40">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 mb--40">
                                <div className="row">
                                    <div className="col-lg-10 order-lg-2">
                                        <div className="single-product-thumbnail-wrap">
                                            <SlickSlider
                                                class="single-product-thumbnail product-large-thumbnail-3 axil-product"
                                                slidesToShow={1}
                                                infinite={false}
                                                draggable={false}
                                                focusOnSelect={true}
                                                adaptiveHeight={true}
                                                asNavFor={nav2}
                                                ref={(slider1 => setNav1(slider1))}
                                            >
                                                {singleData.gallery ? singleData.gallery?.map((galleryImg, index) => (
                                                    <div className="thumbnail" key={index}>
                                                        <Image
                                                            src={galleryImg}
                                                            height={584}
                                                            width={584}
                                                            alt="Gallery Image"
                                                        />
                                                    </div>
                                                )) :
                                                    <div className="thumbnail">
                                                        <Image
                                                            src={singleData.thumbnail}
                                                            height={584}
                                                            width={584}
                                                            alt="Gallery Image"
                                                        />
                                                    </div>
                                                }
                                            </SlickSlider>
                                            {singleData.salePrice &&
                                                <div className="label-block">
                                                    <div className="product-badget">{discountPercentage(singleData.price, singleData.salePrice)}% OFF</div>
                                                </div>
                                            }
                                            {/* {singleData.gallery && 
                                        <>
                                            <div className="product-quick-view position-view">
                                                <button onClick={() => setFsToggler(!fsToggler)} className="popup-zoom">
                                                    <i className="far fa-search-plus" />
                                                </button>
                                            </div>
                                            <FsLightbox
                                            toggler={fsToggler}
                                            sources={getFullscreenPreview()}
                                            />
                                        </>
                                        } */}
                                        </div>
                                    </div>
                                    <div className="col-lg-2 order-lg-1">
                                        <SlickSlider
                                            class="product-small-thumb-3 small-thumb-wrapper"
                                            slidesToShow={5}
                                            infinite={false}
                                            draggable={false}
                                            focusOnSelect={true}
                                            vertical={true}
                                            asNavFor={nav1}
                                            ref={(slider2 => setNav2(slider2))}
                                            responsive={[
                                                {
                                                    breakpoint: 992,
                                                    settings: {
                                                        vertical: false,
                                                    }
                                                },
                                            ]}
                                        >
                                            {singleData.gallery ? singleData.gallery?.map((galleryImg, index) => (
                                                <div className="small-thumb-img" key={index}>
                                                    <Image
                                                        src={galleryImg}
                                                        height={207}
                                                        width={213}
                                                        alt="Thumb Image"
                                                    />
                                                </div>
                                            )) :
                                                <div className="small-thumb-img">
                                                    <Image
                                                        src={singleData.thumbnail}
                                                        height={207}
                                                        width={213}
                                                        alt="Thumb Image"
                                                    />
                                                </div>}
                                        </SlickSlider>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 mb--40">
                                <div className="single-product-content">
                                    <div className="inner">
                                        <h2 className="product-title">{singleData.title}</h2>
                                        <span className="price-amount">${singleData.salePrice ? singleData.salePrice : singleData.price}</span>
                                        <ProductRating rating={singleData} textEnable />
                                        {singleData.shortDes &&
                                            <>
                                                <ul className="product-meta" dangerouslySetInnerHTML={{ __html: singleData.shortDes.listItem }}></ul>
                                                <p>{singleData.shortDes.text}</p>
                                            </>
                                        }
                                        <div className="product-variations-wrapper">
                                            {singleData.colorAttribute &&
                                                <div className="product-variation">
                                                    <h6 className="title">Colors:</h6>
                                                    <div className="color-variant-wrapper">
                                                        <ul className="color-variant">
                                                            {singleData.colorAttribute?.map((data, index) => (
                                                                <li className={`${data.color} ${colorImage.color === data.color ? "active" : ""
                                                                    }`} key={index} onClick={() => colorImageHandler(data)}>
                                                                    <span>
                                                                        <span className="color" />
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            }
                                            {singleData.sizeAttribute &&
                                                <div className="product-variation product-size-variation">
                                                    <h6 className="title">Size:</h6>
                                                    <ul className="range-variant">
                                                        {singleData.sizeAttribute?.map((data, index) => (
                                                            <li key={index} className={productSize === data ? "active" : ""}
                                                                onClick={() => productSizeHandler(data)}>{data}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            }
                                        </div>

                                        <div className="product-action-wrapper d-flex-center">
                                            <div className="pro-qty">
                                                <span className="qtybtn" onClick={decrementQuantity}>-</span>
                                                <input type="number" className="quantity-input" value={quantity} readOnly />
                                                <span className="qtybtn" onClick={incrementQuantity}>+</span>
                                            </div>
                                            <ul className="product-action d-flex-center mb--0">
                                                <li className="add-to-cart">
                                                    <button disabled={(singleData.colorAttribute && !colorImage) || (singleData.sizeAttribute && !productSize) ? true : false} onClick={() => handleAddToCart(singleData)} className="axil-btn btn-bg-primary">Add to Cartt</button>
                                                </li>
                                                <li className="wishlist">
                                                    <button className="axil-btn wishlist-btn" onClick={() => handleAddToWishlist(singleData)}><i className={isWishlistAdded.length === 1 ? "fas fa-heart" : "far fa-heart"} /></button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="woocommerce-tabs wc-tabs-wrapper bg-vista-white">
                    <div className="container">
                        <ul className="nav tabs" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a className="active" id="description-tab" data-bs-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">Description</a>
                            </li>
                            <li className="nav-item " role="presentation">
                                <a id="additional-info-tab" data-bs-toggle="tab" href="#additional-info" role="tab" aria-controls="additional-info" aria-selected="false">Additional Information</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a id="reviews-tab" data-bs-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false">Reviews</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                                <div className="product-desc-wrapper">
                                    <div className="row">
                                        {Array.isArray(singleData.description.textDesc) && singleData.description.textDesc?.map((data, index) => (
                                            <div className="col-lg-6 mb--30" key={index}>
                                                <div className="single-desc">
                                                    <h5 className="title">{data.title}</h5>
                                                    <p>{data.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <ul className="pro-des-features">
                                                {singleData.description.listDesc?.map((data, index) => (
                                                    <li className="single-features" key={index}>
                                                        <div className="icon">
                                                            <Image
                                                                src={data.icon}
                                                                width={30}
                                                                height={34}
                                                                alt="icon"
                                                            />
                                                        </div>
                                                        {data.title}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="additional-info" role="tabpanel" aria-labelledby="additional-info-tab">
                                <div className="product-additional-info">
                                    <div className="table-responsive">
                                        <table>
                                            <tbody>
                                                {singleData.addInfo?.map((data, index) => (
                                                    <tr key={index}>
                                                        <th>{data.title}</th>
                                                        <td>{data.text}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                                <div className="reviews-wrapper">
                                    <div className="row">
                                        <div className="col-lg-6 mb--40">
                                            <div className="axil-comment-area pro-desc-commnet-area">
                                                <h5 className="title">{findReview.length} Review for this product</h5>
                                                <ul className="comment-list">
                                                    {findReview?.map((data, index) => (
                                                        <li className="comment" key={index}>
                                                            <div className="comment-body">
                                                                <div className="single-comment">
                                                                    <div className="comment-img">
                                                                        <Image
                                                                            src={data.user_thumbnail}
                                                                            height={60}
                                                                            width={60}
                                                                            alt={data.user_name}
                                                                        />
                                                                    </div>
                                                                    <div className="comment-inner">
                                                                        <h6 className="commenter">
                                                                            <span className="hover-flip-item-wrapper">{data.user_name}</span>
                                                                            <span className="commenter-rating">
                                                                                {
                                                                                    [...Array(5)]?.map((item, index) => (
                                                                                        <i
                                                                                            className={`${index <= data.rating - 1 ? '' : 'empty-rating'} fas fa-star`}
                                                                                            key={index}
                                                                                        />
                                                                                    ))
                                                                                }
                                                                            </span>
                                                                        </h6>
                                                                        <div className="comment-text">
                                                                            <p>{data.comment}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb--40">
                                            <div className="comment-respond pro-des-commend-respond mt--0">
                                                <h5 className="title mb--30">Add a Review</h5>
                                                <p>Your email address will not be published. Required fields are marked *</p>
                                                <div className="rating-wrapper d-flex-center mb--40">
                                                    Your Rating <span className="require">*</span>
                                                    <div className="reating-inner ml--20">
                                                        <a href="#"><i className="fal fa-star" /></a>
                                                        <a href="#"><i className="fal fa-star" /></a>
                                                        <a href="#"><i className="fal fa-star" /></a>
                                                        <a href="#"><i className="fal fa-star" /></a>
                                                        <a href="#"><i className="fal fa-star" /></a>
                                                    </div>
                                                </div>
                                                <form action="#">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label>Other Notes (optional)</label>
                                                                <textarea name="message" placeholder="Your Comment" defaultValue={""} />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6 col-12">
                                                            <div className="form-group">
                                                                <label>Name <span className="require">*</span></label>
                                                                <input id="name" type="text" />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6 col-12">
                                                            <div className="form-group">
                                                                <label>Email <span className="require">*</span> </label>
                                                                <input id="email" type="email" />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="form-submit">
                                                                <button type="submit" id="submit" className="axil-btn btn-bg-primary w-auto">Submit Comment</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Section pClass="pb--50 pb_sm--30">
                <SectionTitle
                    title="Related Items"
                    subtitle="Your Recently"
                    subtitleIcon="far fa-shopping-basket"
                    subColor="highlighter-primary"
                />
                <SlickSlider
                    class="recent-product-activation slick-layout-wrapper--15 axil-slick-arrow arrow-top-slide"
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
                    {listProductCategory?.slice(0, 10)?.map((data) => (
                        <Product product={data} key={data.id} />
                    ))}
                </SlickSlider>
            </Section>
        </>
    );
}

export default SingleLayouThree;