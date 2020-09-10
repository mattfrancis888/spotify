import React from "react";
import thomasRhettSong from "../img/thomasRhettSong.jpg";
const Artist: React.FC<{}> = () => {
    return (
        <div className="artistContainer">
            <div className="bannerContainer">
                <img src={thomasRhettSong} alt="artist's banner"></img>
                <h1>Thomas Rhett</h1>
            </div>
            <div className="popularSongsContainer">
                <h2 className="popularSongsTitle">Popular Songs</h2>
                <div className="songsListWrap">
                    <div className="song">
                        <div className="songImageContainer">
                            <img src={thomasRhettSong} alt="song pic"></img>
                        </div>
                        <h1>Song 1</h1>
                    </div>
                    <div className="song">
                        <div className="songImageContainer">
                            <img src={thomasRhettSong} alt="song pic"></img>
                        </div>
                        <h1>Song 2</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Artist;
