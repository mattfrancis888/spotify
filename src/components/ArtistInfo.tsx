import React, { useEffect } from "react";
import thomasRhettSong from "../img/thomasRhettSong.jpg";
import { connect } from "react-redux";
import { ArtistSongs, fetchSongs, fetchArtists, Artist } from "../actions";
import { StoreState } from "../reducers";
import Loading from "./Loading";
import { cloudinaryCloudName } from "../keys";
import { Image, CloudinaryContext } from "cloudinary-react";
import { RouteComponentProps } from "react-router-dom";

interface ArtistInfoRouteParam {
    artistId: string;
}
interface ArtistInfoProps extends RouteComponentProps<ArtistInfoRouteParam> {
    //RouteComponentProps is used to for Typescript's props.match.params

    fetchSongs(artistId: string): void;
    artistSongs: ArtistSongs[];
}

const ArtistInfo: React.FC<ArtistInfoProps> = (props) => {
    useEffect(() => {
        props.fetchSongs(props.match.params.artistId);
    }, []);

    // const renderBannerAndName = (): JSX.Element | JSX.Element[] => {
    // if (props.artists.length === 0)
    //     return (
    //         <div className="loadingCenter">
    //             <Loading />
    //         </div>
    //     );
    // else
    //     return (
    //         <div className="bannerContainer">
    //             <img src={thomasRhettSong} alt="artist's banner"></img>
    //             <h1>Thomas Rhett</h1>
    //         </div>
    //     );
    //  };

    const renderSongs = (): JSX.Element | JSX.Element[] => {
        if (props.artistSongs.length === 0)
            return (
                <div className="loadingCenter">
                    <Loading />
                </div>
            );
        else {
            return props.artistSongs[0].songs.map((song, index) => {
                return (
                    <CloudinaryContext
                        cloudName={cloudinaryCloudName}
                        key={index}
                        className="song"
                    >
                        <div className="songImageContainer">
                            <Image publicId={song.image}></Image>
                        </div>
                        <h1>{song.title}</h1>
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
            {/* {renderBannerAndName()} */}
            <div className="popularSongsContainer">
                <h2 className="popularSongsTitle">Popular Songs</h2>
                <div className="songsListWrap">{renderSongs()}</div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        artistSongs: state.artistSongs,
        artists: state.artists,
    };
};
export default connect(mapStateToProps, { fetchSongs })(ArtistInfo);
