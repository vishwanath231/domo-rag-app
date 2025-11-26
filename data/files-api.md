# Files API

> **Source:** https://developer.domo.com/portal/eeoadx67i6h46-files-api
> Domo supports nearly 100 different file types across over 300 file extensions. Please reach out to Domo Support if you have a question about supported file types, as the list changes often.
>
> #### [
>
> Domo Bricks
> ](#domo-bricks)
> Currently, Domo Bricks do not support the Files API.

## [

Upload a file
](#upload-a-file)
Uploading a new file can be accomplished through the following request. You will pass in the file to upload, and Domo will store it and generate a unique identifier for the file, which is returned to you.

> Default Permissions
> ](#default-permissions)
> The App Framework will automatically secure the file permissions so it can only be accessed by the same user who uploaded it, unless the `public` param is set to `true`. In that case, all users in the Domo instance will be able to access the file. File permissions can be updated to give access to specific users and groups, if needed. You can find out how to do that by reviewing the [`Update file permissions`](#update-file-permissions) API.

#### [

Code Example
](#code-example)
function uploadFile(name, description \= "", public \= false, file) {
const formData \= new FormData();
formData.append("file", file);
const url \= \`/domo/data-files/v1?name=${name}&description=${description}&public=${public}\`;
const options \= { contentType: "multipart" };
return domo.post(url, formData, options);
}
Query Parameters
](#query-parameters)
Property Name
Type
Required
Description
name
String
The name to be given to the file in Domo
description
Optional
A description of the file
public
Boolean
Whether the permissions of the file are set to public - this is false by default in the App Framework
HTTP Request
](#http-request)
POST /domo/data-files/v1?name={name}&description={description}&public={public} HTTP/1.1
Accept: application/json

### [

Request Body
](#request-body)
The request body is a JavaScript `FormData()` object that supports a multipart upload. The name given to the file to be appended to the `FormData` object is `file`.
HTTP Response
](#http-response)
Returns the ID of the created file.
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF\-8
{
"dataFileId": 401
Upload a file revision
](#upload-a-file-revision)
The Files API provides versioning support for files that have been uploaded. You may add another version of a file by sending a `PUT` request to the files endpoint referencing the `dataFileId` of the file you wish to revise.
](#code-example-1)
function uploadRevision(file, dataFileId) {
const url \= \`/domo/data-files/v1/${dataFileId}\`;
  return domo.put(url, formData, options);
Arguments
](#arguments)
dataFileId
Integer
The id of the file of which you wish to upload a revision
](#http-request-1)
PUT /domo/data-files/v1/{dataFileId} HTTP/1.1
](#request-body-1)
The request body is a javascript `FormData()` object which supports a multipart upload. The name given to the `File` that is to be appended to the `FormData` object is 'file'.
](#http-response-1)
Returns the revision id of the uploaded revision file.
    "revisionId": 430
Get all files metadata
](#get-all-files-metadata)
Each file that you upload has corresponding metadata. This endpoint allows you to list all the metadata for each file you have access to. If you want to limit the files to just those that you uploaded you can provide a `limitToOwned` boolean flag as a query parameter.
](#code-example-2)
function getFileDetailsList(ids \= null, expand \= null, limitToOwned \= false) {
  const params \= new URLSearchParams();
  if (ids !== null) params.append("ids", ids);
  if (expand !== null) params.append("expand", expand);
  const queryString \= params.toString();
  const url \= \`/domo/data-files/v1/details/?limitToOwned=${limitToOwned}${
    queryString !== "" ? \`&${queryString}\` : ""
}\`;
return domo.get(url);
](#arguments-1)
ids
Integer Array
An array of File Ids that you wish to be returned if you only want a subset of files
expand
String Array
An array of string properties that you wish to see additional details of (either `revisions`, `metadata`, or both)
limitToOwned
Whether or not to limit the result to only files that you uploaded
](#http-request-2)
GET /domo/data-files/v1/details?limitToOwned={limitToOwned}&ids={ids}&expand={expandList} HTTP/1.1
](#http-response-2)
Returns an array of file objects.
\[
{
"dataFileId": 401,
"name": "\\"SampleFile\\"",
"responsibleUserId": 1089963280,
"currentRevision": {
"dataFileRevisionId": 430,
"dataFileId": 401,
"contentType": "application/pdf",
"uploadUserId": 1089963280,
"sizeBytes": 142783,
"uploadTimeMillis": 199,
"md5Hash": "B6C962A9288F132762051A6A33708B90",
"datetimeUploaded": 1731611168000,
"scanState": "SAFE",
"sha256HashValue": "5E3EF0EF4CFAD65A1831D866DEEBD932C5A0AA3484A558FD0D1CA3EB852AE1BF"
},
"datetimeCreated": 1731611168000,
"revisions": \[\],
"existing": false
}
\]
Get file metadata by ID
](#get-file-metadata-by-id)
Given a known file ID, this endpoint allows you to list the metadata for that specific file.
](#code-example-3)
function getFileDetails(dataFileId, expandList \= null) {
let url \= \`/domo/data-files/v1/${dataFileId}/details\`;
  if (expandList !== null) {
    url += \`?expand=${expandList.join()}\`;
}
](#arguments-2)
](#http-request-3)
GET /domo/data-files/v1/{dataFileId}/details?expand={expandList} HTTP/1.1
](#http-response-3)
Returns the file details object.
"datetimeUploaded": "2019-03-06T00:26:37.000+0000",
"datetimeCreated": "2019-03-04T21:41:01.000+0000",
Download a file
](#download-a-file)
Below is the basic request for downloading a file. Depending on the type of file, this endpoint can be referenced inline in your application or called via an HTTP request. In this example, the `responseType` of the XHR request is being set to `blob` so that our code can reference it as a binary large object when passing the response to the Download method.
](#code-example-4)
import Download from "downloadjs";
function downloadFile(dataFileId, filename, revisionId) {
const options \= { responseType: "blob" };
const url \= \`/domo/data-files/v1/${dataFileId}${
!!revisionId ? \`/revisions/${revisionId}\` : ""
return domo.get(url, options).then((data) \=> {
Download(data, filename);
});
](#arguments-3)
The id of the file you wish to download
revisionId
The id of the file revision you wish to download
](#http-request-4)
To download the current file version:
GET /domo/data-files/v1/{dataFileId} HTTP/1.1
To download a previous version:
GET /domo/data-files/v1/{dataFileId}/revisions/{revisionId} HTTP/1.1
](#http-response-4)
Returns the File to be downloaded.
Content-Type: {mime-type of the file}
Delete a file
](#delete-a-file)
Permanently deletes a File from your instance.

> Warning
> ](#warning)
> This is destructive and cannot be reversed. However, the delete does occur at the revision level, so if you unintentionally delete a file, the previous version will now be the current version of the file for a given file Id.
> ](#code-example-5)
> function deleteFile(dataFileId, revisionId) {
> const url \= \`/domo/data-files/v1/${dataFileId}/revisions/${revisionId}\`;
> return domo.delete(url);
> ](#arguments-4)
> The id of the file you wish to delete
> The id of the revision file you wish to delete
> ](#http-request-5)
> DELETE /domo/data-files/v1/{dataFileId}/revisions/{revisionId} HTTP/1.1
> ](#http-response-5)
> Returns the parameter of success or error based on the file Id and the revisionId being valid.
> Get file permissions
> ](#get-file-permissions)
> ](#code-example-6)
> function getFilePermissions(dataFileId) {
> const url \= \`/domo/data-files/v1/${dataFileId}/permissions\`;
> ](#arguments-5)
> The id of the file you wish to get permission details for
> ](#http-request-6)
> GET /domo/data-files/v1/{dataFileId}/permissions HTTP/1.1
> ](#http-response-6)

    "publicAccess": false,
    "entries": \[
        {
            "entityType": "USER",
            "entityId": "1089963280",
            "grant": "READ\_WRITE\_DELETE\_SHARE\_ADMIN",
            "pass": "NONE"
        }
    \]

Update file permissions
](#update-file-permissions)
](#code-example-7)
function upadateFilePermissions(dataFileId, data) {
return domo.put(url, data);
](#arguments-6)
The id of the file you wish to update permission details for
](#http-request-7)
PUT /domo/data-files/v1/{dataFileId}/permissions HTTP/1.1
](#request-body-2)
The request body accepts a permissions object.
"publicAccess": true,
](#http-response-7)
Returns the parameter of success or error based on a valid permission object for the given file Id.

# Multi-part Files API

The Multi-part Files API allows for efficient upload, update, and management of large files in parts. It uses Domo’s Data File Service, supporting session-based file chunking for fault tolerance and enhanced control.
Creating a Multi-part Upload Session
](#creating-a-multi-part-upload-session)
To begin a multi-part file upload, create an upload session by calling `createSession`. This will return a session ID that is essential for uploading file parts.
](#code-example-8)
export const createSession \= async (name, description, contentType) \=> {
const url \= '/domo/data-files/v1/multipart';
return await domo.post(url, {
name,
description,
contentType,
'Cache-Control': 'no-cache',
};
Parameters
](#parameters)

- **name** (String): The name of the file.
- **description** (String): A description of the file.
- **contentType** (String): The MIME type of the file.
  ](#arguments-7)
  The name of the file
  contentType
  The MIME type of the file
  ](#http-request-8)
  POST /domo/data-files/v1/multipart HTTP/1.1
  The request body accepts
  "name": "SampleFile",
  "description": "Sample Description",
  "contentType": "application/pdf",
  "Cache-Control": "no-cache",
  ](#http-response-8)
  Returns the session ID.
  Content-Type: application/json;charset=UTF-8
  "sessionId": "1234567890"
  Creating a Multi-part Upload Update Session
  ](#creating-a-multi-part-upload-update-session)
  To update a multi-part file, create an update session by calling `createUpdateSession` and passing in the fileId. This will return a session ID that is essential for uploading file parts.
  ](#code-example-9)
  export const createUpdateSession \= async (
  fileId,
  name,
  description,
  contentType,
  ) \=> {
  const url \= \`/domo/data-files/v1/${fileId}/multipart\`;
    fileId,
](#parameters-1)
](#arguments-8)
fileId
Long
The id of the file you wish to update
](#http-request-9)
POST /domo/data-files/v1/{fileId}/multipart HTTP/1.1
    "fileId": 401,
](#http-response-9)
Uploading File Parts
](#uploading-file-parts)
After creating a session, upload the file in chunks. Each chunk is sent with a unique `index` and can optionally include a `checksum` for verification. The `checkSum` is used to verify the integrity of the uploaded chunk.
You can determine the chunk size manually, but a good recommended size is between 10MB and 100MB.
export const uploadPart \= async (
  sessionId,
  index,
  part,
  checkSum,
  const url \= \`/domo/data-files/v1/multipart/${sessionId}/part/${index}${
  checkSum ? \`?\[checksum\=${checkSum}\]\` : ''
  return await domo.put(url, part, { contentType });
  ](#parameters-2)
- **sessionId** (String): The session ID from `createSession` or `createUpdateSession`.
- **index** (Number): Part number for ordering (1–10,000).
- **part** (ArrayBuffer | String): File data chunk.
- **contentType** (String): The content type of the chunk.
- **checkSum** (String, optional): SHA-256 checksum for the chunk.
  ](#arguments-9)
  | Property Name | Type | Required | Description | | ------------- | ----------- | -------- | ------------------------------------------------------------ | --------------- | | sessionId | String | Required | The session ID from `createSession` or `createUpdateSession` | | index | Number | Required | Part number for ordering (1–10,000) | | part | ArrayBuffer | String | Required | File data chunk | | contentType | String | Required | The content type of the chunk | | checkSum | String | Optional | SHA-256 checksum for the chunk |
  ](#http-request-10)
  PUT /domo/data-files/v1/multipart/{sessionId}/part/{index}$?checksum={checkSum} HTTP/1.1
The request body accepts the file data chunk.
](#http-response-10)
Completing a Multi-part Upload
](#completing-a-multi-part-upload)
Once all parts are uploaded, finalize the process with `complete`:
export const complete \= async (sessionId) \=> {
  const url \= \`/domo/data-files/v1/multipart/${sessionId}/commit\`;
  return await domo.post(url, { sessionId });
  Parameter
  ](#parameter)
- **sessionId** (String): The session ID to commit.
  ](#arguments-10)
  sessionId
  The session ID to commit
  ](#http-request-11)
  POST /domo/data-files/v1/multipart/{sessionId}/commit HTTP/1.1
  ](#http-response-11)
  "dataFileId": "1234567890",
  "revisionId": "1234567890"
  Error Handling and Retry Mechanism
  ](#error-handling-and-retry-mechanism)
  If a part upload fails, a retry mechanism limits the attempts per chunk, aborting the session after a specified count.
  export const abort \= async (sessionId) \=> {
  const url \= \`/domo/data-files/v1/multipart/${sessionId}/abort\`;
  return await domo.post(url);
  ](#arguments-11)
  The session ID to abort
  ](#http-request-12)
  POST /domo/data-files/v1/multipart/{sessionId}/abort HTTP/1.1
  ](#http-response-12)