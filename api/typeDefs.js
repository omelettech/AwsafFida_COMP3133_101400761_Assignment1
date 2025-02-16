const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String
  }

  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    position: String!
    salary: Float!
    department: String!
    date_of_joining: String
  }

  type Query {
    login(email: String!, password: String!): User
    getAllEmployees: [Employee]
    searchEmployeeById(eid: ID!): Employee
    searchEmployeesByCriteria(designation: String, department: String): [Employee]
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    addEmployee(
      first_name: String!
      last_name: String!
      email: String!
      position: String!
      salary: Float!
      department: String!
      date_of_joining: String
    ): Employee
    updateEmployee(eid: ID!, first_name: String, last_name: String, email: String, position: String, salary: Float, department: String): Employee
    deleteEmployee(eid: ID!): String
  }
`;

module.exports = typeDefs;
