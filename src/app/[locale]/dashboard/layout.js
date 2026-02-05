'use client';
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";

import { usePathname, useRouter } from "next/navigation";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import NewsLetter from "@/components/newsletter/NewsLetter";
import ServiceTwo from "@/components/services/ServiceTwo";
import { DashboardAsideMenu } from "@/data/Menu";
import { UserLists } from "@/data/Users";
import { logout } from "@/store/slices/authSlice";


const DahsboardLayout = ({ children }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const authInfo = useSelector((state) => state.auth);
    const users = authInfo?.userData;
    const userInfo = UserLists[0];
    const pathname = usePathname();
    const split = pathname.split("/");
    const pageSlug = split[split.length - 1];

    const handleLogout = async () => {
        dispatch(logout())
        router.push("/sign-in")
    }

    return (
        <>
            <HeaderFive headerSlider />
            <main className="main-wrapper">
                <Breadcrumb activeItem="My Account" title="Explore All Products" />
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
                                        <h5 className="title mb-0">Hello {users?.username}</h5>
                                        <span className="joining-date">eeTrade Member Since </span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-3 col-md-4">
                                    <aside className="axil-dashboard-aside">
                                        <nav className="axil-dashboard-nav">
                                            <div className="nav nav-tabs">
                                                {DashboardAsideMenu?.map((data, index) => (
                                                    <Link href={`dashboard/${data.slug}`} className={`nav-item nav-link ${data.slug === pageSlug ? "active" : ""}`} key={index}>
                                                        <i className={data.icon} />{data.name}
                                                    </Link>
                                                ))}
                                                <button className="nav-item nav-link" onClick={() => handleLogout()}>
                                                    <i className="fal fa-sign-out" />Logout
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
                <NewsLetter />
                <ServiceTwo />
            </main>
            <FooterTwo />
        </>
    );
}

export default DahsboardLayout;