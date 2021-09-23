import './Splash.css'

import Footer from '../Footer'


function Splash(){

    return(
        <>
        <div className='splash__bkg-container'>
            <div className='splash__bkg-left '></div>
            
            <div className='splash__bkg-right'></div>
            
            <div className='splash__bkg-circle'></div>


            <div className='splash__about-container'>
                <h1></h1>

            </div>

            <div className='splash__highlights-container'>
                <h1></h1>

            </div>

            <div className='footer__container'>
                <Footer />
            </div>
        </div>
        </>
    )
}


export default Splash
