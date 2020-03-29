import React, {useState} from 'react';
import "../Home/home.css";
import Header from "../Header";
import FocusTrap from 'focus-trap-react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Footer from "../Footer";
import HomeSection from "../HomeSection";
import FooterImg from "../FooterImg";
import Sidebar from "../Sidebar";

const Home = () => {

    const [sidebarIsOpen, updateSidebarIsOpen] = useState(false);

    return  <>      
                <HelmetProvider>
                    <Helmet >
                        <title>Quiz Master - Home</title>
                    </Helmet>
                    <FocusTrap>
                        <main className="block">
                            <Header page="home"
                                    onClickMenuButton={() => updateSidebarIsOpen(true)}
                            />
                             <Sidebar onClose={() => updateSidebarIsOpen(false)} isOpen={sidebarIsOpen} />
                            <HomeSection />
                            <Footer />
                        </main>
                    </FocusTrap>        
                    <FooterImg />
                </HelmetProvider>  
            </>
}

export default Home;