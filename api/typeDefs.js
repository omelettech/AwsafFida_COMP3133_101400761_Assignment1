const {gql} = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    name:String
    username: String!
    email: String!
    token: String
    password:String
  }
  
   type AuthPayload {
    token: String!
    user: User!
  }

  type Employee {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
    position: String!
    salary: Float!
    department: String!
    date_of_joining: String
  }

 type Query {
    login(username: String, email: String, password: String!): AuthPayload
    getAllEmployees: [Employee]
    searchEmployeeById(eid: ID!): Employee
    searchEmployeesByDesignationOrDepartment(designation: String, department: String): [Employee]
  }
  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    addEmployee(
        firstname: String
        lastname: String
        email: String
        gender: String
        position: String
        salary: Float
        date_of_joining: String
        department: String
        employee_photo: String
    ): Employee
    updateEmployee(eid: ID!, input: EmployeeInput!): Employee
    deleteEmployee(eid: ID!): String
  }
  
   input EmployeeInput {
    firstname: String
    lastname: String
    email: String
    gender: String
    position: String
    salary: Float
    date_of_joining: String
    department: String
    employee_photo: String
  }

`;

module.exports = typeDefs;
