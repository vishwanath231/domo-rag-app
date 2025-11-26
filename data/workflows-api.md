# Workflows API

> **Source:** https://developer.domo.com/portal/1ay1akbc787jg-workflows-api
> Domo Workflows allows you to graphically model a business process into an executable workflow using Business Process Management (BPM) notations and flows. Orchestration capabilities offer robust solutions for integrating internal and external systems, configuring decision logic, and automating activities in a workflow.
> For more background on Workflows, check out the [Knowledge Base for an overview](https://domo-support.domo.com/s/article/000005108?language=en_US).
> If you haven't leveraged Workflows from within Apps before, checkout [the guide on hitting a Workflow from an App](../Apps/App-Framework/Guides/hitting-a-workflow.md), which details how to configure your `manifest.json` file and wire up Workflows to your app.

### [

Start a Workflow
](#start-a-workflow)
Starts a Workflow and returns details about the Workflow Instance.

#### [

Code Example
](#code-example)
const startWorkflow \= async (workflowAlias, body) \=> {
const instance \= await domo.post(
\`/domo/workflow/v1/models/${workflowAlias}/start\`,
    body
  );
  return instance;
};
Arguments
](#arguments)
Property Name
Type
Required
Description
workflowAlias
String
The name given to the Workflow in the manifest
HTTP Request
](#http-request)
POST /domo/workflow/v1/models/{workflowAlias}/start
Request Body
](#request-body)
The request body accepts an object containing the start parameters required to run the workflow. These parameters are also defined in the `manifest.json` file and properties in the object should correspond to the `aliasName` of the parameter.
{"parameter1": parameter1, "parameter2": parameter2}
HTTP Response
](#http-response)
Returns the information about the instance of the Workflow that was just started. The `status` property can take the values `null`, `IN_PROGRESS`, `CANCELED`, or `COMPLETED`.
A status of `null` might be valid. It just means the workflow hasn’t reported back as started yet.
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF\-8
{
    "id": "2052e10a-d142-4391-a731-2be1ab1c0188", // id of the workflow
    "modelId": "a8afdc89-9491-4ee4-b7c3-b9e9b86c0138", // id of the workflow instance
    "modelName": "AddTwoNumbers", // name of the workflow
    "modelVersion": "1.1.0", // workflow version number
    "createdBy": "8811501", // user id of workflow creator
    "createdOn": "2023-11-15T15:28:57.479Z",
    "updatedBy": "8811501",
    "updatedOn": "2023-11-15T15:28:57.479Z",
    "status": "null"
}
Get Metrics for a Workflow
](#get-metrics-for-a-workflow)
Returns key metric information about a Workflow.
](#code-example-1)
const getWorkflowMetrics \= async (workflowAliasedName) \=> {
  const metrics \= await domo.get(
    \`/domo/workflow/v1/models/${workflowAliasedName}/overall\`
return metrics;
Arguments (query parameters)
](#arguments-query-parameters)
limit
Long
Optional
limit of instance metrics returns
offset
offset for pagination
after
after a certain time
until
before a certain time
status
Only show instances that have the provided status(es) `IN_PROGRESS`, `CANCELED`, `COMPLETED`
](#http-request-1)
GET /domo/workflow/v1/models/{workflowAliasedName}/overall
](#http-response-1)
"modelId": "a8afdc89-9491-4ee4-b7c3-b9e9b86c0138",
"version": "1.1.0",
"completedWorkflows": 0,
"inProgressWorkflows": 4,
"failedWorkflows": 1,
"canceledWorkflows": 0,
"averageCycleTime": 0,
"instanceMetric": \[
{
"instanceId": "2052e10a-d142-4391-a731-2be1ab1c0188",
"modelId": "a8afdc89-9491-4ee4-b7c3-b9e9b86c0138",
"version": "1.1.0",
"creatorId": "8811501",
"workflowStartTime": "2023-11-15T15:28:57.522Z",
"workflowEndTime": null,
"workflowCancelTime": null,
"workflowCycleTime": 0,
"status": "IN_PROGRESS"
},
"instanceId": "e5cb6377-36b5-4277-a2dd-2bac9a6a2d5d",
"workflowStartTime": "2023-12-11T16:20:18.900Z",
"instanceId": "0dee93c0-0bdf-442c-83f6-dc294aa577e1",
"workflowStartTime": "2023-12-11T16:19:49.956Z",
"instanceId": "10d6138b-c814-406d-9ea0-99646d0bf467",
"workflowStartTime": "2023-12-11T16:20:33.930Z",
"instanceId": "0acfc3c9-c3e8-420d-81a5-6d27f17c0bdf",
"workflowStartTime": "2023-11-15T15:28:59.950Z",
"status": "FAILED"
}
\]
Get Workflow Instance
](#get-workflow-instance)
If you are checking on the status of an existing Workflow instance.
](#code-example-2)
const getWorkflowInstance \= async (workflowAlias, workflowInstanceId) \=> {
const instance \= await domo.get(
\`/domo/workflow/v1/models/${workflowAlias}/instance/${workflowInstanceId}\`
](#arguments-1)
workflowInstanceId
The UUID of the Workflow instance
](#http-request-2)
GET /domo/workflow/v1/models/{workflowAlias}/instance/{workflowInstanceId}
](#http-response-2)
Returns the information about the instance of the Workflow requested. The `status` property can take the values `null`, `IN_PROGRESS`, `CANCELED`, or `COMPLETED`.
"status": "COMPLETED"