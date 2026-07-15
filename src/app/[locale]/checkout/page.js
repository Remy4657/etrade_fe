'use client';
import { useRouter } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from "react-redux";
import Section from "@/components/elements/Section";
import { addToOrder, checkoutApi } from '@/store/slices/cartSlice';
import { getPaymentAll } from "@/services/payment.service"
import { getShippingAll } from "@/services/shipping.service"

const Checkout = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.cart);
    const { userData, login } = useSelector((state) => state.auth);

    const [listShipping, setListShipping] = useState([])
    const [listPayment, setListPayment] = useState([])
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm(
        {
            defaultValues: {
                shippingMethod: null
            }
        }
    );
    const selectedShippingId = watch("shippingMethod")
    useEffect(() => {
        if (!listShipping?.length) return

        const defaultShipping =
            listShipping.find(item => item.code === "STANDARD") ||
            listShipping[0]
        // react-hook-form compare gia tri string
        setValue("shippingMethod", String(defaultShipping.id))
    }, [listShipping, setValue])


    const selectedShipping = useMemo(() => {
        return listShipping?.find(
            item => item.id === Number(selectedShippingId)
        )
    }, [selectedShippingId, listShipping])

    const shippingFee = selectedShipping?.fee || 0

    useEffect(() => {
        const fetchShipmentAndPaymentMethod = async () => {
            const [dataShipment, dataPayment] = await Promise.all([
                await getShippingAll(),
                await getPaymentAll()
            ]);
            setListShipping(dataShipment.data)
            setListPayment(dataPayment.data)

        }
        fetchShipmentAndPaymentMethod()
    }, [])

    const checkoutFormHandler = (data, e) => {
        if (data) {
            router.push('checkout/order-received');
            dispatch(addToOrder({
                billingAddress: {
                    fullname: data.fullname,
                    lastName: data.lastName,
                    companyName: data.companyName,
                    country: data.country,
                    street: data.street,
                    city: data.city,
                    phone: data.phone,
                    email: data.email,
                    createAccount: data.createAccount,
                    notes: data.notes,
                    payment: data.paymentMethod,
                    shippingMethod: data.shippingMethod,

                },
                items: cartProducts.cartItems,
                totalAmount: cartProducts.cartTotalAmount,
                totalQuantity: cartProducts.cartQuantityTotal,
                orderDate: new Date().toLocaleString(),
            }));
            const listProduct = cartProducts.cartItems?.map(({ cartQuantity, id, price, salePrice, thumbnail, title, ...rest }) => ({
                quantity: cartQuantity,
                ...rest
            }))
            const dataCheckout = {
                userId: userData.id,
                paymentId: +data.paymentMethod,
                shipping: {
                    receiverName: data.fullname,
                    phone: data.phone,
                    email: data.email,
                    address: data.street,
                    city: data.city,
                    notes: data.notes,
                    shippingMethodId: +data.shippingMethod
                },
                items: [...listProduct]
            }
            dispatch(checkoutApi(dataCheckout))

        }
    }
    return (
        <>
            <main className="main-wrapper">
                <Section pClass="axil-checkout-area">
                    {cartProducts.cartItems.length > 0 ?
                        <form onSubmit={handleSubmit(checkoutFormHandler)}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="axil-checkout-billing">
                                        <h4 className="title mb--40">Địa chỉ nhận hàng</h4>
                                        <div className="row">
                                            <div className="col-lg-8">
                                                <div className="form-group">
                                                    <label>Họ tên <span>*</span></label>
                                                    <input type="text" {...register('fullname', { required: true })} placeholder="" />
                                                    {errors.fullname && <p className="error">Họ tên là trường bắt buộc.</p>}
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Địa chỉ <span>*</span></label>
                                                    <input type="text" {...register('street', { required: true })} placeholder="" />
                                                    {errors.street && <p className="error">Địa chỉ là trường bắt buộc.</p>}
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Thành phố <span>*</span></label>
                                                    <input type="text" {...register('city', { required: true })} />
                                                    {errors.city && <p className="error">Thành phố là trường bắt buộc.</p>}
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Số điện thoại <span>*</span></label>
                                                    <input type="number" {...register('phone', { required: true, minLength: 10 })} />
                                                    {errors.phone?.type === 'required' && (
                                                        <p className="error">Vui lòng nhập số điện thoại.</p>
                                                    )}

                                                    {errors.phone?.type === 'minLength' && (
                                                        <p className="error">Số điện thoại phải có ít nhất 10 ký tự.</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Email <span>*</span></label>
                                                    <input type="email" {...register('email', { required: true })} />
                                                    {errors.email && <p className="error">Email là trường bắt buộc.</p>}
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Lời nhắc </label>
                                                    <textarea rows="2" {...register('notes')} placeholder="Lưu ý cho người bán..."></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="axil-order-summery order-checkout-summery">
                                        <h5 className="title mb--20">Chi tiết đơn hàng</h5>
                                        <div className="summery-table-wrap">
                                            <table className="table summery-table">
                                                <thead>
                                                    <tr>
                                                        <th>Sản phẩm</th>
                                                        <th>Tổng cộng</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cartProducts.cartItems?.map((items, index) => (
                                                        <tr className="order-product" key={index}>
                                                            <td>{items.title} <span className="quantity">x{items.cartQuantity}, {items.productSize}, {items.productColor}</span></td>
                                                            <td>${items.salePrice ? items.salePrice : items.price}</td>
                                                        </tr>
                                                    ))}
                                                    <tr className="order-subtotal">
                                                        <td>Giá</td>
                                                        <td>${cartProducts.cartTotalAmount}</td>
                                                    </tr>
                                                    <tr className="order-shipping">
                                                        <td colSpan={2}>
                                                            <div className="shipping-amount">
                                                                <span className="title">Phương thức vận chuyển</span>
                                                            </div>
                                                            {listShipping?.map((item, index) => {
                                                                return (
                                                                    <div className="input-group" key={item.code}>
                                                                        <input type="radio" {...register("shippingMethod")} id={`shipping-${item.code}`} value={String(item.id)} />
                                                                        <label htmlFor={`shipping-${item.code}`}>{item.name}: {item.fee}$</label>
                                                                    </div>
                                                                )
                                                            })}

                                                        </td>
                                                    </tr>
                                                    <tr className="order-total">
                                                        <td>Tổng cộng</td>
                                                        <td className="order-total-amount">${+cartProducts.cartTotalAmount + shippingFee}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="order-payment-method">
                                            {listPayment?.map((item, index) => {
                                                return (

                                                    <div className="single-payment" key={item.code}>
                                                        <div className="input-group">
                                                            <input type="radio" {...register("paymentMethod")} id={`payment-${item.code}`} value={item.id} defaultChecked={item.code == "CASH" ? true : false} />
                                                            <label htmlFor={`payment-${item.code}`}>{item.name}</label>
                                                        </div>
                                                    </div>
                                                )
                                            })}

                                        </div>
                                        <button type="submit" className="axil-btn btn-bg-primary checkout-btn">Đặt hàng</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        :
                        <div className="text-center">
                            <h4>Chưa có sản phẩm nào</h4>
                            <Link href="/shop" className="axil-btn btn-bg-primary">Tiếp tục mua sắm</Link>
                        </div>
                    }
                </Section>
            </main>
        </>
    );
}

export default Checkout;