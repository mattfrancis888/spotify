import React, { useEffect } from "react";
import spotify from "../img/spotify.png";
const Header: React.FC<{}> = () => {
    return (
        <nav className="headerContianer">
            <div className="spotifyLogoContainer">
                <img src={spotify} alt="spotify logo" />
            </div>
            <h1 className="artistNameOnScroll">Aviici</h1>
        </nav>
    );
};

export default Header;
