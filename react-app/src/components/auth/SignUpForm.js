import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, firstName, last_name, email, password, ));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
    let tempErrors = {...errors}

    if(!username.length){
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
        tempErrors.email = 'Please provide a valid email.'
        setErrors(tempErrors)
    } else if (charsPresent.length === 2){
        delete tempErrors.email
        setErrors(tempErrors)
    }
};    

  const updatePassword = (e) => {
    setPassword(e.target.value);
    let tempErrors = {...errors}

    if(!password.length){
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
    }if(password !== repeatPassword){
        tempErrors.checkPassword = 'Passwords do not match.'
        setErrors(tempErrors)
    }else if (password === repeatPassword){
        delete tempErrors.checkPassword
        setErrors(tempErrors)
    }
  }

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
    let tempErrors = {...errors}


  }

  const updateLastName = (e) => {
    setLastName(e.target.value);
    let tempErrors = {...errors}


  }
  if (user) {
    return <Redirect to='/' />;
  }

  const currentErrors = Object.values(errors)

  return (
    <form onSubmit={onSignUp}>
      <div>
        {currentErrors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>First Name</label>
        <input
          type='text'
          name='first_name'
          onChange={updateFirstName}
          value={firstName}
        ></input>
      </div>
      <div>
        <label>Last Name</label>
        <input
          type='text'
          name='last_name'
          onChange={updateLastName}
          value={last_name}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
