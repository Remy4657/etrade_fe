'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import Footer from "@/components/footer/Footer";
import CustomerService from "@/components/services/CustomerService";
import { StoreInfo } from "@/data/Common";
import { useTranslations } from "next-intl";

const ContactUs = () => {
    const t = useTranslations();

    const [result, showresult] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const sendEmail = (formData) => {
        emailjs.send('service_g3aufzu', 'template_sk4dqiz', formData, '9L_sRsO66U253zcxC')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        reset();
        showresult(true);
    };

    setTimeout(() => {
        showresult(false);
    }, 2000);


    return (
        <>
            <main className="main-wrapper">
                <Breadcrumb
                    activeItem="Contact"
                    title={t('Contact.breadcrumbTitle')}
                />
                <div className="axil-contact-page-area axil-section-gap">
                    <div className="container">
                        <div className="axil-google-map-wrap axil-section-gap pb--0">
                            <div className="mapouter">
                                <div className="gmap_canvas">
                                    <iframe
                                        width={1080}
                                        height={500}
                                        id="gmap_canvas"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3042.315525799049!2d105.78247067516442!3d21.034403528536277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4abcf6766d%3A0x3d53b16db55e9419!2sIndochina%20Plaza%20HaNoi!5e0!3m2!1svi!2s!4v1781056933961!5m2!1svi!2s"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="axil-contact-page">
                            <div className="row row--30">
                                <div className="col-lg-8">
                                    <div className="contact-form">
                                        <div>
                                            <h3 className="title mb--10">{t('Contact.title')}</h3>
                                            <p>{t('Contact.description')}</p>
                                            <form onSubmit={handleSubmit(sendEmail)}>
                                                <div className="row row--10">
                                                    <div className="col-lg-4">
                                                        <div className="form-group">
                                                            <label>{t('Contact.name')} <span>*</span></label>
                                                            <input type="text" {...register('name', { required: true })} />
                                                            {errors.name && <p className="error">Name is required.</p>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="form-group">
                                                            <label>{t('Contact.phone')} <span>*</span></label>
                                                            <input type="text" {...register('phone', { required: true })} />
                                                            {errors.phone && <p className="error">Phone is required.</p>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="form-group">
                                                            <label>{t('Contact.email')} <span>*</span></label>
                                                            <input type="email" {...register('email', { required: true })} />
                                                            {errors.email && <p className="error">Email is required.</p>}
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label>{t('Contact.message')}</label>
                                                            <textarea {...register('message')} cols={1} rows={2} />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-group mb--0">
                                                            <button name="submit" type="submit" className="axil-btn btn-bg-primary">{t('Contact.submitButton')}</button>
                                                            {result && <p className="success">{t('Contact.successMessage')}</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="contact-location mb--40">
                                        <h4 className="title mb--20">{t('Contact.ourStore')}</h4>
                                        <span className="address mb--20">{StoreInfo.address}</span>
                                        <span className="phone">Phone: {StoreInfo.phone}</span>
                                        <span className="email">Email: {StoreInfo.email}</span>
                                    </div>
                                    <div className="contact-career mb--40">
                                        <h4 className="title mb--20">{t('Contact.careers')}</h4>
                                        <p>{t('Contact.careersDescription')}</p>
                                    </div>
                                    <div className="opening-hour">
                                        <h4 className="title mb--20">{t('Contact.openingHours')}</h4>
                                        <p>{t('Contact.mondayToSaturday')} {StoreInfo.opening.monToSat}
                                            <br /> {t('Contact.sundays')}: {StoreInfo.opening.othersDay}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <CustomerService />
            </main>
            <Footer />
        </>
    );
}

export default ContactUs;