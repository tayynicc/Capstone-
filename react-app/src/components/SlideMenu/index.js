import'./SlideMenu.css'

function SlideMenu(){

    // $(document).ready(function(){
    //     $(".menu-button").click(function(){
    //     $(".menu-bar").toggleclassName( "open" );
    //     })
    //     })

    const open = ( ) => {
        console.log(`triggered`)
        const menuBar = document.getElementById('menu-bar')

        if(menuBar.classList.contains('open')){
            menuBar.classList.remove('open')
        }else{
            menuBar.classList.add('open')
        }
        
    }

    return (
        <>
            <ul className="menu">

        <li title="home"><a href="#" id='menu-button' onClick={() => open()}className="menu-button home">menu</a></li>
        
        {/* <li title="search"><a href="#" className="search">search</a></li> */}
        {/* <li title="pencil"><a href="/create-project" className="pencil">pencil</a></li> */}
        <li title="account"><a href="/account" className="active about">about</a></li>
        <li title="home"><a href="/home" className="archive">Home</a></li>
        {/* <li title="contact"><a href="#" className="contact">contact</a></li> */}
        </ul>
        
        <ul className="menu-bar" id='menu-bar'>
            <li><a href="#" className="menu-button">Menu</a></li>
            <li><a href="/create-project">New Project</a></li>
            <li><a href="/create-project">Logout</a></li>
        </ul>
    </>
    )
}

export default SlideMenu