import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';


import Splash from './components/Splash';
import Home from './components/Home'
import Account from './components/Account'
import CreateProject from './components/CreateProject';
import Project from './components/Projects';
import UpdateProjectForm from './components/UpdateProject';
import SlideMenu from './components/SlideMenu';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <Splash />
        </ProtectedRoute>
        <ProtectedRoute path='/home'>
            <Home />
        </ProtectedRoute>
        <ProtectedRoute path='/account' >
            <Account />
        </ProtectedRoute>
        <ProtectedRoute path='/create-project'>
            <CreateProject />
        </ProtectedRoute>
        <ProtectedRoute path='/projects/:id'>
            <Project />
        </ProtectedRoute>
        <ProtectedRoute path='/update/:id'>
            <UpdateProjectForm />
        </ProtectedRoute >
        <Route path ='/test'>
            {/* <NavBar /> */}
            <SlideMenu />
            
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
