import React, { useEffect, useState } from "react";
import spotify from "../img/spotify.png";
import { Image, CloudinaryContext } from "cloudinary-react";
import { connect } from "react-redux";
import { Artist, fetchArtists } from "../actions";
import { StoreState } from "../reducers";
import { CLOUDINARY_CLOUD_NAME } from "../keys";
import Loading from "./Loading";
import { useHistory } from "react-router-dom";
import CirclePlaceholder from "./CirclePlaceholder";

interface BodyProps {
    fetchArtists(): void;
    artists: Artist[];
}

const Body: React.FC<BodyProps> = (props) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const history = useHistory();

    useEffect(() => {
        props.fetchArtists();
    }, []);

    const renderArtists = (): JSX.Element | JSX.Element[] => {
        if (props.artists.length === 0)
            return (
                <div className="loadingCenter">
                    <Loading />
                </div>
            );
        else {
            return props.artists.map((artist) => {
                return (
                    <CloudinaryContext
                        data-testid="artist"
                        cloudName={CLOUDINARY_CLOUD_NAME}
                        key={artist._id.toString()}
                        className="artistCircle"
                        onClick={() =>
                            history.push(`artist/${artist._id.toString()}`)
                        }
                    >
                        {!isImageLoaded && <CirclePlaceholder />}
                        <Image
                            style={
                                !isImageLoaded
                                    ? { display: "none" }
                                    : { display: "block" }
                            }
                            publicId={artist.image}
                            onLoad={() => {
                                setTimeout(() => setIsImageLoaded(true));
                            }}
                        ></Image>
                    </CloudinaryContext>
                );
            });
        }
    };

    return (
        <div data-testid="bodyContent" className="homeContainer">
            <div className="titleWrap">
                <img
                    className="spotifyLogo"
                    src={spotify}
                    alt="spotify logo"
                ></img>
                <h1 className="favoriteArtistTitle">'s Favorite Artists</h1>
            </div>
            <div className="favoriteArtistsContainer">{renderArtists()}</div>
        </div>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        artists: state.artists,
    };
};
export default connect(mapStateToProps, { fetchArtists })(Body);
