

import './CreateProject.css'
import CreateProjectForm from './CreateProjectForm'
import Footer from '../Footer'


function CreateProject(){

    return(
        <>

            <div className='create__form-container'>
                <CreateProjectForm />
            </div>

            <div className='bgk__image-container'>
                <h1 className='page__lable'> Create New Project </h1>
            </div>

            <Footer />
            
        </>
    )
}

export default CreateProject
