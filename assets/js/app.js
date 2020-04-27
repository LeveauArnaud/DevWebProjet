//Les imports importants
import React, {useState} from "react";
import ReactDom from "react-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { HashRouter, Switch, Route, withRouter} from "react-router-dom";
import ClientsPage from "./pages/ClientsPage";
import ClientPage from "./pages/ClientPage";
import LoginPage from "./pages/LoginPage";
import StockPage from "./pages/StockPage";
import AuthAPI from "./services/AuthAPI";
import AuthContext from "./contexts/AuthContexts";
import PrivateRoute from "./components/PrivateRoute";
//import css perso
import '../css/app.css';

AuthAPI.setup();



const App = () =>{

    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());
    const NavbarWithRouter = withRouter(Navbar);


    return (
      <AuthContext.Provider value={{
          isAuthenticated,
          setIsAuthenticated
      }}>
        <HashRouter>
        <NavbarWithRouter/>

        <main className="p-4 full-height">
            <Switch>
                <Route path="/login" component={LoginPage}/>
                <PrivateRoute path="/stock" component={StockPage} />
                <PrivateRoute path="/client/:id" component={ClientPage} />
                <PrivateRoute path="/clients" component={ClientsPage} />
                <Route path="/" component={HomePage} />
            </Switch>
        </main>

        </HashRouter>
      </AuthContext.Provider>);
};

const rootElement = document.querySelector('#app');
ReactDom.render(<App />,rootElement);