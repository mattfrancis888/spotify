import React from "react";
import { Route, Switch } from "react-router-dom";
import Body from "./Body";
import Artist from "./Artist";
const Routes: React.FC<{}> = () => {
    return (
        <Switch>
            <Route path="/" exact component={Body} />
            <Route path="/artist/:artistId" exact component={Artist} />
        </Switch>
    );
};

export default Routes;
