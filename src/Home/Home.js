import React from 'react';
import "../Home/home.css";
import Header from "../Header";
import FocusTrap from 'focus-trap-react';
import { Helmet } from 'react-helmet';
import Footer from "../Footer";
import HomeSection from "../HomeSection";
import FooterImg from "../FooterImg";

const Home = () => {
    return  <>      
               
                <Helmet >
                    <title>Quiz Master - Home</title>
                </Helmet>
                <FocusTrap>
                    <main className="block">
                        <Header page="home"/>
                        <HomeSection />
                        <Footer />
                    </main>
                </FocusTrap>        
                <FooterImg />
            </>
}

export default Home;