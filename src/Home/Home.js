import React from 'react';
import "../Home/home.css";
import Header from "../Header";
import FocusTrap from 'focus-trap-react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Footer from "../Footer";
import HomeSection from "../HomeSection";
import FooterImg from "../FooterImg";

const Home = () => {
    return  <>      
                <HelmetProvider>
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
                </HelmetProvider>  
            </>
}

export default Home;