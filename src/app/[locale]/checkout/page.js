'use client';
import { useRouter } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from "react-redux";
import Section from "@/components/elements/Section";
import Footer from "@/components/footer/Footer";
import { addToOrder } from '@/store/slices/productSlice';
import { getPaymentAll } from "@/services/payment.service"
import { getShippingAll } from "@/services/shipping.service"
import { checkoutApi } from '@/store/slices/productSlice';

const Checkout = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.productData);
    const { userData } = useSelector((state) => state.auth);

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
        const fetchAllShippinng = async () => {
            try {
                const { data } = await getShippingAll()
                setListShipping(data)
            } catch (error) {

            }


        }
        const fetchAllPayment = async () => {
            try {
                const { data } = await getPaymentAll()
                setListPayment(data)
            } catch (error) {

            }

        }
        fetchAllShippinng()
        fetchAllPayment()
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
                                        <h4 className="title mb--40">Billing details</h4>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label>Full Name <span>*</span></label>
                                                    <input type="text" {...register('fullname', { required: false })} placeholder="Adam" />
                                                    {errors.fullname && <p className="error">Full Name is required.</p>}
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Street Address <span>*</span></label>
                                                    <input type="text" {...register('street', { required: false })} placeholder="House number and street name" />
                                                    {errors.street && <p className="error">Street Address is required.</p>}
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Town/ City <span>*</span></label>
                                                    <input type="text" {...register('city', { required: false })} />
                                                    {errors.city && <p className="error">Town/ City is required.</p>}
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Phone <span>*</span></label>
                                                    <input type="number" {...register('phone', { required: false, maxLength: 11 })} />
                                                    {errors.phone && <p className="error">Please enter 11 digit phone number.</p>}
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Email Address <span>*</span></label>
                                                    <input type="email" {...register('email', { required: false })} />
                                                    {errors.email && <p className="error">Email is required.</p>}
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Other Notes (optional)</label>
                                                    <textarea rows="2" {...register('notes')} placeholder="Notes about your order, e.g. speacial notes for delivery."></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="axil-order-summery order-checkout-summery">
                                        <h5 className="title mb--20">Your Order</h5>
                                        <div className="summery-table-wrap">
                                            <table className="table summery-table">
                                                <thead>
                                                    <tr>
                                                        <th>Product</th>
                                                        <th>Subtotal</th>
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
                                                        <td>Subtotal</td>
                                                        <td>${cartProducts.cartTotalAmount}</td>
                                                    </tr>
                                                    <tr className="order-shipping">
                                                        <td colSpan={2}>
                                                            <div className="shipping-amount">
                                                                <span className="title">Shipping Method</span>
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
                                                        <td>Total</td>
                                                        <td className="order-total-amount">${cartProducts.cartTotalAmount + shippingFee}</td>
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
                                        <button type="submit" className="axil-btn btn-bg-primary checkout-btn">Process to Checkout</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        :
                        <div className="text-center">
                            <h4>There is no item for checkout</h4>
                            <Link href="/shop" className="axil-btn btn-bg-primary">Back to shop</Link>
                        </div>
                    }
                </Section>
                <CustomerService />
            </main>
            <Footer />
        </>
    );
}

export default Checkout;