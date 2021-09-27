

import './Header.css'


import LogoutButton from '../auth/LogoutButton'

function Header(){


    return (
        <>
            <div className='header__container'>
                <div className='logo__container'></div>
                <a href='/create-project'> Create a New Project</a>
                <a href='/home'>Home</a>
                <a href='/account'>Account</a>
                <LogoutButton />
            </div>
        </>
    )
}


export default Header
