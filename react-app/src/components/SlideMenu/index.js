import'./SlideMenu.css'


import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';




function SlideMenu(){
    const dispatch = useDispatch()
 
    const open = ( ) => {
        const menuBar = document.getElementById('menu-bar')

        if(menuBar.classList.contains('open')){
            menuBar.classList.remove('open')
        }else{
            menuBar.classList.add('open')
        }
        
    }

    
    const onLogout = async (e) => {
      await dispatch(logout());
      <Redirect to='/home' />;
    };

    return (
        <>
            <ul className="menu">

                <li title="home"><a href="#" id='menu-button' onClick={() => open()}className="menu-button home">menu</a></li>
            
                <li title="account"><a href="/account" className="active about">about</a></li>
                <li title="home"><a href="/home" className="archive">Home</a></li>
            </ul>
        
        <ul className="menu-bar" id='menu-bar'>
            <li><a href="#" className="menu-button">Menu</a></li>
            <li><a href="/create-project">New Project</a></li>
            <li><a href="/account">Saved Projects</a></li>
            <li><a href="#"><button onClick={onLogout}>Logout</button></a></li>
        </ul>
    </>
    )
}

export default SlideMenu
