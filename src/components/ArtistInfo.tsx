import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ArtistSongs, fetchSongs, fetchArtist, Artist } from "../actions";
import { StoreState } from "../reducers";
import Loading from "./Loading";
import { cloudinaryCloudName } from "../keys";
import { Image, CloudinaryContext } from "cloudinary-react";
import { RouteComponentProps } from "react-router-dom";
import Header from "./Header";

interface ArtistInfoRouteParam {
    artistId: string;
}
interface ArtistInfoProps extends RouteComponentProps<ArtistInfoRouteParam> {
    //RouteComponentProps is used to for Typescript's props.match.params
    fetchArtist(artistId: string): void;
    fetchSongs(artistId: string): void;
    artists: Artist[];
    artistSongs: ArtistSongs[];
}

const ArtistInfo: React.FC<ArtistInfoProps> = (props) => {
    useEffect(() => {
        props.fetchArtist(props.match.params.artistId);
        props.fetchSongs(props.match.params.artistId);
    }, []);

    const renderHeader = (): JSX.Element => {
        if (props.artists.length === 0) return <Header artistName="" />;
        else
            return (
                <Header
                    artistName={`${props.artists[0].firstName} ${props.artists[0].lastName}`}
                />
            );
    };
    const renderBannerAndName = (): JSX.Element | JSX.Element[] => {
        if (props.artists.length === 0)
            return (
                // <div className="loadingCenter">
                //     <Loading />
                // </div>
                <React.Fragment></React.Fragment>
            );
        else
            return (
                <div className="bannerContainer">
                    <img
                        src={props.artists[0].backgroundImage}
                        alt="artist's banner"
                    ></img>
                    <h1>{`${props.artists[0].firstName} ${props.artists[0].lastName}`}</h1>
                </div>
            );
    };

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
        <React.Fragment>
            {renderHeader()}
            <div className="artistContainer">
                {renderBannerAndName()}
                <div className="popularSongsContainer">
                    <h2 className="popularSongsTitle">Popular Songs</h2>
                    <div className="songsListWrap">{renderSongs()}</div>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        artistSongs: state.artistSongs,
        artists: state.artists,
    };
};
export default connect(mapStateToProps, { fetchArtist, fetchSongs })(
    ArtistInfo
);
