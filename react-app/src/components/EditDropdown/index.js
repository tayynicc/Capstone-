import './EditDropdown.css'

function EditDropdown(){

   
  
    return (
        <>
        {/* <h1>Edit drop down</h1> */}
        {/* <div>
            <button className='edit__label' onClick={displayEdit()}>options</button>
                <ul id='edit__menu' className='hidden'>
                    <li> Edit </li>
                    <li> Delete </li>
                </ul>
        </div> */}

        <div className="dropdown">
            <button className="dropbtn"><img src="https://img.icons8.com/material-outlined/24/000000/more.png"/></button>
            <div className="dropdown-content">
                <a className='editLinks edt' href="#">Edit</a>
                <a className='editLinks dlt' href="#">Delete</a>
                {/* <a href="#">Link 3</a> */}
            </div>
        </div>
        </>
    )
}

export default EditDropdown;