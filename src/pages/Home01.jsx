import React from 'react';
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import dataFaq from '../assets/fake-data/data-faq';
import dataFaq2 from '../assets/fake-data/data-faq2'
import dataRoadMap from '../assets/fake-data/data-roadmap';
import FAQ from '../components/layouts/FAQ';
import RoadMap from '../components/layouts/RoadMap';
import SliderOne from '../components/slider/SliderOne';

const Home01 = () => {
    return (
        <div>
            <Header />
            <SliderOne />
            <RoadMap data={dataRoadMap}  />
            <FAQ data={dataFaq} data2={dataFaq2}/>
            <Footer />
        </div>
    );
}

export default Home01;