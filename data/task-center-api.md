# Task Center API

> **Source:** https://developer.domo.com/portal/k2vv2vir3c8ry-task-center-api
> Task Center allows you to organize manual tasks into different queues of work and control who can access them. They are often used in concert with [Workflows](https://domo-support.domo.com/s/article/000005108?language=en_US).
> For more [background on Task Center, please see the Knowledge Base](https://domo-support.domo.com/s/article/000005172?language=en_US).

### [

Get Queues
](#get-queues)
Returns all queues the user has access to.

#### [

Code Example
](#code-example)
const getQueues \= async (combineAttributes \= true, archived \= false) \=> {
const queues \= await domo.get(\`/domo/queues/v1/?combineAttributes=${combineAttributes}&archived=${archived}\`);
return queues;
}
const queues \= getQueues();
HTTP Request
](#http-request)
GET /domo/queues/v1/?combineAttributes={boolean}&archived={boolean}
HTTP Response
](#http-response)
Returns a list of all queue objects the user has access to.
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF\-8
\[
{
"id": "168ecd84-4a15-45f6-89d9-021fbbce0481",
"name": "Review Airplane Part Action Items",
"description": "Human review of AI generated recommendations for QA process improvements based on product defects in manufacturing QA.",
"active": true,
"taskLevelFiltersEnabled": true,
"taskLevelFilters": null,
"owner": "8811501",
"createdBy": "8811501",
"createdOn": "2023-10-18T14:48:23.314Z",
"updatedBy": "8811501",
"updatedOn": "2023-10-18T14:48:23.314Z"
}
\]
Get Queue by ID
](#get-queue-by-id)
Returns a queue by ID.
](#code-example-1)
const getQueueByID \= async (queueId) \=> {
const queue \= await domo.get(\`/domo/queues/v1/${queueId}\`);
return queue;
const queue \= getQueueByID("168ecd84-4a15-45f6-89d9-021fbbce0481");
](#http-request-1)
GET /domo/queues/v1/{queueId}
](#http-response-1)
Returns the queue object based on the `queueId` specified.
{
"id": "168ecd84-4a15-45f6-89d9-021fbbce0481",
"name": "Review Airplane Part Action Items",
"description": "Human review of AI generated recommendations for QA process improvements based on product defects in manufacturing QA.",
"active": true,
"taskLevelFiltersEnabled": true,
"taskLevelFilters": null,
"owner": "8811501",
"createdBy": "8811501",
"createdOn": "2023-10-18T14:48:23.314Z",
"updatedBy": "8811501",
"updatedOn": "2023-10-18T14:48:23.314Z"
Get Tasks
](#get-tasks)
Returns tasks based on the filters provided in the body. If the body is an empty object, it returns all tasks the user has access to.
](#code-example-2)
const body \= {
queueId: \["168ecd84-4a15-45f6-89d9-021fbbce0481"\],
displayType: \['ENIGMA_FORM', 'EMAIL', 'UNKNOWN'\],
status: \['OPEN', 'COMPLETED', 'VOIDED'\],
createdOn: \[
\[
"2023-10-04T12:22:54.239Z",
"2024-01-02T13:22:54.239Z"
\]
\]
const getTasks \= async (body) \=> {
const queue \= await domo.post(\`/domo/queues/v1/tasks/list?render=true&renderParts=NAME,DESCRIPTION,MAPPING,METADATA,VERSIONS\`, body);
const tasks \= getTasks(body);
](#http-request-2)
POST /domo/queues/v1/tasks/list?render={boolean}&renderParts={NAME, DESCRIPTION, MAPPING, METADATA, VERSIONS}
Request Body
](#request-body)
The request body accepts an object containing filters to apply to the request for tasks. All properties are optional and the body can be passed as an empty object to return all tasks.
Property Name
Type
Required
Description
queueId
String
Optional
An array of queue ids.
displayType
An array of display types for tasks. Options are `ENIGMA_FORM`, `EMAIL`, `UNKNOWN`.
status
An array of statuses. Options are `OPEN`, `COMPLETED`, `VOIDED`.
assignedBy
An array of user ids corresponding to the user that assigned the task to.
assignedTo
An array of user ids corresponding to the user that the task was assigned to.
createdOn
DateTime
An array containing an array with two elements: a start datetime and and end datetime, which define the createdOn date range. E.g. `[["2023-10-04T12:22:54.239Z","2024-01-02T13:22:54.239Z"]]`
createdBy
An array of user ids corresponding to the user that created the task.
assignedOn
An array containing an array with two elements: a start datetime and and end datetime, which define the assigedOn date range.
updatedOn
An array containing an array with two elements: a start datetime and and end datetime, which define the updatedOn date range.
completedOn
An array containing an array with two elements: a start datetime and and end datetime, which define the completedOn date range.
completedBy
An array of user ids corresponding to the user that completed the task.
orderByString
An array of strings corresponding to the properties from this body that the list of tasks should be ordered by.
version
An array version numbers to filter by
](#http-response-2)
Returns a list of tasks.
"id": "18OCT23_1JUTZM",
"attributes": \[\],
"queueId": "168ecd84-4a15-45f6-89d9-021fbbce0481",
"version": 1,
"createdOn": "2023-10-18T15:23:22.991Z",
"updatedOn": "2023-11-28T16:18:29.716Z",
"completedOn": null,
"completedBy": null,
"assignedOn": "2023-10-18T15:23:22.991Z",
"assignedBy": "8811501",
"assignedTo": "8811501",
"assigneeType": "USER",
"lockedOn": null,
"lockedBy": null,
"status": "OPEN",
"tags": \[\],
"comments": \[\],
"sourceSystem": "ODYSSEY",
"sourceInfo": {
"modelId": "6a701240-76bf-4b9a-8145-199156b371cc",
"modelVersion": "1.2.0",
"instanceId": "99d0d944-1d90-4622-8a49-2878b37fda10",
"deploymentId": "0fa42581-918b-4ba4-b77f-356c55735e52",
"instanceCreatedBy": "8811501",
"taskKey": "6755399651689301",
"workflowInstanceId": "6755399651689244",
"flowNodeId": "iVpiDJGGzWIPilg",
"elementInstanceKey": "6755399651689298"
},
"displayType": "ENIGMA_FORM",
"displayId": "cce35d38-95bc-4f87-ba92-849affb13c78",
"displayEntity": {
"id": "cce35d38-95bc-4f87-ba92-849affb13c78",
"name": "Airplane Part Action Items Review Form",
"description": "",
"settings": {},
"createdBy": "8811501",
"createdOn": "2023-10-18T15:03:10.728Z",
"updatedBy": "8811501",
"updatedOn": "2023-10-18T15:03:57.589Z",
"version": "1.0.0",
"sections": \[
{
"id": "d7186dcf-2b17-4124-b0d1-d69f0c1bcec7",
"title": "Please review AI generated action items for QA improvement",
"fields": \[
{
"id": "8e9cf127-e4a3-40f5-bd2e-31a80b1e31a5",
"label": "Suggested Action Items",
"description": "These are AI generated action items based on recent product defect data. Please review and edit before sending to QA team.",
"optional": false,
"fieldType": "PARAGRAPH",
"dataType": "text",
"acceptsInput": true,
"acceptsOutput": true,
"options": {
"values": \[\]
},
"alias": "Suggested_Action_Items",
"isList": false,
"useExternalValues": false
},
"id": "ca23a591-f080-430e-a9c7-83673fe963ac",
"label": "Send to QA Team",
"fieldType": "SINGLE_CHOICE",
"dataType": "boolean",
"acceptsInput": false,
"value": false,
"alias": "Send_to_QA_Team",
}
\]
}
\],
"releasedOn": "2023-10-18T15:03:57.785Z"
"contract": {
"input": \[
"name": "Suggested_Action_Items",
"displayName": "Suggested_Action_Items",
"type": "text",
"required": true,
"list": false,
"validValues": null
"output": \[
"displayName": null,
},
"name": "Send_to_QA_Team",
"type": "boolean",
\]
"inputVariables": {
"Suggested_Action_Items": "1. Investigate assembly line for misalignment issues near the hinge area\\n2. Inspect and replace seals in the actuator's main chamber to prevent hydraulic leaks\\n3. Address the issue of missing or loose fasteners with the supplier\\n"
"outputVariables": {}
},
"id": "18OCT23_Y9A3HR",
"createdOn": "2023-10-18T15:23:24.945Z",
"updatedOn": "2023-10-18T15:23:24.945Z",
"assignedOn": "2023-10-18T15:23:24.945Z",
"instanceId": "6e75dc76-47fa-4fa6-b157-3dc71e08d32b",
"taskKey": "2251800022518420",
"workflowInstanceId": "2251800022518320",
"elementInstanceKey": "2251800022518417"
Get Task by ID
](#get-task-by-id)

## [

Returns a task by its id.
](#returns-a-task-by-its-id)
](#code-example-3)
const getTaskByID \= async (queueId, taskId) \=> {
const task \= await domo.get(\`/domo/queues/v1/${queueId}/tasks/${taskId}?render=true\`);
return task;
const task \= getTaskByID("168ecd84-4a15-45f6-89d9-021fbbce0481", "18OCT23_1JUTZM");
](#http-request-3)
GET /domo/queues/v1/{queueId}/tasks/{taskId}?render={boolean}
](#http-response-3)
Returns the task object based requested.
"id": "18OCT23_1JUTZM",
"attributes": \[\],
"queueId": "168ecd84-4a15-45f6-89d9-021fbbce0481",
"version": 1,
"createdOn": "2023-10-18T15:23:22.991Z",
"updatedOn": "2023-11-28T16:18:29.716Z",
"completedOn": null,
"completedBy": null,
"assignedOn": "2023-10-18T15:23:22.991Z",
"assignedBy": "8811501",
"assignedTo": "8811501",
"assigneeType": "USER",
"lockedOn": null,
"lockedBy": null,
"status": "OPEN",
"tags": \[\],
"comments": \[\],
"sourceSystem": "ODYSSEY",
"sourceInfo": {
"modelId": "6a701240-76bf-4b9a-8145-199156b371cc",
"modelVersion": "1.2.0",
"instanceId": "99d0d944-1d90-4622-8a49-2878b37fda10",
"deploymentId": "0fa42581-918b-4ba4-b77f-356c55735e52",
"instanceCreatedBy": "8811501",
"taskKey": "6755399651689301",
"workflowInstanceId": "6755399651689244",
"flowNodeId": "iVpiDJGGzWIPilg",
"elementInstanceKey": "6755399651689298"
"displayType": "ENIGMA_FORM",
"displayId": "cce35d38-95bc-4f87-ba92-849affb13c78",
"displayEntity": {
"id": "cce35d38-95bc-4f87-ba92-849affb13c78",
"name": "Airplane Part Action Items Review Form",
"description": "",
"settings": {},
"createdOn": "2023-10-18T15:03:10.728Z",
"updatedOn": "2023-10-18T15:03:57.589Z",
"version": "1.0.0",
"sections": \[
{
"id": "d7186dcf-2b17-4124-b0d1-d69f0c1bcec7",
"title": "Please review AI generated action items for QA improvement",
"fields": \[
{
"id": "8e9cf127-e4a3-40f5-bd2e-31a80b1e31a5",
"label": "Suggested Action Items",
"description": "These are AI generated action items based on recent product defect data. Please review and edit before sending to QA team.",
"optional": false,
"fieldType": "PARAGRAPH",
"dataType": "text",
"acceptsInput": true,
"acceptsOutput": true,
"options": {
"values": \[\]
"alias": "Suggested_Action_Items",
"isList": false,
"useExternalValues": false
},
"id": "ca23a591-f080-430e-a9c7-83673fe963ac",
"label": "Send to QA Team",
"fieldType": "SINGLE_CHOICE",
"dataType": "boolean",
"acceptsInput": false,
"value": false,
"alias": "Send_to_QA_Team",
}
\]
}
\],
"releasedOn": "2023-10-18T15:03:57.785Z",
"userPermissions": \[\]
"contract": {
"input": \[
"name": "Suggested_Action_Items",
"displayName": "Suggested_Action_Items",
"type": "text",
"required": true,
"list": false,
"validValues": null
"output": \[
"displayName": null,
},
"name": "Send_to_QA_Team",
"type": "boolean",
\]
"inputVariables": {
"Suggested_Action_Items": "1. Investigate assembly line for misalignment issues near the hinge area\\n2. Inspect and replace seals in the actuator's main chamber to prevent hydraulic leaks\\n3. Address the issue of missing or loose fasteners with the supplier\\n"
"outputVariables": {}
Save Task Progress
](#save-task-progress)
Saves current task values given in the body, which contains the key value pairs for each input property of the task in question.
](#code-example-4)
![Screenshot 2024-01-02 at 8.50.40 AM.png](https://stoplight.io/api/v1/projects/cHJqOjI2NDA4OA/branches/YnI6MTE3NTA3NzU/images/%2Fdocs%2Fassets%2Fimages%2FScreenshot%202024-01-02%20at%208.50.40%20AM.png)
"Suggested_Action_Items": "1. Investigate assembly line for misalignment issues near the hinge area\\n2. Inspect and replace seals in the actuator's main chamber to prevent hydraulic leaks\\n3. Address the issue of missing or loose fasteners with the supplier\\n",
"Send_to_QA_Team": true
const saveTask \= async (queueId, taskId, body) \=> {
const task \= await domo.put(\`/domo/queues/v1/${queueId}/tasks/${taskId}/outputs\`, body);
const task \= saveTask("168ecd84-4a15-45f6-89d9-021fbbce0481", "18OCT23_1JUTZM", body);
](#http-request-4)
PUT /domo/queues/v1/{queueId}/tasks/{taskId}/outputs
](#request-body-1)
The request body accepts an object containing key value pairs for each input property of the task in question.
](#http-response-4)
The current saved state of the task.
"updatedOn": "2024-01-02T13:52:27.182Z",
"lockedOn": "2024-01-02T13:47:53.613Z",
"lockedBy": "8811501",
"displayEntity": null,
"outputVariables": {
"Suggested_Action_Items": "1. Investigate assembly line for misalignment issues near the hinge area\\n2. Inspect and replace seals in the actuator's main chamber to prevent hydraulic leaks\\n3. Address the issue of missing or loose fasteners with the supplier\\n",
"Send_to_QA_Team": false
Complete Task
](#complete-task)
Completes the task with the values given in the body.
](#code-example-5)
"Suggested_Action_Items": "1. Investigate assembly line for misalignment issues near the hinge area\\n2. Inspect and replace seals in the actuator's main chamber to prevent hydraulic leaks\\n3. Address the issue of missing or loose fasteners with the supplier\\n",
"Send_to_QA_Team": true
const completeTask \= async (queueId, taskId, body) \=> {
const task \= await domo.post(\`/domo/queues/v1/${queueId}/tasks/${taskId}/complete?version=1\`, body);
return task;
const task \= completeTask("168ecd84-4a15-45f6-89d9-021fbbce0481", "24OCT23_CI27D1", body);
](#http-request-5)
POST /domo/queues/v1/{queueId}/tasks/{taskId}/complete?version={VERSION}
](#request-body-2)
](#http-response-5)
The completed task.