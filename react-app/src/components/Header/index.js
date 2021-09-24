

import './Header.css'


import LogoutButton from '../auth/LogoutButton'

function Header(){


    return (
        <>
            <div className='header__container'>
                <a href='/create-project'> Create a New Project</a>
                <a href='/home'>Home</a>
                <LogoutButton />
            </div>

        </>
    )
}


export default Header
