"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//module imports
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const Activities = __importStar(require("./activities"));
const Reminders = __importStar(require("./reminders"));
const api_1 = require("./api");
//Express app initialization
const app = (0, express_1.default)();
//DB constructors initialized
const activitiesWorker = new Activities.Worker();
const remindersWorker = new Reminders.Worker();
/**
 * Adding a piece of middleware to the Express app.
 * It allows the app to parse incoming request bodies that are in the JSON format.
 *
 * This is useful if we want to process data sent to the app in the HTTP request body,
 * such as when you are creating an API that receives data from the client in JSON format.
 * */
app.use(express_1.default.json());
//Defining the CORS security method
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
app.use(function (inRequest, inResponse, inNext) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PUT");
    inResponse.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    inNext();
});
//Calling the function where all the endpoints are, sending the express add to handle the endpoints and the DB constructors to handle the DB requests
(0, api_1.registerRoutes)(app, activitiesWorker, remindersWorker);
/**
 * Starting the server and listening for incoming HTTP requests on port 8080.
 * And a callback function that logs the message 'listening' to the console, informing the user that the server is listening to any request
 * */
app.listen(8080, () => console.log("listening"));
