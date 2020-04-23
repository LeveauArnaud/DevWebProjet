//Les imports importants
import React from "react";
import ReactDom from "react-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { HashRouter, Switch, Route} from "react-router-dom";
import '../css/app.css';
import ClientsPage from "./pages/ClientsPage";
import ClientPage from "./pages/ClientPage";
import LoginPage from "./pages/LoginPage";
import StockPage from "./pages/StockPage";
import ClientInfosPage from "./pages/ClientInfosPage";

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';



const App = () =>{
    return <HashRouter>
        <Navbar/>

        <main className="p-4 full-height">
            <Switch>
                <Route path="/stock" component={StockPage}/>
                <Route path="/login" component={LoginPage}/>
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