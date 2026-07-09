'use client';
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
    return (
        <>
            <main className="main-wrapper">
                <section className="error-page onepage-screen-area">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="content">
                                    <span className="title-highlighter highlighter-secondary"> <i className="fal fa-exclamation-circle" /> Oops! Somthings missing.</span>
                                    <h1 className="title">Trang không tồn tại</h1>
                                    <p></p>
                                    <Link href="/" className="axil-btn btn-bg-secondary right-icon">
                                        Quay lại trang chủ <i className="fal fa-long-arrow-right" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="thumbnail">
                                    <Image
                                        src="/images/others/404.png"
                                        width={1000}
                                        height={643}
                                        alt="404"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default NotFound;