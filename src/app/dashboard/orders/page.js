"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import OrderService from "@/services/order.service"
import { formatDateTime } from "@/utils";

const UserOrders = () => {
    const [listOrder, setListOrder] = useState([])
    useEffect(() => {
        const fetchAllOrders = async () => {
            const res = await OrderService.getAll()
            if (res.data) {
                setListOrder(res.data)
            }
        }
        fetchAllOrders()
    }, [])
    console.log("listOrder: ", listOrder)
    return (
        <div className="axil-dashboard-order">
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Order</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Total</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOrder.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{formatDateTime(item.createdAt)}</td>
                                    <td>{item.status}</td>
                                    <td>${item.totalAmount} for {item.items.length} items</td>
                                    <td>
                                        <Link href="dashboard/orders/view" className="axil-btn view-btn">View</Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserOrders;