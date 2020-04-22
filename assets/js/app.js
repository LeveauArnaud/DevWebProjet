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

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

console.log('Hello Webpack');



const App = () =>{
    return <HashRouter>
        <Navbar/>

        <main className="container pt-5">
            <Switch>
                <Route path="/login" component={LoginPage}/>
                <Route path="/client/:id" component={ClientPage}/>
                <Route path="/clients" component={ClientsPage}/>
                <Route path="/" component={HomePage} />
            </Switch>
        </main>

        </HashRouter>
};

const rootElement = document.querySelector('#app');
ReactDom.render(<App />,rootElement);