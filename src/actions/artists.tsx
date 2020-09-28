import { ActionTypes } from "./types";
import onlineAPI from "./axiosConfig";
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

export interface Hearts {
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

export interface UpdateHeartsAction {
    type: ActionTypes.UPDATE_HEARTS;
    payload: Hearts[];
}

export const fetchArtists = () => async (dispatch: Dispatch) => {
    //NOTE: USE "axios" import FOR DEVELOPMENT instead of onlineAPI (axios WILL REFER TO PROXY created in package.json);
    // WE ARE DEPLOYING API AND FRONT-END SEPERATLEY! If we were to deploy back-end and front-end together,
    //WE WOULD ALWAYS USE "axios"
    const response = await onlineAPI.get<Artist[]>("/artists");
    dispatch<FetchArtistsAction>({
        type: ActionTypes.FETCH_ARTISTS,
        payload: response.data,
    });
};

export const fetchArtist = (artistId: string) => async (dispatch: Dispatch) => {
    const response = await onlineAPI.get<Artist[]>(`/artists/${artistId}`);
    dispatch<FetchArtistAction>({
        type: ActionTypes.FETCH_ARTIST,
        payload: response.data,
    });
};

export const updateHearts = (artistId: string, hearts: Hearts) => async (
    dispatch: Dispatch
) => {
    const response = await onlineAPI.patch<Hearts[]>(
        `/artists/${artistId}/hearts`,
        hearts
    );
    dispatch<UpdateHeartsAction>({
        type: ActionTypes.UPDATE_HEARTS,
        payload: response.data,
    });
};
