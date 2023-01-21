import React , { useState ,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';

import logo from '../../assets/fake-data/logo';

const Footer = () => {

    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
  
    useEffect(() => {
      const toggleVisibility = () => {
        if (window.pageYOffset > 500) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
  
      window.addEventListener("scroll", toggleVisibility);
  
      return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <>
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="footer__body">
                      <Link to="/">
                        <img src={logo} alt="Monteno" style={{width:"100px"}} data-aos="fade-down" />
                      </Link>
                        
                        <p className="desc fs-18" data-aos="fade-up">
                        Let's build the NEAR future together 🤝
                        </p>
                        <ul className="social">
                            <li data-aos="fade-up" data-aos-duration="1000"><a href="https://instagram.com/qstn.us"><i className="fab fa-instagram"></i></a></li>
                            <li data-aos="fade-up" data-aos-duration="1200"><a href="https://twitter.com/qstnus"><i className="fab fa-twitter"></i></a></li>
                            <li data-aos="fade-up" data-aos-duration="1400"><a href="https://medium.com/@qstnus"><i className="fab fa-medium"></i></a></li>
                            <li data-aos="fade-up" data-aos-duration="1600"><a href="https://discord.com/invite/dGzUGjMXhc"><i className="fab fa-discord"></i></a></li>
                            <li data-aos="fade-up" data-aos-duration="1600"><a href="https://t.me/qstnus"><i className="fab fa-telegram"></i></a></li>
                        </ul>
                    </div>
                    <div className="footer_bottom">
                        <p className="fs-16">QSTN Landing Page. Designed by </p>
                        {/* <ul>
                            <li><Link to="#">Terms & Condition</Link></li>
                            <li><Link to="#">Privacy Policy</Link></li>
                            <li><Link to="#">Cookie Policy</Link></li>
                        </ul> */}
                    </div>
                </div>
            </div>
        </footer>
        {
            isVisible && 
            <Link onClick={scrollToTop}  to='#' id="scroll-top"></Link>
        }</>
        
    );
}

export default Footer;