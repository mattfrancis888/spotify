import React from "react";
import Body from "./Body";
import { Router } from "react-router-dom";
import history from "../browserHistory";
import Routes from "./Routes";
const App: React.FC<{}> = () => {
    return (
        <Router history={history}>
            <Routes />
        </Router>
    );
};

export default App;
