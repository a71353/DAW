"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
/**
 * Registers routes for the Express app related to activities and reminders.
 */
function registerRoutes(app, activitiesWorker, remindersWorker) {
    /**
     * GET endpoint for listing all activities. Responds with JSON of activities or a message if none are found.
     */
    app.get("/activities", (inRequest, inResponse) => __awaiter(this, void 0, void 0, function* () {
        try {
            const activities = yield activitiesWorker.listActivities();
            if (activities.length == 0)
                inResponse.send({ message: "No activities in the Database" });
            else
                inResponse.json(activities); // Serialize object into JSON.
        }
        catch (inError) {
            inResponse.send(inError);
        }
    }));
    /**
     * GET endpoint for retrieving a specific activity by its ID. Responds with JSON of the activity or a message if not found.
     */
    app.get("/activities/:id", (inRequest, inResponse) => __awaiter(this, void 0, void 0, function* () {
        try {
            const activities = yield activitiesWorker.listActivity(inRequest.params.id);
            if (activities.length == 0)
                inResponse.send({ message: "No activities in the Database corresponding to that ID" });
            else
                inResponse.json(activities); // Serialize object into JSON.
        }
        catch (inError) {
            inResponse.send(inError);
        }
    }));
    /**
     * POST endpoint for adding a new activity. Responds with the added activity in JSON.
     */
    app.post("/activities", (inRequest, inResponse) => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(inRequest.body);
            const activity = yield activitiesWorker.addActivity(inRequest.body);
            inResponse.json(activity);
        }
        catch (inError) {
            inResponse.send(inError);
        }
    }));
    /**
     * DELETE endpoint for removing an activity by its ID. Also removes associated reminders. Responds with a confirmation message.
     */
    app.delete("/activities/:id", (inRequest, inResponse) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield activitiesWorker.deleteActivity(inRequest.params.id);
            yield remindersWorker.deleteReminderByActID(inRequest.params.id);
            inResponse.send({ message: "Deleted" });
        }
        catch (inError) {
            inResponse.send(inError);
        }
    }));
    /**
     * PUT endpoint for updating an existing activity. Responds with a confirmation message.
     */
    app.put("/activities/:id", (inRequest, inResponse) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield activitiesWorker.updateActivity(inRequest.params.id, inRequest.body);
            inResponse.send({ message: "Updated" });
        }
        catch (inError) {
            inResponse.send(inError);
        }
    }));
    /**
     * GET endpoint for listing all reminders. Sorts them by date and responds with JSON of reminders or a message if none are found.
     */
    app.get("/reminders", (inRequest, inResponse) => __awaiter(this, void 0, void 0, function* () {
        try {
            const reminders = yield remindersWorker.listReminders();
            reminders.sort(function (a, b) {
                let dateA = new Date(a.date);
                let dateB = new Date(b.date);
                if (dateA < dateB) {
                    return -1;
                }
                if (dateA > dateB) {
                    return 1;
                }
                return 0;
            });
            if (reminders.length == 0)
                inResponse.send({ message: "No reminders in the Database" });
            else
                inResponse.json(reminders); // Serialize object into JSON.
        }
        catch (inError) {
            inResponse.send(inError);
        }
    }));
    /**
     * GET endpoint for retrieving a specific reminder by its ID. Responds with JSON of the reminder or a message if not found.
     */
    app.get("/reminders/:id", (inRequest, inResponse) => __awaiter(this, void 0, void 0, function* () {
        try {
            const reminders = yield remindersWorker.listReminder(inRequest.params.id);
            if (reminders.length == 0)
                inResponse.send({ message: "No reminders in the Database corresponding to that ID" });
            else
                inResponse.json(reminders); // Serialize object into JSON.
        }
        catch (inError) {
            inResponse.send(inError);
        }
    }));
    /**
     * POST endpoint for adding a new reminder. Responds with the added reminder in JSON.
     */
    app.post("/reminders", (inRequest, inResponse) => __awaiter(this, void 0, void 0, function* () {
        try {
            const reminder = yield remindersWorker.addReminder(inRequest.body);
            inResponse.json(reminder);
        }
        catch (inError) {
            inResponse.send(inError);
        }
    }));
    /**
     * DELETE endpoint for removing a reminder by its ID. Responds with a confirmation message.
     */
    app.delete("/reminders/:id", (inRequest, inResponse) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield remindersWorker.deleteReminderByID(inRequest.params.id);
            inResponse.send({ message: "Deleted" });
        }
        catch (inError) {
            inResponse.send(inError);
        }
    }));
}
exports.registerRoutes = registerRoutes;
