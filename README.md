[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/IrWObaQs)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12856485&assignment_repo_type=AssignmentRepo)
# Individual Project Phase 2 Daffa Muhammad Fadhil



> API Docs 

# My First Individual Server
My Individual Server Project is a server application that has several end points and will later be used to hiring partner. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

<!-- &nbsp;
```
link ip(external) = http://34.101.76.181
link production = https://server-p2_hacktiv8_fadhild.yoiego.my.id/
``` -->


## RESTful endpoints
### POST /register

> Register before using this web

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name" : "string",
  "email" : "string",
  "password" : "string"
}
```

_Response (201 - Created)_
```
{
    "id" : "integer",
    "email" : "string"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Email is missing"
}
  OR
{
  "message": "Password is missing"
}
```

_Response (500 - Internal Server)_
```
{
  "message": "Internal server error"
}
```
---

### POST /login

> Get acces token for login

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email" : "string",
  "password" : "string"
}
```

_Response (200 - Ok)_
```
{
    "access_token" = "string"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Email is missing"
}
  OR
{
  "message": "Password is missing"
}
```
_Response (401 - Bad Request)_
```
{
  "message": "Invalid email/password"
}
```

_Response (500 - Internal Server)_
```
{
  "message": "Internal server error"
}
```
---
### GET /teams

> Get All Teams

_Request Header_
```
{
  "Authorization": "string"
}
```

_Request Body_
```
not needed
```

_Response (200 - Ok)_
```
[
    {
    "id": "integer,
    "name": "string",
    "logo": "string",
    "win": "integer",
    "draw":"integer",
    "lose": "integer",
    "goal_average": "integer",
    "clean_sheet": "integer",
    "failed_to_score": "integer",
    "authorId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
 },
 ...
 ]
```

_Response (500 - Internal Server)_
```
{
  "message": "Internal server error"
}
```
---

### POST /teams

> create new team

_Request Header_
```
{
  "Authorization": "string"
}
```

_Request Body_
```
{
    "id": "integer,
    "name": "string",
    "logo": "string",
    "win": "integer",
    "draw":"integer",
    "lose": "integer",
    "goal_average": "integer",
    "clean_sheet": "integer",
    "failed_to_score": "integer",
    "authorId": "integer",
 }
```

_Response (201 - created)_
```
{
    "id": "integer,
    "name": "string",
    "logo": "string",
    "win": "integer",
    "draw":"integer",
    "lose": "integer",
    "goal_average": "integer",
    "clean_sheet": "integer",
    "failed_to_score": "integer",
    "authorId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
 }
```
_Response (400 - Bad Request)_
```
{
  "message": "Name is required"
}
    OR
{
  "message": "Win is required"
}
    OR
{
  "message": "Lose is required"
}
    OR
{
  "message": "Clean Sheet is required"
}
    OR
{
  "message": "Average Goal is required"
}
    OR
{
  "message": "Fail to Score is required"
}
    OR
{
  "message": "Author Id is required"
}
{
  "message": "Win must be a number"
}
    OR
{
  "message": "Lose must be a number"
}
    OR
{
  "message": "Clean Sheet must be a number"
}
    OR
{
  "message": "Average Goal must be a number"
}
    OR
{
  "message": "Fail to Score must be a number"
}

```

_Response (500 - Internal Server)_
```
{
  "message": "Internal server error"
}
```
---
### GET /team/:id

> Get team by id

_Request Header_
```
{
  "Authorization": "string"
}
```

_Request Params_
```
{
    "id" : "integer"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "id": "integer,
    "name": "string",
    "logo": "string",
    "win": "integer",
    "draw":"integer",
    "lose": "integer",
    "goal_average": "integer",
    "clean_sheet": "integer",
    "failed_to_score": "integer",
    "authorId": "integer",
 }
```
_Response (404 - Not Found)_
```
{
  "message": "Error not found"
}

```
_Response (500 - Internal Server)_
```
{
  "message": "Internal server error"
}
```
---

### PUT /teams/:id

> Update team by id

_Request Header_
```
{
  "Authorization": "string"
}
```

_Request Params_
```
{
    "id" : "integer"
}
```

_Request Body_
```
{
    "id": "integer,
    "name": "string",
    "logo": "string",
    "win": "integer",
    "draw":"integer",
    "lose": "integer",
    "goal_average": "integer",
    "clean_sheet": "integer",
    "failed_to_score": "integer",
    "authorId": "integer",
 }
```

_Response (200 - OK)_
```
{
    "id": "integer,
    "name": "string",
    "logo": "string",
    "win": "integer",
    "draw":"integer",
    "lose": "integer",
    "goal_average": "integer",
    "clean_sheet": "integer",
    "failed_to_score": "integer",
    "authorId": "integer",
 }
```
_Response (400 - Bad Request)_
```
{
  "message": "Name is required"
}
    OR
{
  "message": "Win is required"
}
    OR
{
  "message": "Lose is required"
}
    OR
{
  "message": "Clean Sheet is required"
}
    OR
{
  "message": "Average Goal is required"
}
    OR
{
  "message": "Fail to Score is required"
}
    OR
{
  "message": "Author Id is required"
}
{
  "message": "Win must be a number"
}
    OR
{
  "message": "Lose must be a number"
}
    OR
{
  "message": "Clean Sheet must be a number"
}
    OR
{
  "message": "Average Goal must be a number"
}
    OR
{
  "message": "Fail to Score must be a number"
}

```
_Response (404 - Not Found)_
```
{
  "message": "Error not found"
}

```
_Response (500 - Internal Server)_
```
{
  "message": "Internal server error"
}
```
---
### DELETE /teams/:id

> Delete team by id

_Request Header_
```
{
  "Authorization": "string"
}
```

_Request Params_
```
{
    "id" : "integer"
}
```

_Request Body_
```
not needed
```

_Response (200 - Ok)_
```
{
   "message" : "Team (name of team) succes deleted from list "
}
```
_Response (404 - Not Found)_
```
{
  "message": "Error not found"
}

```
_Response (500 - Internal Server)_
```
{
  "message": "Internal server error"
}
```
---
### PATCH /user/payment/midtrans

> Update imgUrl using file

_Request Header_
```
{
  "Authorization": "string"
}
```

_Request Params_
```
not needed
```

_Request Body (multiform/data)_
```
{
  midtrans: "string"
}
```

_Response (200 - OK)_
```
{
   "message" : "Payment succesfull"
}
```
_Response (400 - Bad Request)_
```
{
  "message": "payment failed"
}

```

_Response (500 - Internal Server)_
```
{
  "message": "Internal server error"
}
```
---
