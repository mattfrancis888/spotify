//https://medium.com/@ger86/react-placeholders-while-the-content-loads-dc8d08c85518
import React from "react";
import ContentLoader from "react-content-loader";
import lightGrey from "../img/lightGrey.png";

const CirclePlaceholder: React.FC<{}> = () => {
    return <img src={lightGrey} alt="placeHolderImg"></img>;
    // return <div className="circlePlaceHolderContainer"></div>;
};

export default CirclePlaceholder;
