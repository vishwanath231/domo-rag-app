# FileSet API (BETA)

> **Source:** https://developer.domo.com/portal/7e8654dedb1c8-file-set-api-beta
> This API reference documents the endpoints for managing FileSets and Files in Domo from within a Domo app.
> **BETA:** This API is currently in BETA and is subject to change. Endpoints, request/response formats, and functionality may change without notice. **Note:** All code examples below are tested and match the working Domo app UI. Use `domo.*` methods for all API calls except File upload/download, which require `fetch` for binary or FormData support.

## [

Get File by Path
](#get-file-by-path)
**Method:** `GET`  
**Endpoint:** `/domo/files/v1/filesets/{filesetId}/path?path={filePath}`
**Path Parameters:**
Parameter
Type
Required
Description
filesetId
String
Yes
The ID of the FileSet
path
The path to the File within the FileSet
Javascript (domo.get)
Javascript (fetch)
domo
.get(
\`/domo/files/v1/filesets/${filesetId}/path?path=${encodeURIComponent(
filePath,
)}\`,
)
.then((result) \=> console.log(result))
.catch((error) \=> console.error(\`Error: ${error}\`));
**Response:**
{
  "id": "00000000-0000-0000-0000-000000000001",
  "path": "rules.txt",
  "name": "rules.txt",
  "fileType": "TEXT",
  "contentType": "text/plain",
  "size": 12345,
  "hash": "fakehash00000000000000000000000000000000000000000000000000000000000001",
  "hashAlgorithm": "SHA\_256\_HEX",
  "downloadUrl": null,
  "created": "2025-01-01T00:00:00.000Z",
  "createdBy": 111111111,
  "connectorKey": null,
  "indexStatus": null,
  "indexReason": null
}
Get File by Id
](#get-file-by-id)
**Endpoint:** `/domo/files/v1/filesets/{filesetId}/files/{fileId}`
fileId
The ID of the File
  .get(\`/domo/files/v1/filesets/${filesetId}/files/${fileId}\`)
"id": "00000000-0000-0000-0000-000000000002",
"hash": "fakehash00000000000000000000000000000000000000000000000000000000000002",
"downloadUrl": "/domo/files/v1/filesets/00000000-0000-0000-0000-000000000010/files/00000000-0000-0000-0000-000000000002/download",
Download File by Id
](#download-file-by-id)
**Endpoint:** `/domo/files/v1/filesets/{filesetId}/files/{fileId}/download`

> **Note:** Use `fetch` for File downloads. `domo.get` does not support binary downloads.
> fetch(\`/domo/files/v1/filesets/${filesetId}/files/${fileId}/download\`)
> .then((response) \=> response.blob())
> .then((blob) \=> {

    const url \= window.URL.createObjectURL(blob);
    const a \= document.createElement('a');
    a.href \= url;
    a.download \= 'downloaded-file'; // Set your filename
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

})

- Returns the File contents as a download (binary/text stream).
  Query Files
  ](#query-files)
  **Method:** `POST`  
  **Endpoint:** `/domo/files/v1/filesets/{filesetId}/query`
  **Request Body Parameters:**
  query
  Text to search for in Files
  directoryPath
  No
  Limit search to a specific directory
  topK
  Integer
  Maximum number of results to return
  Javascript (domo.post)
  .post(\`/domo/files/v1/filesets/${filesetId}/query\`, {
  query: 'search for text in documents', // Required: Text to search for in files
  directoryPath: 'reports/quarterly', // Optional: Limit search to specific directory
  topK: 5, // Optional: Maximum number of results to return
  \[
  {
  "id": "00000000-0000-0000-0000-000000000003",
  "path": "rules.txt",
  "name": "rules.txt",
  "fileType": "TEXT",
  "contentType": "text/plain",
  "size": 12345,
  "created": "2025-01-01T00:00:00.000Z",
  "createdBy": 111111111
  }
  \]
  Upload File
  ](#upload-file)
  **Endpoint:** `/domo/files/v1/filesets/{filesetId}/files`
  > **Note:** Use `fetch` for file uploads. Always set the file content type to `text/plain` for text files, as in the app code.
  > const file \= fileInput.files\[0\];
  > const formdata \= new FormData();
  > formdata.append(
  > 'file',
  > new File(\[file\], file.name, { type: 'text/plain' }),
  > file.name,
  > );
  > formdata.append('createFileRequest', JSON.stringify({ directoryPath: '' }));
  > fetch(\`/domo/files/v1/filesets/${filesetId}/files\`, {
  method: 'POST',
  body: formdata,
})
  .then((response) \=> response.json())
  "id": "00000000-0000-0000-0000-000000000004",
  "createdBy": 111111111
Search Files in FileSet
](#search-files-in-fileset)
**Endpoint:** `/domo/files/v1/filesets/{filesetId}/files/search`
**Query Parameters:**
Filter Files by specific directory path
immediateChildren
Boolean
If true, returns only immediate children of directory (default: false)
limit
Maximum number of results (default: 100)
next
Pagination token for fetching next set of results
fieldSort
Array
Sort options for results. Array of FieldSort Objects.
filters
Filter criteria for the search. Array of Filter Objects.
dateFilters
Date-based filter criteria. Array of DateFilter Objects.
**Filter Object Properties:**
Property
field
Field name to filter on (e.g., 'name', 'description')
value
Values to match against
not
If true, inverts the filter match
operator
Operation type: 'EQUALS', 'GREATER\_THAN', 'LESS\_THAN', 'IN', 'LIKE', etc.
**FieldSort Object Properties:**
Field name to sort by
order
Sort direction: 'ASC' or 'DESC'
**DateFilter Object Properties:**
Field name for date filter (e.g., 'created')
start
Start timestamp as ISO string
end
End timestamp as ISO string
If true, inverts the date filter match
// Example 1: List all files
  .post(\`/domo/files/v1/filesets/${filesetId}/files/search\`, {})
  > .then((result) \=> console.log(result.files))
  > // Example 2: Advanced search with directory path and filters
  > .post(
      \`/domo/files/v1/filesets/${filesetId}/files/search?directoryPath=reports&limit=20\`,
      {
        // Sort by file name in ascending order
        fieldSort: \[
          {
            field: 'name',
            order: 'ASC',
          },
        \],
        // Filter files by name
        filters: \[
            value: \['.pdf'\],
            operator: 'LIKE',
        // Filter files created in past 30 days
        dateFilters: \[
            field: 'created',
            start: new Date(Date.now() \- 30 \* 24 \* 60 \* 60 \* 1000).toISOString(), // 30 days ago as ISO string
            end: new Date().toISOString(), // Current time as ISO string
      },
  "files": \[
  "id": "00000000-0000-0000-0000-000000000005",
  "path": "reports/quarterly-report.pdf",
  "name": "quarterly-report.pdf",
  "fileType": "FILE",
  "contentType": "application/pdf",
  "size": 234567,
  "created": "2025-06-15T00:00:00.000Z",
  "createdBy": 111111111
  }
  \],
  "pageContext": {
  "next": "eyJpZCI6IjEyMzQ1Njc4OTAifQ=="
  Delete Files by Path
  ](#delete-files-by-path)
  **Method:** `DELETE`  
  filePath
  Javascript (domo.delete)
  .delete(
  .then((result) \=> {
  if (result \=== 1 || (result && result.status \=== 'success')) {
  console.log('File deleted successfully.');
  } else {
  console.log(result);
  "status": "success",
  "message": "File deleted successfully."
  Delete File by Id
  ](#delete-file-by-id)
  .delete(\`/domo/files/v1/filesets/${filesetId}/files/${fileId}\`)
  Search FileSets
  ](#search-filesets)
  **Endpoint:** `/domo/files/v1/filesets/search`
  offset
  Pagination offset (default: 0)
  > **Note:** To list all FileSets, send an empty object as the body. To filter, provide filter parameters in the body.
  > // Example 1: List all FileSets (empty search)
  > .post('/domo/files/v1/filesets/search', {})
  > .then((result) \=> console.log(result.fileSets))
  > // Example 2: Advanced search with filters and sorting
  > .post('/domo/files/v1/filesets/search', {
      // Sort by name in ascending order
      fieldSort: \[
        {
          field: 'name',
          order: 'ASC',
        },
      \],
      // Filter FileSet by name containing "Marketing"
      filters: \[
          value: \['Marketing'\],
          operator: 'LIKE',
      // Filter FileSet created between two dates
      dateFilters: \[
          field: 'created',
          start: '2025-06-01T19:23:55.156Z', // June 1, 2024
          end: '2025-06-30T19:23:55.156Z', // June 30, 2024
  "fileSets": \[
  "id": "00000000-0000-0000-0000-000000000010",
  "name": "Sample FileSet",
  "description": "A sample FileSet for demonstration purposes.",
  "created": "2025-01-01T00:00:00.000Z",
  \]
  Create FileSet
  ](#create-fileset)
  **Endpoint:** `/domo/files/v1/filesets`
  name
  The name of the FileSet
  accountId
  The account ID to associate (nullable)
  connectorContext
  Object
  Connector context for the FileSet (nullable). ConnectorContext Object.
  description
  Description for the FileSet
  **ConnectorContext Object Properties:**
  connector
  The connector key
  relativePath
  Relative path for the connector (nullable)
  .post('/domo/files/v1/filesets', {
  name: 'Sample FileSet',
  description: 'A sample FileSet for demonstration purposes.',
  // accountId: 12345, // Optional
  // connectorContext: { connector: 'S3', relativePath: 'bucket/path' }, // Optional
  "id": "00000000-0000-0000-0000-000000000012",
  "name": "Sample FileSet",
  "description": "A sample FileSet for demonstration purposes.",
  Get FileSet by Id
  ](#get-fileset-by-id)
  **Method:** `GET` **Endpoint:** `/domo/files/v1/filesets/{filesetId}`
  .get(\`/domo/files/v1/filesets/${filesetId}\`)
  "id": "00000000-0000-0000-0000-000000000013",
Update FileSet by Id
](#update-fileset-by-id)
**Endpoint:** `/domo/files/v1/filesets/{filesetId}`
The new name for the FileSet
The new description for the FileSet
  .post(\`/domo/files/v1/filesets/${filesetId}\`, {
  name: 'Updated FileSet Name', // Optional: New name for the FileSet
  description: 'Updated description.', // Optional: New description
  "id": "00000000-0000-0000-0000-000000000014",
  Delete FileSet by Id
  ](#delete-fileset-by-id)
  .delete(\`/domo/files/v1/filesets/${filesetId}\`)
  "message": "FileSet deleted successfully."