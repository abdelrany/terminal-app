import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { 
  Login, 
  Home, 
  Payment, 
  History, 
  ForgotPassword 
} from '../components';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/agent" />
      )
    }
  />
);

export const AppRouter = ({ isAuthenticated }) => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/agent" component={Login} />
      <Route path="/agent/forgot-password" component={ForgotPassword} />
      <PrivateRoute 
        path="/agent/home" 
        component={Home} 
        isAuthenticated={isAuthenticated} 
      />
      <PrivateRoute 
        path="/agent/payment" 
        component={Payment} 
        isAuthenticated={isAuthenticated} 
      />
      <PrivateRoute 
        path="/agent/history" 
        component={History} 
        isAuthenticated={isAuthenticated} 
      />
      <Redirect from="/" to="/agent" />
    </Switch>
  </BrowserRouter>
); 