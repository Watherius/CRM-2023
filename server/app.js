const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const autoRouter = require('./routes/autoRouter')
require('dotenv').config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true // Enable sending cookies and other credentials with the request
  }));
app.use('/app', autoRouter);

const db = require("./models");
const User = db.user;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

db.sequelize.sync({ alter: true })
    .then(() => {
        console.log("Connected DB.");
    })
    .catch((err) => {
        console.log("Failed to connected DB: " + err.message);
    });

app.get('/', async (req, res) => {
    try {
        let user = await User.create(req.body);
        console.log(user.dataValues)
        res.status(201).json({
            user, 
            message: 'New record was created!',
        });        
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            res.status(400).json({ Error: error.message });
        } else {
            res.status(500).json({ Error: 'Internal server error' });
        }

        console.log(`Error get request ${error}`)
    }
});
