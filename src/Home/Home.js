import React from 'react';
import "../Home/home.css";
import Header from "../Header";
import Footer from "../Footer";
import HomeSection from "../HomeSection";
import FooterImg from "../FooterImg";

const Home = () => {
    return  <>
                <main className="block-home">
                    <Header page="home"/>
                    <HomeSection />
                    <Footer />
                </main>
                <FooterImg />
            </>
}

export default Home;