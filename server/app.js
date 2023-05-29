const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
var jwt = require('jsonwebtoken');
const secret = 'secret';
var cors = require('cors');

app.use(cors());

dotenv.config({ path: "./config.env" });

PORT = process.env.PORT;
URL = process.env.URL;

app.use(express.json());

// verify a token symmetric
app.use('/posts', (req, res, next) => {

    if (req.headers.authorization) {
        const token = req.headers.authorization;
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                res.status(400).json({
                    status: 'Failed',
                    meassage: err.message
                });
            };
            req.user = decoded.data;
            next();
        });
    } else {
        res.status(400).json({
            status: 'Failed',
            message: 'Not authorized'
        });
    }
});

mongoose.connect(URL)
    .then(() => console.log("db connected"))
    .catch((err) => console.log("no connection"));

app.use('/posts', postRoute);
app.use('/user', userRoute);

app.listen(PORT, console.log(`Server started at port ${PORT}`));