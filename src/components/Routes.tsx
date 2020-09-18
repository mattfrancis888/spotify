import React from "react";
import { Route, Switch } from "react-router-dom";
import Body from "./Body";
import ArtistInfo from "./ArtistInfo";
import Header from "./Header";
const Routes: React.FC<{}> = () => {
    return (
        <Switch>
            <Route path="/" exact component={Body} />
            <Route path="/artist/:artistId" exact component={ArtistInfo} />
            <Route path="/test/:artistId" exact component={Header} />
        </Switch>
    );
};

export default Routes;
