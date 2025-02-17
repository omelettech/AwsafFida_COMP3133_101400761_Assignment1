const User = require('../models/User');
const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        login: async (_, { username, password }) => {
            console.log(username,password)
            const user = await User.findOne({ username });
            if (!user) throw new AuthenticationError('User not found');

            const validPassword = await bcrypt.compare(password, user.password);
            console.log(await bcrypt.hash(password,10))
            console.log(user.username)

            if (!validPassword) throw new AuthenticationError('Invalid credentials possibly wrong password');

            // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { user };
        },
        getAllEmployees: async () => await Employee.find(),
        searchEmployeeById: async (_, { eid }) => await Employee.findById(eid),
        searchEmployeesByDesignationOrDepartment: async (_, { designation, department }) => {
            const query = {};
            if (designation) query.designation = designation;
            if (department) query.department = department;
            return await Employee.find(query);
        },
    },

    Mutation: {
        signup: async (_, { username, email, password }) => {
            // const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, email, password: password });
            return await newUser.save();
        },
        addEmployee: async (_, args) => {
            const newEmployee = new Employee({ ...args, created_at: new Date(), updated_at: new Date() });
            return await newEmployee.save();
        },
        updateEmployee: async (_, { eid, input }) => {
            return await Employee.findByIdAndUpdate(eid, { ...input, updated_at: new Date() }, { new: true });
        },
        deleteEmployee: async (_, { eid }) => {
            await Employee.findByIdAndDelete(eid);
            return 'Employee deleted successfully';
        },
    },
};

module.exports = resolvers;