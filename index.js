const express = require("express");
// import cors
const cors = require("cors");
// yaha par hum connection file ko import krenge
require('./db/config');
// yaha par hum schema model file ko import krenge
const User = require('./db/User');
const { reset } = require("nodemon");
const app = express();

// Regsiter API 
// uske bad hum jese hi api se data ko post krenge uske bad hum respone denge.
app.use(express.json());
app.use(cors());
//uske bad hum route banaege route woh hota hai jo hamari api ka link hai
app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    // aur yaha par hum aapni api call krenge
    // ab hume yaha password nh return krna 
    result = result.toObject();
    delete result.password;
    resp.send(result);
})

//Login Api
app.post("/login", async (req, resp) => {
    //uske bad yaha par hum email aur password dono ke lie condition lagaenge k agr user email aur password dono hi wrong dal raha hai to hum use kye response den.
    if (req.body.password && req.body.email) {
        //yaha par hum database se aik hi user ko find krenge lekin hume password find nh krna
        let user = await User.findOne(req.body).select('-password');

        // agar user galat email type kren to uske lye hum check krsakte hai aur koi aesa response send 
        // krsakte hai jise user ko pata chalen k user apna email sahi add nh krha hai 
        if (user) {
            resp.send(user);
        }
        else {
            resp.send({ result: 'No User Found' });
        }
    }
    else {
        resp.send({ result: 'No User Found' })
    }

});

app.listen(5000);

