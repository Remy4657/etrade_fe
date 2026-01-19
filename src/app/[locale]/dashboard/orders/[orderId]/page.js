import OrderService from '@/services/order.service'
import { formatDateTime } from '@/utils';

export default async function OrderDetailPage({ params }) {
    const { orderId } = params;

    const { data } = await OrderService.getDetail(orderId)
    //const order = await res.json();
    console.log("resOrder: ", data)

    return <div className="axil-dashboard-order-view">
        <p>Order <strong>#6523</strong> was placed on <strong>{formatDateTime(data.createdAt)}</strong> and is currently <strong>{data.status}</strong>.</p>
        <div className="order-details">
            <h2 className="block-title">Order details</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data.items?.map((item, index) => {
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
                        <th>Shipping:</th>
                        <th>{data.shipping.shippingMethod}</th>
                    </tr>
                    <tr>
                        <th>Payment Method:</th>
                        <th>{data.payment.name}</th>
                    </tr>
                    <tr>
                        <th>Total:</th>
                        <th>${data.totalAmount}</th>
                    </tr>
                    <tr>
                        <th>Note:</th>
                        <th>{data.notes}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div className="order-address">
            <h2 className="block-title">Shipping address</h2>
            <address>
                {data.shipping.address} <br />
                {data.shipping.city} <br />
                {data.shipping.receiverName}<br />
                <p className="address-phone"><i className="far fa-phone"></i> {data.shipping.phone}</p>
                <p className="address-email"><i className="far fa-envelope"></i> {data.shipping.email}</p>
            </address>
        </div>
    </div>
}
