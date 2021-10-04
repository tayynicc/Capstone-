import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, first_name, last_name, email, password, ));
      if (data) {
        setErrors(data)
      }

      if (errors.legth){
        window.alert('Please address errors and try again.')
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
    let tempErrors = {...errors}

    if(!e.target.value.length){
        tempErrors.username = 'Please provide a valid username'
        setErrors(tempErrors)
    }else {
        delete tempErrors.username
        setErrors(tempErrors)
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
    let tempErrors = {...errors}
    let charsPresent = []
    const splitEmail = email.split('')

    for(let chars in splitEmail){
        let char = splitEmail[chars] 

        if(char === '@'){
            charsPresent.push(true)
        }if(char === '.'){
            charsPresent.push(true)
        }
    }

    if(charsPresent.length < 2){
        tempErrors.email = 'Please provide a valid email. Example: demo@example.com'
        setErrors(tempErrors)
    } else if (charsPresent.length === 2){
        delete tempErrors.email
        setErrors(tempErrors)
    }
};    

  const updatePassword = (e) => {
    setPassword(e.target.value);
    let tempErrors = {...errors}

    if(!e.target.value.length){
        tempErrors.password = 'Please provide password.'
        setErrors(tempErrors)
    } else {
        delete tempErrors.password 
        setErrors(tempErrors)
    }
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
    let tempErrors = {...errors}

    if(!repeatPassword.length){
        tempErrors.repeatPassword = 'Please repeat your password.'
        setErrors(tempErrors)
    }else if (repeatPassword.length){
        delete tempErrors.repeatPassword
        setErrors(tempErrors)
    }if(password !== e.target.value){
        tempErrors.checkPassword = 'Passwords do not match.'
        setErrors(tempErrors)
    }else if (password === e.target.value){
        delete tempErrors.checkPassword
        setErrors(tempErrors)
    }
  }

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
    let tempErrors = {...errors}

    if(!e.target.value.length ){
      tempErrors.firstName = 'Please provide a first name'
      setErrors(tempErrors)
    } else {
      delete tempErrors.firstName
      setErrors(tempErrors)
    }

  }

  const updateLastName = (e) => {
    setLastName(e.target.value);
    let tempErrors = {...errors}

    if(!e.target.value.length ){
      tempErrors.lastName = 'Please provide a last name'
      setErrors(tempErrors)
    } else {
      delete tempErrors.lastName
      setErrors(tempErrors)
    }



  }
  if (user) {
    return <Redirect to='/' />;
  }

  // console.log(``, password, repeatPassword)

  const currentErrors = Object.values(errors)

  return (
    <>
    <div className='images__outter-container'>

    </div>
    <div className='form__outter-container'>
      <div className='signup__form-outer'>
          <div className='form__header-contianer'>
              <h1>Welcome! </h1>
          </div>
        <form className='form__signup' onSubmit={onSignUp}>
          <div className='auth_errs'>
            {currentErrors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='input__fields'>
            <div className='container__items-left'>
              <div className='form__label-input'>
                <label>User Name</label>
                <input
                  type='text'
                  name='username'
                  onChange={updateUsername}
                  value={username}
                  className='login__input'
                  required
                ></input>
              </div>
              <div className='form__label-input'>
                <label>First Name</label>
                <input
                  type='text'
                  name='first_name'
                  onChange={updateFirstName}
                  value={first_name}
                  className='login__input'
                  required={true}
                ></input>
              </div>
              <div className='form__label-input'>
                <label>Last Name</label>
                <input
                  type='text'
                  name='last_name'
                  onChange={updateLastName}
                  value={last_name}
                  className='login__input'
                  required={true}
                ></input>
              </div>
            </div>

            <div className='container__items-right'>
              <div className='form__label-input'>
                <label>Email</label>
                <input
                  type='text'
                  name='email'
                  onChange={updateEmail}
                  value={email}
                  className='login__input'
                  required={true}
                ></input>
              </div>
              <div className='form__label-input'>
                <label>Password</label>
                <input
                  type='password'
                  name='password'
                  onChange={updatePassword}
                  value={password}
                  className='login__input'
                  required={true}
                ></input>
              </div>
              <div className='form__label-input'>
                <label>Repeat Password</label>
                <input
                  type='password'
                  name='repeat_password'
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                  required={true}
                  className='login__input'
                  required
                ></input>
              </div>
            </div>
            </div>
            <div className='signup__button'>
              <button className='signup__buttn' type='submit'>Sign Up</button>
              <button  className='signup__buttn'>Cancel</button>
            </div>
           
        </form>
          <div className='redirect__container'>
            <p>Already have an account? Sign up <a href='/login'>Here!</a></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
