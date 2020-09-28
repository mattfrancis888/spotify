import React from "react";
import { Route, Switch } from "react-router-dom";
import Body from "./Body";
import ArtistInfo from "./ArtistInfo";

const Routes: React.FC<{}> = () => {
    return (
        <Switch>
            <Route path="/" exact component={Body} />
            <Route path="/artist/:artistId" exact component={ArtistInfo} />
        </Switch>
    );
};

export default Routes;
