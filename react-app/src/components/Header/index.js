

import './Header.css'


import LogoutButton from '../auth/LogoutButton'

function Header(){


    return (
        <>
            {/* <div className='header__container'>
                <a href='/create-project'> Create a New Project</a>
                <a href='/home'>Home</a>
                <a href='/account'>Account</a>
                <LogoutButton />
            </div> */}

            <div className='top__logo-div'>
                <h1 className='logo'>ReNew Me</h1>
           </div>

        </>
    )
}


export default Header
