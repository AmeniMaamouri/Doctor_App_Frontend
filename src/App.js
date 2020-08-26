import React, { Component } from 'react';
import { BrowserRouter , Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import FichesPatients from './views/fichesPatients/FichesPatients';
import Ordonnances from './views/ordonnances/Ordonnances';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));

class App extends Component {

  render() {
    return (
      <BrowserRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
           
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
         
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
              <Route path="/fiches-patients" name="Fiche" exact={true} render={props => <FichesPatients {...props}/>} />
              <Route path="/ordnnances" name="Ordonnance" exact={true} render={props => <Ordonnances {...props}/>} />
            </Switch>
          </React.Suspense>
      </BrowserRouter >
    );
  }
}

export default App;
