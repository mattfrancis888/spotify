import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Routes from "components/Routes";
import Root from "Root";
afterEach(cleanup);
describe("<Routes> has valid paths", () => {
    test("Shows <Body> at path / - Using MemoryRouter ", () => {
        const app = render(
            <Root>
                <MemoryRouter initialEntries={["/"]} initialIndex={0}>
                    <Routes />
                </MemoryRouter>
            </Root>
        );
        expect(app.getByTestId("bodyContent")).toBeInTheDocument();
    });
    test("Shows <ArtistInfo> at path /artist/:artistId - Using MemoryRouter", () => {
        const app = render(
            <Root>
                <MemoryRouter
                    initialEntries={["/artist/:artistId"]}
                    initialIndex={0}
                >
                    <Routes />
                </MemoryRouter>
            </Root>
        );
        expect(app.getByTestId("artistContent")).toBeInTheDocument();
    });
});
