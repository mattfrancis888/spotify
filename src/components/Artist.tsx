import React, { useEffect } from "react";
import thomasRhettSong from "../img/thomasRhettSong.jpg";
import { connect } from "react-redux";
import { ArtistSongs, fetchSongs } from "../actions";
import { StoreState } from "../reducers";
import Loading from "./Loading";
import { cloudinaryCloudName } from "../keys";
import { Image, CloudinaryContext } from "cloudinary-react";
import { RouteComponentProps } from "react-router-dom";

interface ArtistRouteParam {
    artistId: string;
}
interface ArtistProps extends RouteComponentProps<ArtistRouteParam> {
    //RouteComponentProps is used to for Typescript's props.match.params
    fetchSongs(artistId: string): void;
    artistSongs: ArtistSongs[];
}

const Artist: React.FC<ArtistProps> = (props) => {
    useEffect(() => {
        props.fetchSongs(props.match.params.artistId);
    }, []);

    const renderSongs = (): JSX.Element | JSX.Element[] => {
        if (props.artistSongs.length === 0)
            return (
                <div className="loadingCenter">
                    <Loading />
                </div>
            );
        else {
            return props.artistSongs.map((artistSongs) => {
                console.log(artistSongs);
                return (
                    <CloudinaryContext
                        cloudName={cloudinaryCloudName}
                        key={artistSongs._id.toString()}
                        className="song"
                    >
                        <div className="songImageContainer">
                            {/* <Image publicId={artistSongs.songs.pop()}></Image> */}
                        </div>
                        <h1>{}</h1>
                    </CloudinaryContext>
                );
            });
        }
    };

    return (
        <div className="artistContainer">
            <div className="bannerContainer">
                <img src={thomasRhettSong} alt="artist's banner"></img>
                <h1>Thomas Rhett</h1>
            </div>

            <div className="popularSongsContainer">
                <h2 className="popularSongsTitle">Popular Songs</h2>
                <div className="songsListWrap">
                    {/* <div className="song">
                        <div className="songImageContainer">
                            <img src={thomasRhettSong} alt="song pic"></img>
                        </div>
                        <h1>Song 1</h1>
                    </div> */}
                    {renderSongs()}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        artistSongs: state.artistSongs,
    };
};
export default connect(mapStateToProps, { fetchSongs })(Artist);
