const express = require('express');
const session = require('express-session');
const {passport} = require('./passportConfig');
const User = require('./models/User');
const Customer = require('./models/Customer');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, './dashboard/build')));

app.use(express.json());

app.use(bodyParser.json());

app.use(session({
    secret: "abcdefg",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.post('/api/login', passport.authenticate('local'), (req, res) => {
    res.send("Logged in successfully");
})

app.post('/api/register', async (req, res) => {
    try{
        const {username,password} = req.body;
        const newUser = new User({username, password});
        await newUser.save();
        res.send('User registered successfully');
    }catch(error){
        res.status(500).send(error.message);
    }
});

app.get('/api/logout', (req, res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
      });
    res.send('Logged out successfully');
})

app.post('/api/add_new_customer', async (req,res)=>{
    try
    {
        const {first_name,last_name,email,phone,address,city,state,postal} = req.body;
        let created_by = req.user.username
        const newCustomer = new Customer({first_name,last_name,email,phone,address,city,state,postal, created_by})
        await newCustomer.save();
        res.send('Added new customer');
    }
    catch(error)
    {
        res.status(500).send(error.message);
    }
})

app.get('/api/customers', async (req,res)=>{
    try
    {
        const customers = await Customer.find();
        res.status(200).json(customers);
    }
    catch(error)
    {
        res.status(500).json({error:"Server error"});
    }
})

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});   