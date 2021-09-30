import './Splash.css'

import Footer from '../Footer'


import { login } from '../../store/session';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';


function Splash(){

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);

    const demo = ( ) => {
        dispatch(login('demo@aa.io', 'password'));
    }

    if (user) {
        return <Redirect to='/home' />;
      }
    

    return(
        <>
        <div className='button__container'>
            <a href='/sign-up'><button>Create an Account</button></a>
            <a href='/login'><button>Log in</button></a>
            <button onClick={(() => demo())}>Demo Login</button>
        </div>
        <div className='splash__bkg-container'>
            <div className='splash__bkg-left '>
                <div className='roller__container roll'>
                    <div className='images '>

                        <div className='images__container img1'></div>
                        <div className='images__container img2'></div>
                        <div className='images__container img3'></div>
                        
                    </div>    
                </div>
            </div>
            
            
            <div className='splash__bkg-right'>
                <div className='roller__container-right roll-reverse'>
                    <div className='images-right'>
                        <div className='images__container img4'></div>
                        <div className='images__container img5'></div>
                        <div className='images__container img6'></div>
                    </div>
                </div>
            
            </div>
            
            <div className='splash__bkg-circle'></div>


            <div className='splash__about-container'>
                <h1 className='splash__label'>About ReNewMe</h1>

                <div className='splash__contnent-container'>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                </div>

            </div>

            <div className='splash__highlights-container'>
                <h1 className='splash__label-highlights'>Highlights</h1>
                
                <div className='splash__contnent-container'>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                </div>

            </div>

            <div className='footer__container'>
                <Footer />
            </div>
        </div>
        </>
    )
}


export default Splash
