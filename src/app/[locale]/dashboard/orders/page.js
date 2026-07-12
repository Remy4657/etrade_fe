"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import OrderService from "@/services/order.service"
import { formatDateTime } from "@/utils";

const UserOrders = () => {
    const [listOrder, setListOrder] = useState([])
    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const res = await OrderService.getAll()
                if (res.data) {
                    setListOrder(res.data)
                }
            } catch (error) {

            }
        }
        fetchAllOrders()
    }, [])
    return (
        <div className="axil-dashboard-order">
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Mã đơn hàng</th>
                            <th scope="col">Ngày tạo</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Tổng tiền</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOrder?.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <th scope="row">#{item.id}</th>
                                    <td>{formatDateTime(item.createdAt)}</td>
                                    <td>{item.status}</td>
                                    <td>${item.totalAmount} / {item.items.length} sản phẩm</td>
                                    <td>
                                        <Link href={`orders/${item.id}`} className="axil-btn view-btn">Xem chi tiết</Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div >
    );
}

export default UserOrders;