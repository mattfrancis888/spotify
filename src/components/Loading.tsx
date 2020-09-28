import React from "react";
import { WaveSpinner } from "react-spinners-kit";
const Loading = (): JSX.Element => {
    return <WaveSpinner size={150} color="white" loading={true} />;
};
export default Loading;
