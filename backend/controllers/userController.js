const bcrypt = require('bcrypt')
const User = require('../models/userModel')

//to register a new user
//const createUser = async(req,res) => {...}

const registerUser = async (req, res) => {

    try 
        {
        const {username, password} = req.body;
    
        if(!username || !password) {
            return res.status(400).json({error: 'Username and password are required'})
        }

        const existingUser = await User.findOne({username})  //find  if there is already a user with that username
            if(existingUser) {
                return res.status(400).json({error: 'User already exists'}) // notify the error
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = new User({
                username,
                password: hashedPassword,
                role: 'User'
            })
            await newUser.save() // save new user in database and return new user object in database 

                res.status(201).json({message: 'User registered successfully'})
            }    catch(error) {
                console.error('Error registering user:', error.message)
                res.status(500).json({error: 'Internal Server Error'}) //if it is the server error
            }
}

module.exports = {
    registerUser
}