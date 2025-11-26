# Groups API

> **Source:** https://developer.domo.com/portal/2hwa98wx7kdm4-groups-api
> The Groups API is a Read Only set of endpoints available to retrieve information about the various groups that belong to the instance in which a Custom App is published. This enables your application to take advantage of knowing the groups that individual users could potentially belong to and alter their user experience accordingly.

### [

All Groups
](#all-groups)
Retrieve a list of details for all groups of an instance.

#### [

Code Example
](#code-example)
domo.get(\`/domo/groups/v1\`)
.then(data => console.log(data))
HTTP Request
](#http-request)
GET /domo/groups/v1
Content-Type: application/json
Accept: application/json
HTTP Response
](#http-response)
HTTP/1.1 200 OK
\[
{
"id": 1051417,
"name": "New Users",
"type": "adHoc",
"userIds": \[\],
"created": "2018-10-03T23:26:04.000+0000",
"memberCount": 15210,
"active": true,
"default": true
},
"id": 1085275,
"name": "Power Users",
"type": "directory",
"created": "2018-11-15T15:21:27.000+0000",
"memberCount": 2265,
"default": false
}
\]
Group by Id
](#group-by-id)
Retrieve the details for an individual group given its Id.
](#code-example-1)
domo.get(\`/domo/groups/v1/1051417\`)
.then(data => console.log(data))
](#http-request-1)
GET /domo/groups/v1/{groupId}
Arguments
](#arguments)
Property Name
Type
Required
Description
groupId
Long
The ID of the desired group
](#http-response-1)
{
"id": 1051417,
"name": "New Users",
"type": "adHoc",
"userIds": \[\],
"created": "2018-10-03T23:26:04.000+0000",
"memberCount": 15210,
"active": true,
"default": true
}
Group by Name
](#group-by-name)
Retrieve the details for an individual group given its name.
](#code-example-2)
domo.get(\`/domo/groups/v1/name?groupName=New Users\`)
](#http-request-2)
GET /domo/groups/v1/name?groupName={groupName}
](#arguments-1)
groupName
String
The name of the desired group
](#http-response-2)
Groups by User
](#groups-by-user)
Retrieve the details for an all groups that an individual user belongs to, given a user Id. You can obtain the user Id of the current user using the `domo` object (provided via the `domo.js` javascript file that is included with all apps initialized by the Domo Apps CLI) as demonstrated in the code example below.
](#code-example-3)
domo.get(\`/domo/groups/v1/user/${domo.env.userId}\`)
](#http-request-3)
GET /domo/groups/v1/user/{userId}
](#arguments-2)
userId
The id of the desired user
](#http-response-3)