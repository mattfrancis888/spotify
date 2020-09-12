import { ActionTypes } from "./types";
import artists from "./axiosConfig";
import axios from "axios";
import { Dispatch } from "redux";

export interface Artist {
    _id: string;
    firstName: string;
    lastName: string;
    image: string;
    backgroundImage: string;
    hearts: number;
}

export interface FetchArtistsAction {
    type: ActionTypes.FETCH_ARTISTS;
    payload: Artist[];
}

export interface FetchArtistAction {
    type: ActionTypes.FETCH_ARTIST;
    payload: Artist[];
}

export const fetchArtists = () => async (dispatch: Dispatch) => {
    const response = await artists.get<Artist[]>("/artists");
    dispatch<FetchArtistsAction>({
        type: ActionTypes.FETCH_ARTISTS,
        payload: response.data,
    });
};

export const fetchArtist = (artistId: string) => async (dispatch: Dispatch) => {
    const response = await artists.get<Artist[]>(`artists/${artistId}`);
    dispatch<FetchArtistAction>({
        type: ActionTypes.FETCH_ARTIST,
        payload: response.data,
    });
};
