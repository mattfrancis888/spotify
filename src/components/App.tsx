import React from "react";
import { Router } from "react-router-dom";
import history from "../browserHistory";
import Routes from "./Routes";

const App: React.FC<{}> = () => {
    history.listen((_) => {
        window.scrollTo(0, 0);
    });
    // console.log(
    //     "REACT_APP_NOT_SECRET_CODE",
    //     process.env.REACT_APP_NOT_SECRET_CODE
    // );
    return (
        <Router history={history}>
            <Routes />
        </Router>
    );
};

export default App;
