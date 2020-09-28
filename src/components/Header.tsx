import React, { useEffect, useState } from "react";
import spotify from "../img/spotify.png";
import { useHistory } from "react-router-dom";

interface HeaderProps {
    artistName: string;
}

const Header: React.FC<HeaderProps> = (props) => {
    const history = useHistory();
    const [artistNameVisibility, setArtistName] = useState("artistNameHide");

    const listenScrollEvent = () => {
        if (window.scrollY < 73) {
            return setArtistName("artistNameHide");
        } else if (window.scrollY > 70) {
            return setArtistName("artistNameOnScroll");
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);

        return () => window.removeEventListener("scroll", listenScrollEvent);
    }, []);

    return (
        <nav className="headerContianer">
            <div
                className="spotifyLogoContainer"
                onClick={() => {
                    history.push("/");
                }}
            >
                <img src={spotify} alt="spotify logo" />
            </div>
            <h1 className={artistNameVisibility}>{props.artistName}</h1>
        </nav>
    );
};

export default Header;
