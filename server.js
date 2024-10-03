const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const user = require("./Components/Login/routes/Users");

const crud = require("./Components/Login/routes/Crud-Operation/Crud");
// const morgan = require('morgan');
const app = express();

const nodemailer = require('nodemailer');

require('dotenv').config();

// middleware
const corsOptions = {
    origin: "http://localhost:3000"
}

// app.use(morgan('start'));
app.use(bodyParser.json({ limit: '20mb' })); // Limit is for payload (e.g : When we upload high size file or image)
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
// app.use(cors());
app.use(cors(corsOptions));

// Connecting MongoDB
mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then((response) => {
    console.log("Database Connected Successfully");
    const PORT = process.env.PORT | 8001;
    app.listen(PORT, (req, res) => {
        console.log("Welcome VJ's Portfolio app");
    })
}).catch((error) => {
    console.log("Error", error)
})

// For Registration
app.use("/", user);

// For Task page
app.use('/task', crud)

// app.listen(process.env.PORT, (req, res) => {
//     console.log("Welcome VJ's Portfolio app");
// })

// Handling Error
process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`)
})
