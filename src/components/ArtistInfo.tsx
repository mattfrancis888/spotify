import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    ArtistSongs,
    fetchSongs,
    fetchArtist,
    updateHearts,
    Artist,
    Hearts,
} from "../actions";
import { StoreState } from "../reducers";
import Loading from "./Loading";
import { cloudinaryCloudName } from "../keys";
import { Image, CloudinaryContext } from "cloudinary-react";
import { RouteComponentProps } from "react-router-dom";
import Header from "./Header";
import SongsPlaceholder from "./SongsPlaceholder";
import FadeIn from "react-fade-in";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IconContext } from "react-icons";

interface ArtistInfoRouteParam {
    artistId: string;
}
interface ArtistInfoProps extends RouteComponentProps<ArtistInfoRouteParam> {
    //RouteComponentProps is used to for Typescript's props.match.params
    fetchArtist(artistId: string): void;
    fetchSongs(artistId: string): void;
    updateHearts(artistId: string, hearts: Hearts): void;
    artists: Artist[];
    artistSongs: ArtistSongs[];
}

const ArtistInfo: React.FC<ArtistInfoProps> = (props) => {
    const [isBannerImageLoaded, setIsBannerImageLoaded] = useState(false);
    const [isSongsImageLoaded, setIsSongsImageLoaded] = useState(false);
    const [showHeartOutline, setHeartImage] = useState(true);
    const DEFAULT_AMOUNT_OF_HEARTS = -999;
    const [amountOfHearts, setAmountOfHearts] = useState(
        DEFAULT_AMOUNT_OF_HEARTS
    );
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
        else {
            //NOTE: to avoid multiple calls
            //just to update the # of hearts (via calling props.fetchArtists()
            //each time the heart is clicked;
            //I chose the method where props.artists[0].heart
            //will always be the same by only calling props.fetchArtist() on componentDidMount();
            //instead of componentDidUpdate()
            return (
                <div className="bannerContainer">
                    <img
                        style={
                            !isBannerImageLoaded
                                ? { opacity: "0" }
                                : { opacity: "1" }
                        }
                        src={props.artists[0].backgroundImage}
                        alt="artist's banner"
                        onLoad={() => {
                            setTimeout(
                                () => setIsBannerImageLoaded(true),
                                1000
                            );
                        }}
                    ></img>
                    <h1 className="artistFullName">{`${props.artists[0].firstName} ${props.artists[0].lastName}`}</h1>
                    <IconContext.Provider value={{ className: "heartsIcon" }}>
                        <h1
                            className="heartsTitle"
                            data-testid="amountOfHearts"
                        >
                            {showHeartOutline ? (
                                <AiOutlineHeart
                                    data-testid="outlineHeartIcon"
                                    onClick={() => {
                                        setHeartImage(!showHeartOutline);
                                        setAmountOfHearts(
                                            props.artists[0].hearts + 1
                                        );
                                        props.updateHearts(
                                            props.match.params.artistId,
                                            {
                                                hearts:
                                                    props.artists[0].hearts + 1,
                                            }
                                        );
                                    }}
                                />
                            ) : (
                                <AiFillHeart
                                    data-testid="filledHeartIcon"
                                    onClick={() => {
                                        setHeartImage(!showHeartOutline);
                                        setAmountOfHearts(
                                            props.artists[0].hearts
                                        );
                                        props.updateHearts(
                                            props.match.params.artistId,
                                            {
                                                hearts: props.artists[0].hearts,
                                            }
                                        );
                                    }}
                                />
                            )}
                            {amountOfHearts === DEFAULT_AMOUNT_OF_HEARTS
                                ? props.artists[0].hearts
                                : amountOfHearts}
                        </h1>
                    </IconContext.Provider>
                </div>
            );
        }
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
            <div data-testid="artistContent" className="artistContainer">
                {renderBannerAndName()}
                <div className="popularSongsContainer">
                    <h2 className="popularSongsTitle">Popular Songs</h2>
                    {!isSongsImageLoaded && (
                        <FadeIn>
                            <SongsPlaceholder />
                        </FadeIn>
                    )}
                    <div
                        className="songsListWrap"
                        style={
                            !isSongsImageLoaded
                                ? { display: "none" }
                                : { display: "block" }
                        }
                        onLoad={() => {
                            setTimeout(() => setIsSongsImageLoaded(true), 1000);
                        }}
                    >
                        {renderSongs()}
                    </div>
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
export default connect(mapStateToProps, {
    fetchArtist,
    fetchSongs,
    updateHearts,
})(ArtistInfo);
