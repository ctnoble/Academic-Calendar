/*jslint node: true */
/*jshint esversion: 6 */
"use strict";

const handlers = {

    'AlexaSkillEvent.SkillEnabled': function () {
        const userId = this.event.context.System.user.userId;

        console.log(`skillEventHandlers ---> skill was enabled for user: ${userId}`);
    },
    'AlexaSkillEvent.SkillDisabled': function () {
        const userId = this.event.context.System.user.userId;

        console.log(`skillEventHandlers ---> skill was disabled for user: ${userId}`);
    },
    'AlexaSkillEvent.SkillPermissionAccepted': function () {
        const userId = this.event.context.System.user.userId;
        const acceptedPermissions = JSON.stringify(this.event.request.body.acceptedPermissions);

        console.log(`skillEventHandlers ---> skill permissions were accepted for user ${userId}. New permissions: ${acceptedPermissions}`);
    },
    'AlexaSkillEvent.SkillPermissionChanged': function () {
        const userId = this.event.context.System.user.userId;
        const acceptedPermissions = JSON.stringify(this.event.request.body.acceptedPermissions);

        console.log(`skillEventHandlers ---> skill permissions were changed for user ${userId}. New permissions: ${acceptedPermissions}`);
    },
    'AlexaSkillEvent.SkillAccountLinked': function () {
        const userId = this.event.context.System.user.userId;

        console.log(`skillEventHandlers ---> skill account was linked for user ${userId}`);
    }
};

module.exports = handlers;