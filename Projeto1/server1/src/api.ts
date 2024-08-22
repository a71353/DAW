import { Express, Request, Response } from "express";

import * as activities from "./activities";
import { IActivity } from "./activities";
import * as reminders from "./reminders";
import { IReminder } from "./reminders";

/** 
 * Registers routes for the Express app related to activities and reminders.
 */
export function registerRoutes(app: Express, activitiesWorker: activities.Worker, remindersWorker: reminders.Worker) {

    /** 
     * GET endpoint for listing all activities. Responds with JSON of activities or a message if none are found.
     */
    app.get("/activities", async (inRequest: Request, inResponse: Response) => {
        try {
            const activities: IActivity[] = await activitiesWorker.listActivities();
            if (activities.length == 0) inResponse.send({ message: "No activities in the Database" })
            else inResponse.json(activities); // Serialize object into JSON.
        } catch (inError) {
            inResponse.send(inError);
        }
    });

    /** 
     * GET endpoint for retrieving a specific activity by its ID. Responds with JSON of the activity or a message if not found.
     */
    app.get("/activities/:id", async (inRequest: Request, inResponse: Response) => {
        try {
            const activities: IActivity[] = await activitiesWorker.listActivity(inRequest.params.id);
            if (activities.length == 0) inResponse.send({ message: "No activities in the Database corresponding to that ID" })
            else inResponse.json(activities); // Serialize object into JSON.
        } catch (inError) {
            inResponse.send(inError);
        }
    });

    /** 
     * POST endpoint for adding a new activity. Responds with the added activity in JSON.
     */
    app.post("/activities", async (inRequest: Request, inResponse: Response) => {
        try {
            console.log(inRequest.body)
            const activity: IActivity = await activitiesWorker.addActivity(inRequest.body);
            inResponse.json(activity);
        } catch (inError) {
            inResponse.send(inError);
        }
    });

    /** 
     * DELETE endpoint for removing an activity by its ID. Also removes associated reminders. Responds with a confirmation message.
     */
    app.delete("/activities/:id", async (inRequest: Request, inResponse: Response) => {
        try {
            await activitiesWorker.deleteActivity(inRequest.params.id);
            await remindersWorker.deleteReminderByActID(inRequest.params.id)
            inResponse.send({ message: "Deleted" });
        } catch (inError) {
            inResponse.send(inError);
        }
    });

    /** 
     * PUT endpoint for updating an existing activity. Responds with a confirmation message.
     */
    app.put("/activities/:id", async (inRequest: Request, inResponse: Response) => {
        try {
            await activitiesWorker.updateActivity(inRequest.params.id, inRequest.body);
            inResponse.send({ message: "Updated" });
        } catch (inError) {
            inResponse.send(inError);
        }
    });

    /** 
     * GET endpoint for listing all reminders. Sorts them by date and responds with JSON of reminders or a message if none are found.
     */
    app.get("/reminders", async (inRequest: Request, inResponse: Response) => {
        try {
            const reminders: IReminder[] = await remindersWorker.listReminders();

            reminders.sort(function (a, b) { // Sort reminders by date.
                let dateA = new Date(a.date);
                let dateB = new Date(b.date);

                if (dateA < dateB) {
                    return -1;
                }
                if (dateA > dateB) {
                    return 1;
                }
                return 0
            })

            if (reminders.length == 0) inResponse.send({ message: "No reminders in the Database" })
            else inResponse.json(reminders); // Serialize object into JSON.
        } catch (inError) {
            inResponse.send(inError);
        }
    });

    /** 
     * GET endpoint for retrieving a specific reminder by its ID. Responds with JSON of the reminder or a message if not found.
     */
    app.get("/reminders/:id", async (inRequest: Request, inResponse: Response) => {
        try {
            const reminders: IReminder[] = await remindersWorker.listReminder(inRequest.params.id);
            if (reminders.length == 0) inResponse.send({ message: "No reminders in the Database corresponding to that ID" })
            else inResponse.json(reminders); // Serialize object into JSON.
        } catch (inError) {
            inResponse.send(inError);
        }
    });

    /** 
     * POST endpoint for adding a new reminder. Responds with the added reminder in JSON.
     */
    app.post("/reminders", async (inRequest: Request, inResponse: Response) => {
        try {
            const reminder: IReminder = await remindersWorker.addReminder(inRequest.body);
            inResponse.json(reminder);
        } catch (inError) {
            inResponse.send(inError);
        }
    });

    /** 
     * DELETE endpoint for removing a reminder by its ID. Responds with a confirmation message.
     */
    app.delete("/reminders/:id", async (inRequest: Request, inResponse: Response) => {
        try {
            await remindersWorker.deleteReminderByID(inRequest.params.id);
            inResponse.send({ message: "Deleted" });
        } catch (inError) {
            inResponse.send(inError)
        }
    })
}
