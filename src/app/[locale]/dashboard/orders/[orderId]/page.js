"use client"
import OrderService from '@/services/order.service'
import { formatDateTime } from '@/utils';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const OrderDetailPage = () => {
    const params = useParams();
    const orderId = params.orderId;
    const [orderDetail, setOrderDetail] = useState({})
    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const { data } = await OrderService.getDetail(orderId)

                if (data) {
                    setOrderDetail(data)
                }
            } catch (error) {
            }
        }
        fetchOrderDetail()
    }, [])

    return <div className="axil-dashboard-order-view">
        <p>Đơn hàng <strong>#{orderId}</strong> được tạo lúc <strong>{formatDateTime(orderDetail?.createdAt)}</strong> </p>
        <div className="order-details">
            <h2 className="block-title">Chi tiết đơn hàng</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Tổng</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetail?.items?.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.productName}, {item.productSize}, {item.productColor} <strong>X {item.quantity}</strong></td>
                                <td>${item.price * item.quantity}</td>
                            </tr>
                        )
                    })}

                </tbody>
                <tfoot>

                    <tr>
                        <th>Phương thức vận chuyển:</th>
                        <th>{orderDetail?.shipping?.shippingMethod}</th>
                    </tr>
                    <tr>
                        <th>Phương thức thanh toán:</th>
                        <th>{orderDetail?.payment?.name}</th>
                    </tr>
                    <tr>
                        <th>Tổng giá tiền của đơn hàng:</th>
                        <th>${orderDetail?.totalAmount}</th>
                    </tr>
                    <tr>
                        <th>Lời nhắc:</th>
                        <th>{orderDetail?.notes}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div className="order-address">
            <h2 className="block-title">Địa chỉ nhận hàng:</h2>
            <address>
                {orderDetail?.shipping?.address} <br />
                {orderDetail?.shipping?.city} <br />
                {orderDetail?.shipping?.receiverName}<br />
                <p className="address-phone"><i className="far fa-phone"></i> {orderDetail?.shipping?.phone}</p>
                <p className="address-email"><i className="far fa-envelope"></i> {orderDetail?.shipping?.email}</p>
            </address>
        </div>
    </div>
}
export default OrderDetailPage
