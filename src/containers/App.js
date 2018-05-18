import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginContainer from './LoginContainer';
import LoginForm from '../components/LoginForm';
import MainScreenContainer from './MainScreenContainer';
import '../css/MainScreenCSS.css';
import '../css/LoginCSS.css';
import HotgirlsScreen from './HotgirlsScreen';

const App = () => (
  <Switch>
    <Route path="/main" component={MainScreenContainer} />
    <Route path="/login" component={LoginForm} />
    <Route path="/hotgirls" component={HotgirlsScreen} />
    <Route path="/" component={LoginContainer} />
  </Switch>
);

export default App;
