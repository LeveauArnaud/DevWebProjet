//Les imports importants
import React, {useState} from "react";
import ReactDom from "react-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { HashRouter, Switch, Route} from "react-router-dom";
import ClientsPage from "./pages/ClientsPage";
import ClientPage from "./pages/ClientPage";
import LoginPage from "./pages/LoginPage";
import StockPage from "./pages/StockPage";
import ClientInfosPage from "./pages/ClientInfosPage";
import AuthAPI from "./services/AuthAPI";
//import css perso
import '../css/app.css';

AuthAPI.setup();

const App = () =>{

    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated);

    return <HashRouter>
        <Navbar isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated}/>

        <main className="p-4 full-height">
            <Switch>
                <Route path="/stock" component={StockPage}/>
                <Route path="/login" render={props => (
                    <LoginPage onLogin={setIsAuthenticated}/>)}
                />
                <Route path="/client/:id/update" component={ClientInfosPage}/>
                <Route path="/client/:id" component={ClientPage}/>
                <Route path="/clients" component={ClientsPage}/>
                <Route path="/" component={HomePage} />
            </Switch>
        </main>

        </HashRouter>
};

const rootElement = document.querySelector('#app');
ReactDom.render(<App />,rootElement);