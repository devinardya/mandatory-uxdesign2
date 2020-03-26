import React from 'react';
import "../Home/home.css";
import Header from "../Header";
import { Helmet } from 'react-helmet';
import Footer from "../Footer";
import HomeSection from "../HomeSection";
import FooterImg from "../FooterImg";

const Home = () => {
    return  <>  
                <Helmet >
                    <title>Quiz Master - Home</title>
                </Helmet>
                <main className="block">
                    <Header page="home"/>
                    <HomeSection />
                    <Footer />
                </main>
                <FooterImg />
            </>
}

export default Home;