"use client";
import Link from "next/link";

const Breadcrumb = (props) => {
  return (
    <div className="p-3">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-8">
            <div className="inner">
              <ul className="axil-breadcrumb">
                <li className="axil-breadcrumb-item">
                  <Link href="/">Trang chủ</Link>
                </li>
                <li className="separator" />
                <li className="axil-breadcrumb-item active" aria-current="page">
                  {props.activeItem}
                </li>
              </ul>
              <h1 className="title">{props.title}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
