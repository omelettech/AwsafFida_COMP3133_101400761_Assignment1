const express = require("express")
const path = require('path');
const User=require('./User')
const bcrypt = require("bcrypt");

const hostname = 'localhost';
const port = 3000;
const app = express()
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
//User management
app.post("/api/v1/user/signup", async (req, res) => {
    const {username, email, password} = req.body
    if (!(username && email && password)){
            //Checks if all 3 fields are filled
            return res.status(400).json({ message: 'Email username must be unique AND all 3 fields required' });

    }
    try {
        if (await User.findOne({email})) {
            return  res.status(409).json({ message: 'User with this email already exists.' });
        }else{
            const newUser = new User({username,email,password})
            await newUser.save();
            return res.status(201).json({ message: 'User created successfully!' });
        }
    }catch (err){
        console.error(err)
        return res.status(500).json({message:"Error creating user"})
    }
})
app.post('api/v1/user/login', async (req, res) => {
    const {email, password} = req.body
    if (!(email && password)) {
        //Checks if all 3 fields are filled
        return res.status(400).json({message: 'all fields required'});
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        if(!(await bcrypt.compare(password, user.password))){
            //match password with database pass
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        // If login is successful
        return res.status(200).json({ message: 'Login successful!' });

    }catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: 'Internal server error.' });
    }
})
//Employee management
// app.get("/api/v1/emp/employees", (req, res) => {
//
// })

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});