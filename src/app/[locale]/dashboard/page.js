'use client';
import { useSelector } from "react-redux";
import { useSession, signIn } from "next-auth/react";


const Dashboard = () => {
    const { data: session, status } = useSession();
    const authInfo = useSelector((state) => state.auth);
    const users = authInfo?.userData;
    console.log("session: ", session)
    console.log("status: ", status)

    return (
        <div className="axil-dashboard-overview">
            <div className="welcome-text">Hello {users?.username}</div>
            <p>From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
        </div>
    );
}

export default Dashboard;