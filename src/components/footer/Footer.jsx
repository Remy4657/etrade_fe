"use client";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { ScocialLink } from "@/data/Common";
import { FooterData } from "@/data/Footer";
import ProductQuickView from "../product/elements/ProductQuickView";

const Footer = () => {
  const getQuickView = useSelector((state) => state.productData);
  const t = useTranslations();

  return (
    <>
      <footer className="axil-footer-area footer-style-2">
        <div className="footer-top separator-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-sm-6">
                <div className="axil-footer-widget">
                  <h5 className="widget-title">{t("Footer.support")}</h5>
                  <div className="inner">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: FooterData.footerInfo.address,
                      }}
                    ></p>
                    <ul className="support-list-item">
                      <li>
                        <a href={`mailto:${FooterData.footerInfo.email}`}>
                          <i className="fal fa-envelope-open" />
                          {t("Footer.email")}
                        </a>
                      </li>
                      <li>
                        <a href={`tel:${FooterData.footerInfo.phone}`}>
                          <i className="fal fa-phone-alt" /> {t("Footer.phone")}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {FooterData.footerLink.slice(0, 2)?.map((items, index) => (
                <div className="col-lg-3 col-sm-6" key={index}>
                  <div className="axil-footer-widget">
                    <h5 className="widget-title">
                      {t(`Footer.${items.label}`)}
                    </h5>
                    <div className="inner">
                      <ul>
                        {items.linkList?.map((link, index) => (
                          <li key={index}>
                            <Link href={link.url}>
                              {t(`Footer.${link.name}`)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
              <div className="col-lg-3 col-sm-6">
                <div className="axil-footer-widget">
                  {/* <h5 className="widget-title">Download App</h5> */}
                  <div className="inner">
                    <span>{t("Footer.mobileAppTitle")}</span>
                    <div className="download-btn-group">
                      <div className="qr-code">
                        <Image
                          src={FooterData.footerAppInfo.qrCode}
                          alt="Axilthemes"
                          height={98}
                          width={98}
                        />
                      </div>
                      <div className="app-link">
                        <a href={FooterData.footerAppInfo.appStoreLink}>
                          <Image
                            src={FooterData.footerAppInfo.appStoreLogo}
                            alt="App Store"
                            height={42}
                            width={140}
                          />
                        </a>
                        <a href={FooterData.footerAppInfo.googlePlayLink}>
                          <Image
                            src={FooterData.footerAppInfo.googlePlayLogo}
                            alt="Google Play Store"
                            height={42}
                            width={140}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {getQuickView.quickView && <ProductQuickView />}
    </>
  );
};

export default Footer;
