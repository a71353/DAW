import * as path from "path";
import Nedb from "nedb";
const Datastore = require("nedb");

/** 
 * Interface defining the structure for Reminder objects.
 */
export interface IReminder {
    _id?: number,            // Optional unique identifier for the reminder.
    date: string,            // Date for the reminder.
    time: string,            // Time for the reminder.
    activityName: string,    // Name of the associated activity.
    activityId: string       // Identifier of the associated activity.
}

/** 
 * Worker class handling database operations for reminders. 
 */
export class Worker {
    private db: Nedb; // Instance of Nedb database.

    /** 
     * Constructor initializes the database with the specified path for reminders. 
     */
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "reminders.db"), // Sets the database file location.
            autoload: true // Automatically load the database file.
        });
    }

    /** 
     * Retrieves a list of all reminders from the database. 
     */
    public listReminders(): Promise<IReminder[]> {
        return new Promise((resolve, reject) => {
            this.db.find({}, (error: Error | null, docs: IReminder[]) => {
                if (error) {
                    reject(error); // Reject the promise with the error.
                } else {
                    resolve(docs); // Resolve the promise with the documents.
                }
            });
        });
    }

    /** 
     * Retrieves a specific reminder by its ID. 
     */
    public listReminder(inID: string): Promise<IReminder[]> {
        return new Promise((resolve, reject) => {
            this.db.find({ _id: inID }, (error: Error | null, docs: IReminder[]) => {
                if (error) {
                    reject(error); // Reject the promise with the error.
                } else {
                    resolve(docs); // Resolve the promise with the documents.
                }
            });
        });
    }

    /** 
     * Adds a new reminder to the database. 
     */
    public addReminder(inReminder: IReminder): Promise<IReminder> {
        return new Promise((resolve, reject) => {
            this.db.insert(inReminder, (error: Error | null, newDoc: IReminder) => {
                if (error) {
                    reject(error); // Reject the promise with the error.
                } else {
                    resolve(newDoc); // Resolve the promise with the new document.
                }
            });
        });
    }

    /** 
     * Deletes a reminder from the database by its ID. 
     */
    public deleteReminderByID(inID: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: inID }, {}, (error: Error | null) => {
                if (error) {
                    reject(error); // Reject the promise with the error.
                } else {
                    resolve(); // Resolve the promise indicating success.
                }
            });
        });
    }

    /** 
     * Deletes all reminders associated with a specific activity ID. 
     */
    public deleteReminderByActID(inID: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.remove({ activityID: inID }, {multi:true}, (error: Error | null) => {
                if (error) {
                    reject(error); // Reject the promise with the error.
                } else {
                    resolve(); // Resolve the promise indicating success.
                }
            });
        });
    }
}
