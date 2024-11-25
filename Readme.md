# User Management Endpoints
1. POST /user/signup <br>
   Description: Allows users to create a new account.
    
    Request Method: POST <br>
    URL: /user/signup <br>
    Request Body (JSON):
    
    
        {"username": "new_user",
        "email": "newuser@example.com",
        "password": "password123"}

2. POST /user/login <br>
   Description: Allows users to log in and access the system.
    
    Request Method: POST <br>
    URL: /user/login <br>
    Request Body (JSON):
    
        {"email": "user@example.com",
        "password": "password123"}
<hr>

# Employee Management Endpoints

1. GET /emp/employee <br>
   Description: Allows users to retrieve a list of all employees.
    <br>
   Request Method: GET <br>
   URL: /emp/employees <br>
   Response Body (JSON):


    [
    {
        "id": 1,
        "name": "John Smith",
        "position": "Developer",
        "email": "john.smith@example.com",
        "phone": "123-456-7890"
    },
    {
        "id": 2,
        "name": "Jane Doe",
        "position": "Manager",
        "email": "jane.doe@example.com",
        "phone": "987-654-3210"
    }
    ]


2. POST /emp/employees <br>
   Description: Allows users to create a new employee record.
    <br>
   Request Method: POST <br>
   URL: /user/login <br>
   Request Body (JSON):

        {
       "name": "John Smith",
       "position": "Developer",
       "email": "john.smith@example.com",
       "phone": "123-456-7890"
        }

<br>
3. GET /emp/employees/{eid}
    <br>
Description: Allows users to retrieve details of a specific employee by their ID.   <br>
   Request Method: GET <br>
   URL: /emp/employees/{eid}
 <br>
<br>
4. PUT /emp/employees/{eid} <br>
Description: Allows users to update an employee’s details.
<br>
URL: /emp/employees/{eid}
<br>
Request Body (JSON):
    
    {
    "name": "John Smith",
    "position": "Lead Developer",
    "email": "john.smith@example.com",
    "phone": "123-456-7890"
    }
<br>
5. DELETE /emp/employees?eid={eid}
Request <br>
Method: DELETE <br>
URL: /emp/employees?eid={eid} <br>
Parameters <br>
eid: The employee ID to delete. <br>

