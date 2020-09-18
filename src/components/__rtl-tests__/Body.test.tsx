import Root from "Root";
import React from "react";
import Body from "components/Body";
import "@testing-library/jest-dom/extend-expect";
import {
    render,
    cleanup,
    RenderResult,
    getByText,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
//import { FetchReviewsResponse } from "actions";
import nock from "nock";
import waitForExpect from "wait-for-expect";

afterEach(cleanup);
let app: RenderResult;
beforeEach(async () => {
    await act(async () => {
        app = render(
            <Root>
                <Body />
            </Root>
        );
    });
});

it("ComponentDidMount() fetches data and fills up DOM with Favorite Artists>", async () => {
    const mockData = [
        {
            _id: "1",
            firstName: "Thomas",
            lastName: "Rhett",
            image:
                "https://res.cloudinary.com/du8n2aa4p/image/upload/v1599518384/spotify/thomasRhett.jpg",
            backgroundImage:
                "https://res.cloudinary.com/du8n2aa4p/image/upload/v1599945696/spotify/backgroundThomasRhett.jpg",
            hearts: 0,
        },
        {
            _id: "2",
            firstName: "Ed",
            lastName: "Sheeran",
            image:
                "https://res.cloudinary.com/du8n2aa4p/image/upload/v1599518279/spotify/edSheeran.jpg",
            backgroundImage:
                "https://res.cloudinary.com/du8n2aa4p/image/upload/v1599945343/spotify/backgroundEdSheeran.jpg",
            hearts: 1,
        },
    ];
    const scope = nock("http://localhost:5000/")
        .get("/artists")
        .reply(200, mockData, { "Access-Control-Allow-Origin": "*" });

    await waitForExpect(() => {
        if (!scope.isDone()) {
            console.error("pending mocks: %j", scope.pendingMocks());
        }
        expect(scope.isDone()).toBe(true);

        expect(app.getAllByTestId("artist").length).toEqual(mockData.length);
    });
}, 30000); //30000 is our custom setTimeOut; not using Jest default timeout