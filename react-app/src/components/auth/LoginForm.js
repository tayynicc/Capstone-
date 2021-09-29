import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

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

    if(!charsPresent.length < 2){
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
    return <Redirect to='/' />;
  }

  const currentErrors = Object.values(errors)
  console.log(`login errors`, errors)
  return (
    <form onSubmit={onLogin}>
      <div>
        {currentErrors.map((err) => (
            <p>{err}</p>
        ))}
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <button type='submit'>Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
