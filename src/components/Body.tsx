import React, { useEffect } from "react";
import spotify from "../img/spotify.png";
import { Image, CloudinaryContext } from "cloudinary-react";
import { connect } from "react-redux";
import { Artist, fetchArtists } from "../actions";
import { StoreState } from "../reducers";
import { cloudinaryCloudName } from "../keys";

interface BodyProps {
    // fetchFilms: Function;
    fetchArtists(): void;
    artists: Artist[];
}

const Body: React.FC<BodyProps> = (props) => {
    useEffect(() => {
        props.fetchArtists();
    }, []);

    const renderArtists = (): JSX.Element | JSX.Element[] => {
        if (props.artists.length === 0) return <div>Loading</div>;
        else {
            console.log(props.artists);
            return props.artists.map((artist) => {
                return (
                    <CloudinaryContext
                        cloudName={cloudinaryCloudName}
                        key={artist._id.toString()}
                        className="artistCircle"
                    >
                        <Image
                            className="filmImage"
                            publicId={artist.image}
                        ></Image>
                    </CloudinaryContext>
                );
            });
        }
    };

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
                    {renderArtists()}
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        artists: state.artists,
    };
};
export default connect(mapStateToProps, { fetchArtists })(Body);
