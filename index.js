const express = require("express")
const path = require('path');
const User=require('./User')

const hostname = 'localhost';
const port = 3000;
const app = express()
app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});