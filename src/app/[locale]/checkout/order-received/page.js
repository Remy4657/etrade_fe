'use client';
import { useRouter } from 'next/navigation';

import { useSelector } from "react-redux";
import Section from "@/components/elements/Section";

const OrderReceived = () => {
    const router = useRouter()
    const orders = useSelector((state) => state.productData.orderItems);
    const latestOrder = orders[orders.length - 1];
    return (
        <>
            <main className="main-wrapper">
                <Section pClass="order-received">

                    <>
                        <h1 className="text-center thank-you-text">Cảm ơn bạn đã đặt hàng!</h1>
                        <div className="d-flex justify-content-center">

                            <button type="button" className="axil-btn btn-bg-primary checkout-btn" onClick={() => router.push("/dashboard/orders")}>Xem đơn hàng</button>
                        </div>


                        {/* <div className="order-details">
                            <h5 className="block-title">Chi tiết đơn hàng</h5>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {latestOrder.items?.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data.title} <strong>X {data.cartQuantity}</strong></td>
                                            <td>${data.salePrice ? data.salePrice : price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>Tổng cộng:</th>
                                        <th>${latestOrder.totalAmount}</th>
                                    </tr>
                                    <tr>
                                        <th>Phương thức vận chuyển:</th>
                                        <th>Flat rate</th>
                                    </tr>
                                    <tr>
                                        <th>Phương thức thanh toán:</th>
                                        <th>{latestOrder.billingAddress.payment}</th>
                                    </tr>
                                    <tr>
                                        <th>Tổng tiền:</th>
                                        <th>{latestOrder.totalAmount}</th>
                                    </tr>
                                    <tr>
                                        <th>Lời nhắc:</th>
                                        <th>{latestOrder.billingAddress.notes}</th>
                                    </tr>
                                </tfoot>
                            </table>

                        </div>
                        <div className="customer-details">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="customer-address">
                                        <h5 className="block-title">Địa chỉ</h5>
                                        <address>
                                            {latestOrder.billingAddress.fullname} <br />
                                            {latestOrder.billingAddress.street1}<br />
                                            {latestOrder.billingAddress.city}<br />
                                            <p className="address-phone"><i className="far fa-phone"></i> {latestOrder.billingAddress.phone}</p>
                                            <p className="address-email"><i className="far fa-envelope"></i> {latestOrder.billingAddress.email}</p>
                                        </address>
                                    </div>
                                </div>

                            </div>
                        </div> */}
                    </>

                </Section>
            </main>
        </>
    );
}

export default OrderReceived;