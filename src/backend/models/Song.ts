// const mongoose = require("mongoose");
// const { Schema } = mongoose;
import mongoose, { Schema } from "mongoose";

export interface ISong extends mongoose.Document {
    title: string;
    image: string;
}

const songScehma = new Schema({
    title: String,
    image: String,
});
export { songScehma };
export default mongoose.model<ISong>("song", songScehma);
