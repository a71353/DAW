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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
const path = __importStar(require("path"));
const Datastore = require("nedb");
/**
 * Worker class handling database operations for reminders.
 */
class Worker {
    /**
     * Constructor initializes the database with the specified path for reminders.
     */
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "reminders.db"),
            autoload: true // Automatically load the database file.
        });
    }
    /**
     * Retrieves a list of all reminders from the database.
     */
    listReminders() {
        return new Promise((resolve, reject) => {
            this.db.find({}, (error, docs) => {
                if (error) {
                    reject(error); // Reject the promise with the error.
                }
                else {
                    resolve(docs); // Resolve the promise with the documents.
                }
            });
        });
    }
    /**
     * Retrieves a specific reminder by its ID.
     */
    listReminder(inID) {
        return new Promise((resolve, reject) => {
            this.db.find({ _id: inID }, (error, docs) => {
                if (error) {
                    reject(error); // Reject the promise with the error.
                }
                else {
                    resolve(docs); // Resolve the promise with the documents.
                }
            });
        });
    }
    /**
     * Adds a new reminder to the database.
     */
    addReminder(inReminder) {
        return new Promise((resolve, reject) => {
            this.db.insert(inReminder, (error, newDoc) => {
                if (error) {
                    reject(error); // Reject the promise with the error.
                }
                else {
                    resolve(newDoc); // Resolve the promise with the new document.
                }
            });
        });
    }
    /**
     * Deletes a reminder from the database by its ID.
     */
    deleteReminderByID(inID) {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: inID }, {}, (error) => {
                if (error) {
                    reject(error); // Reject the promise with the error.
                }
                else {
                    resolve(); // Resolve the promise indicating success.
                }
            });
        });
    }
    /**
     * Deletes all reminders associated with a specific activity ID.
     */
    deleteReminderByActID(inID) {
        return new Promise((resolve, reject) => {
            this.db.remove({ activityID: inID }, { multi: true }, (error) => {
                if (error) {
                    reject(error); // Reject the promise with the error.
                }
                else {
                    resolve(); // Resolve the promise indicating success.
                }
            });
        });
    }
}
exports.Worker = Worker;
