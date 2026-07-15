'use client';
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { slugify } from "@/utils";
import { removeFromCartAPI, updateProductCartQuantity, removeCartItem, cartQuantityIncrease, cartQuantityDecrease, cartClear, updateCartAmount } from "@/store/slices/cartSlice";
import { toast } from "react-toastify";
import { logout } from "@/store/slices/authSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const cartProducts = useSelector((state) => state.cart);

    const removeCartHandler = async (data) => {
        try {
            const res = await dispatch(removeFromCartAPI(data.id));
            if (res.meta.requestStatus === "rejected") {
                await dispatch(logout())
                toast.error("Hết phiên đăng nhập để thực hiện chức năng này");
                router.push("/sign-in")
                return
            }
            dispatch(removeCartItem(data));
        } catch (error) {
            toast.error("Có lỗi xảy ra khi xóa sản phẩm, vui lòng thử lại");
        }

    };

    const quantityIncreaseHandler = (data) => {
        dispatch(cartQuantityIncrease(data))
        dispatch(updateProductCartQuantity({ cartItemId: data.id, typeUpdate: "increase" }))
    }
    const quantityDecreaseHandler = (data) => {
        dispatch(cartQuantityDecrease(data))
        dispatch(updateProductCartQuantity({ cartItemId: data.id, typeUpdate: "decrease" }))

    }
    const cartClearHandler = () => {
        dispatch(cartClear())
    }
    const updateCartHandler = () => {
        dispatch(updateCartAmount())
    }

    return (
        <>
            <main className="main-wrapper">
                <div className="axil-product-cart-area axil-section-gap">
                    <div className="container">
                        {cartProducts.cartItems.length > 0 ?
                            <div className="axil-product-cart-wrap">
                                <div className="product-table-heading">
                                    <h4 className="title">Giỏ hàng của tôi</h4>
                                    {/* <button className="cart-clear" onClick={() => cartClearHandler()}>Clear Shoping Cart</button> */}
                                </div>
                                <div className="table-responsive">
                                    <table className="table axil-product-table axil-cart-table mb--40">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="product-remove" />
                                                <th scope="col" className="product-thumbnail">Sản phẩm</th>
                                                <th scope="col" className="product-title" />
                                                <th scope="col" className="product-price">Kích thước</th>
                                                <th scope="col" className="product-price">Màu sắc</th>
                                                <th scope="col" className="product-price">Giá</th>
                                                <th scope="col" className="product-quantity">Số lượng</th>
                                                <th scope="col" className="product-subtotal">Tổng cộng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartProducts.cartItems?.map((product) => (
                                                <tr key={product.id}>
                                                    <td className="product-remove">
                                                        <button className="remove-wishlist" onClick={() => removeCartHandler(product)}>
                                                            <i className="fal fa-times" />
                                                        </button>
                                                    </td>
                                                    <td className="product-thumbnail">
                                                        <Link href={`/products/${slugify(product.id)}`}>
                                                            <Image
                                                                src={product.thumbnail}
                                                                width={80}
                                                                height={80}
                                                                alt={product.title}

                                                            />
                                                        </Link>
                                                    </td>
                                                    <td className="product-title">
                                                        <Link href={`/products/${slugify(product.id)}`}>
                                                            {product.title}
                                                        </Link>
                                                    </td>
                                                    <td className="product-price" data-title="Size">
                                                        {product.productSize}
                                                    </td>
                                                    <td className="product-price" data-title="Color">
                                                        {product.productColor}
                                                    </td>
                                                    <td className="product-price" data-title="Price">
                                                        <span className="currency-symbol">$</span>
                                                        {product.salePrice ? product.salePrice : product.price}
                                                    </td>
                                                    <td className="product-quantity" data-title="Qty">
                                                        <div className="pro-qty">
                                                            <span className="qtybtn" onClick={() => quantityDecreaseHandler(product)}>-</span>
                                                            <input type="number" className="quantity-input" value={product.cartQuantity} readOnly />
                                                            <span className="qtybtn" onClick={() => quantityIncreaseHandler(product)}>+</span>
                                                        </div>
                                                    </td>
                                                    <td className="product-subtotal" data-title="Tổng">
                                                        <span className="currency-symbol">$</span>
                                                        {product.salePrice ? product.salePrice * product.cartQuantity : product.price * product.cartQuantity}
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                                <div className="cart-update-btn-area">
                                    <div className="input-group product-cupon">
                                        <input placeholder="Nhập mã giảm giá" type="text" />
                                        <div className="product-cupon-btn">
                                            <button type="submit" className="axil-btn btn-outline">Áp dụng</button>
                                        </div>
                                    </div>
                                    <div className="update-btn">
                                        {/* <button className="axil-btn btn-outline" onClick={() => updateCartHandler()}>Cập nhật thay đổi</button> */}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-5 col-lg-7 offset-xl-7 offset-lg-5">
                                        <div className="axil-order-summery mt--80">
                                            <div className="summery-table-wrap">
                                                <table className="table summery-table mb--30">
                                                    <tbody>
                                                        {/* <tr className="order-subtotal">
                                                            <td>Tổng cộng</td>
                                                            <td>${cartProducts.cartTotalAmount}</td>
                                                        </tr>
                                                        <tr className="order-shipping">
                                                            <td>Shipping</td>
                                                            <td>
                                                                <div className="input-group">
                                                                    <input type="radio" id="radio1" name="shipping" defaultChecked />
                                                                    <label htmlFor="radio1">Free Shippping</label>
                                                                </div>
                                                                <div className="input-group">
                                                                    <input type="radio" id="radio2" name="shipping" />
                                                                    <label htmlFor="radio2">Local: $35.00</label>
                                                                </div>
                                                                <div className="input-group">
                                                                    <input type="radio" id="radio3" name="shipping" />
                                                                    <label htmlFor="radio3">Flat rate: $12.00</label>
                                                                </div>
                                                            </td>
                                                        </tr> */}
                                                        <tr className="order-total">
                                                            <td>Tổng cộng:</td>
                                                            <td className="order-total-amount">${cartProducts.cartTotalAmount}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <Link href="/checkout" className="axil-btn btn-bg-primary checkout-btn">
                                                Tiếp tục thanh toán
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div> :
                            <div className="text-center">
                                <h4>Giỏ hàng trống</h4>
                                <Link className="axil-btn btn-bg-primary" href="/shop">Tiếp tục mua sắm</Link>
                            </div>
                        }
                    </div>
                </div>
            </main>
        </>
    );
}

export default Cart;