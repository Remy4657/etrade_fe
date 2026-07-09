"use client"
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";

import { usePathname, useRouter } from "next/navigation";
import { DashboardAsideMenu } from "@/data/Menu";
import { logout } from "@/store/slices/authSlice";


const DahsboardLayout = ({ children }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const authInfo = useSelector((state) => state.auth);
    const users = authInfo?.userData;
    const pathname = usePathname();

    const split = pathname.split("/");

    const pageSlug = split[split.length - 1];

    const handleLogout = async () => {
        await dispatch(logout())
        router.push("/sign-in")
        router.refresh()
    }

    return (
        <>
            <main className="main-wrapper">
                <div className="axil-dashboard-area axil-section-gap">
                    <div className="container">
                        <div className="axil-dashboard-warp">
                            <div className="axil-dashboard-author">
                                <div className="media">
                                    <div className="thumbnail">
                                        {users?.avatar && (
                                            <Image
                                                src={users.avatar}
                                                width={70}
                                                height={70}
                                                alt="Avatar"
                                            />
                                        )}
                                    </div>
                                    <div className="media-body">
                                        <h5 className="title mb-0">Xin chào {users?.username}!</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-3 col-md-4">
                                    <aside className="axil-dashboard-aside">
                                        <nav className="axil-dashboard-nav">
                                            <div className="nav nav-tabs">
                                                {DashboardAsideMenu?.map((data, index) => (
                                                    <Link href={`${data.slug}`} className={`nav-item nav-link ${data.slug === pageSlug ? "active" : ""}`} key={index}>
                                                        <i className={data.icon} />{data.name}
                                                    </Link>
                                                ))}
                                                <button className="nav-item nav-link" onClick={() => handleLogout()}>
                                                    <i className="fal fa-sign-out" />Đăng xuất
                                                </button>
                                            </div>
                                        </nav>
                                    </aside>
                                </div>
                                <div className="col-xl-9 col-md-8">
                                    <div className="tab-content">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default DahsboardLayout;