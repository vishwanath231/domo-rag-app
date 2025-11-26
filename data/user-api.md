# User API

> **Source:** https://developer.domo.com/portal/n7f7swo7h29wg-user-api

### [

All Users
](#all-users)
Information for all users can be retrieved using the following endpoint:
GET /domo/users/v1?includeDetails={true|false}&limit={int}&offset={int}

#### [

Details
](#details)

- includeDetails: Include all user information
- limit: The number of user records to return
- offset: Get users starting with this offset in the list of users
- returns (includeDetails=false)
  \[
  {
  "id": 1,
  "displayName": "User One",
  "avatarKey": "/domo/avatars/v1/avatars/dev/86/420BB31EE19FDDBA8096F19ACD4C4D.jpg",
  "role": "Admin"
  },
  "id": 3,
  "displayName": "User Two",
  "avatarKey": "/domo/avatars/v1/avatars/dev/86/510BB31EE19FDDBA8046F18ACD3C5D.jpg",
  "role": "Privileged"
  ...
  \]
- returns (includeDetails=true)
  "role": "Admin",
  "detail": {
  "title": "",
  "email": "userone@domo.com",
  "phoneNumber": "",
  "employeeNumber": 1,
  "pending": false
  }
  "id": 2,
  "role": "Privileged",
  "email": "usertwo@domo.com",
  "employeeNumber": 2,
  Single User
  ](#single-user)
  Information for a single user can be retrieved using the following endpoint:
  GET /domo/users/v1/:userId?includeDetails={true|false}
  ](#details-1)
- userId: The id (long) of the desired user. Note: The current user Id is supplied via by the domo.js library as part of the domo.env object
  {
  "id": 1,
  "displayName": "User One",
  "avatarKey": "/domo/avatars/v1/avatars/dev/86/420BB31EE19FDDBA8096F19ACD4C4D.jpg",
  "role": "Admin"
  }
  "role": "Admin",
  "detail": {
  "title": "",
  "email": "userone@domo.com",
  "phoneNumber": "",
  "employeeNumber": 1,
  "pending": false
  }
  User Avatar
  ](#user-avatar)
  User avatars are available at the avatars endpoint
  GET /domo/avatars/v2/{entityType}/{entityId}?size={size}&defaultForeground={color}&defaultBackground={color}&defaultText={text}
  Valid sizes (pixels)
- 100: 100 X 100
- 300: 300 X 300
  HTTP Request
  ](#http-request)
  GET /domo/avatars/v2/USER/846578099?size=300&defaultForeground=fff&defaultBackground=000&defaultText=D
  Code Example
  ](#code-example)
  <img
  src\="/domo/avatars/v2/USER/846578099?size=300&defaultForeground=fff&defaultBackground=000&defaultText=D"
  alt\="User Avatar"
  />