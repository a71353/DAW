import * as path from "path";
import Nedb from "nedb";
const Datastore = require("nedb");

/** Interface defining the structure for Activity objects. */
export interface IActivity {
    _id?: number,       // Optional unique identifier for the activity.
    name: string,       // Name of the activity.
    description: string // Description of the activity.
}

/** 
 * Worker class handling database operations for activities. 
 */
export class Worker {
    private db: Nedb; // Instance of Nedb database.

    /** 
     * Constructor initializes the database with the specified path. 
     */
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "activity.db"), // Sets the database file location.
            autoload: true // Automatically load the database file.
        });
    }

    /** 
     * Retrieves a list of all activities from the database. 
     */
    public listActivities(): Promise<IActivity[]> {
        return new Promise((resolve, reject) => {
            this.db.find({}, (error: Error | null, docs: IActivity[]) => {
                if (error) {
                    reject(error); // Reject the promise with the error.
                } else {
                    resolve(docs); // Resolve the promise with the documents.
                }
            });
        });
    }

    /** 
     * Retrieves a specific activity by its ID. 
     */
    public listActivity(inID: string): Promise<IActivity[]> {
        return new Promise((resolve, reject) => {
            this.db.find({ _id: inID }, (error: Error | null, docs: IActivity[]) => {
                if (error) {
                    reject(error); // Reject the promise with the error.
                } else {
                    resolve(docs); // Resolve the promise with the documents.
                }
            });
        });
    }

    /** 
     * Adds a new activity to the database. 
     */
    public addActivity(inActivity: IActivity): Promise<IActivity> {
        return new Promise((resolve, reject) => {
            this.db.insert(inActivity, (error: Error | null, newDoc: IActivity) => {
                if (error) {
                    reject(error); // Reject the promise with the error.
                } else {
                    resolve(newDoc); // Resolve the promise with the new document.
                }
            });
        });
    }

    /** 
     * Deletes an activity from the database by its ID. 
     */
    public deleteActivity(inID: string): Promise<void> {
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
     * Updates an existing activity in the database with new values. 
     */
    public updateActivity(inID: string, fields: IActivity): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.update({ _id: inID }, {name:fields.name, description:fields.description},{},
                (error: Error | null) => {
                    if (error) {
                        reject(error); // Reject the promise with the error.
                    } else {
                        resolve(); // Resolve the promise indicating success.
                    }
                }
            );
        });
    }
}
