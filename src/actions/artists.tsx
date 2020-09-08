import { ActionTypes } from "./types";
import artists from "./axiosConfig";
import { Dispatch } from "redux";

export interface Artist {
    _id: Number;
    firstName: String;
    lastName: String;
    image: String;
    hearts: Number;
}

export interface FetchArtistsAction {
    type: ActionTypes.FETCH_ARTISTS;
    payload: Artist[];
}

export const fetchArtists = () => async (dispatch: Dispatch) => {
    const response = await artists.get<Artist[]>("/");
    console.log(response);
    dispatch<FetchArtistsAction>({
        type: ActionTypes.FETCH_ARTISTS,
        payload: response.data,
    });
};
