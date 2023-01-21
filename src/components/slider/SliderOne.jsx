import React , { useState } from 'react';
import { Link } from 'react-router-dom'
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import item from '../../assets/fake-data/item';

const SliderOne = () => {

    const [datatext] = useState({
        subtitle: 'We are QSTIE NFTs',
        title: 'Collect Next Generation NFTs Today',
        desc: 'Introducing the first collection of 3D avatars on NEAR Protocol built for the metaverse'
    })

    return (
        <section className="tf-section hero-slider">
            <div className="container">
                <div className="row">
                    <div className="col-xl-5 col-md-6 col-12">
                        <div className="block-text pt-24" >
                            <h6 className="sub-title mb-6" data-aos="fade-up">{datatext.subtitle}</h6>
                            <h2 className="title mb-26" data-aos="fade-up">{datatext.title}</h2>
                            <p className="desc mb-43" data-aos="fade-up">{datatext.desc}</p>
                            <Link to="/about" className="btn-action style-1" data-aos="fade-up" data-aos-duration="1200" >Mint Now</Link>
                        </div>
                    </div>
                    <div className="col-xl-7 col-md-6 col-12">
                        <div className="content-right d-flex">
                        <Swiper
                                modules={[ Autoplay ]}
                                direction={"vertical"}
                                spaceBetween={30}
                                slidesPerView={3}
                                loop
                                autoplay={{
                                    delay: 1,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                speed= {2000}
                            >
                                <SwiperSlide><div className="item bg-1"><img src={item.item1} alt="Monteno" /></div></SwiperSlide>
                                <SwiperSlide><div className="item bg-2"><img src={item.item2} alt="Monteno" /></div></SwiperSlide>
                                <SwiperSlide><div className="item bg-1"><img src={item.item1} alt="Monteno" /></div></SwiperSlide>
                                <SwiperSlide><div className="item bg-2"><img src={item.item2} alt="Monteno" /></div></SwiperSlide>

                            </Swiper>
                            <Swiper
                                modules={[ Autoplay ]}
                                direction={"vertical"}
                                spaceBetween={30}
                                slidesPerView={3}
                                loop
                                autoplay={{
                                    delay: 1,
                                    reverseDirection: true,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                speed= {2000}
                            >
                                <SwiperSlide><div className="item bg-2"><img src={item.item3} alt="Monteno" /></div></SwiperSlide>
                                <SwiperSlide><div className="item bg-1"><img src={item.item4} alt="Monteno" /></div></SwiperSlide>
                                <SwiperSlide><div className="item bg-2"><img src={item.item5} alt="Monteno" /></div></SwiperSlide>
                                <SwiperSlide><div className="item bg-1"><img src={item.item3} alt="Monteno" /></div></SwiperSlide>
                                <SwiperSlide><div className="item bg-2"><img src={item.item4} alt="Monteno" /></div></SwiperSlide>

                            </Swiper>
                            <Swiper
                                modules={[ Autoplay ]}
                                direction={"vertical"}
                                spaceBetween={30}
                                slidesPerView={3}
                                loop
                                autoplay={{
                                    delay: 1,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                speed= {2000}
                            >
                                <SwiperSlide><div className="item bg-2"><img src={item.item6} alt="Monteno" /></div></SwiperSlide>
                                <SwiperSlide><div className="item bg-1"><img src={item.item7} alt="Monteno" /></div></SwiperSlide>
                                <SwiperSlide><div className="item bg-2"><img src={item.item4} alt="Monteno" /></div></SwiperSlide>
                                <SwiperSlide><div className="item bg-1"><img src={item.item6} alt="Monteno" /></div></SwiperSlide>
                                <SwiperSlide><div className="item bg-2"><img src={item.item7} alt="Monteno" /></div></SwiperSlide>

                            </Swiper>
                        </div>
                    </div>
                </div>
                <div className="row pt-24">
                    <div className="col-xl-12 col-md-6 col-12 pt-24 text-center">
                        <div className="block-text pt-24" >
                            <h2 className="title mb-26" data-aos="fade-up">GET YOUR HANDS ON A QSTIE</h2>
                            <p className="desc mb-43" data-aos="fade-up">
                                <div >Each QSTIE is entirely unique, with each detail 3D designed in Blender and then randomly generated on the NEAR Protocol blockchain.</div>
                                <div >By owning a QSTIE, you not only join the NEAR NFT movement but become a new piece in the data renaissance our platform aims to inspire.</div>
                                <div >QSTIES will be available for purchase on our website when minting goes live.</div>
                                <div >Upon purchase, a unique, blockchain-generated QSTIE will be delivered to your NEAR wallet.</div>
                                In order to demonstrate fairness, there will be no price tiers in the minting and all are initially priced at a flat rate of 10 NEAR each. </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

}

export default SliderOne;