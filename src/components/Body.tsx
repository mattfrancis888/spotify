import React from "react";
import edSheeran from "../img/edSheeran.jpg";
import spotify from "../img/spotify.png";
const Body: React.FC<{}> = () => {
    return (
        <React.Fragment>
            <div className="homeContainer">
                <div className="titleWrap">
                    <img
                        className="spotifyLogo"
                        src={spotify}
                        alt="spotify logo"
                    ></img>
                    <h1 className="favoriteArtistTitle">'s Favorite Artists</h1>
                </div>
                <div className="favoriteArtistsContainer">
                    <div className="artistCircle">
                        <img src={edSheeran} alt="artist" />
                    </div>
                    <div className="artistCircle">
                        <img src={edSheeran} alt="artist" />
                    </div>
                    <div className="artistCircle">
                        <img src={edSheeran} alt="artist" />
                    </div>
                    <div className="artistCircle">
                        <img src={edSheeran} alt="artist" />
                    </div>
                    <div className="artistCircle">
                        <img src={edSheeran} alt="artist" />
                    </div>
                    <div className="artistCircle">
                        <img src={edSheeran} alt="artist" />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Body;
