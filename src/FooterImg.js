import React from 'react';
import FooterImg from './design/footer-ornament.svg';

class FooterOrnament extends React.PureComponent {
    render() {
        return <figure className= "block__footer__figure">
                    <img src={FooterImg} alt="footer ornament"  style={{width:"100%"}}/>
                </figure>
    }
}

export default FooterOrnament;