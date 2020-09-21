"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var prod_1 = __importDefault(require("./prod"));
var dev_1 = __importDefault(require("./dev"));
var key;
if (process.env.NODE_ENV === "production") {
    // we are in production - return the prod set of keys
    key = prod_1.default;
}
else {
    // we are in development - return the dev keys!!!
    key = dev_1.default;
}
exports.default = key;
