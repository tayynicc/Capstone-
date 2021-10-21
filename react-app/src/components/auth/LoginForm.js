import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

import './Auth.css'
const LoginForm = () => {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
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
        tempErrors.email = 'Please provide a valid email.'
        setErrors(tempErrors)
    } else if (charsPresent.length === 2){
        delete tempErrors.email
        setErrors(tempErrors)
    }
    
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  const currentErrors = Object.values(errors)
  console.log(`login errors`, errors)
  return (
    <>

    <div className='images__outter-container'>

    </div>

    <div className='form__outter-container'>
     
      <div className='login__form-outer -signup'>
         <div className='form__header-contianer'>
            <h1>Welcome Back</h1>
        </div>
        <form className='form__login' onSubmit={onLogin}>
          <div className='login__form-err'>
            {currentErrors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='form__label-input'>
            <label className='login__label' htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              className='login__input'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='form__label-input'>
            <label className='login__label' htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              className='login__input'
              onChange={updatePassword}
            />
            <div className='login__button-container'>
                <button className='login__button' type='submit'>Login</button>
                <button className='login__button'><a className='login-cancel' href='/'>Cancel</a></button>
            </div>
          </div>
        </form>
        <div className='redirect__container'>
          <p>Don't have an account? Sign up <a href='/sign-up'>Here!</a></p>
        </div>
    </div> 
  </div>

   </>
  );
};

export default LoginForm;
