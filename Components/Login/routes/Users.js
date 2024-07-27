const express = require('express');
const User = require("../models/User");
const { ERROR_CODE, INFO_CODE, regexSpecialChar, regexEmail } = require('../../constant');
const router = express.Router();
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');



// User Sign Up
router.post('/signup', async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            res.status(401).send({ error: INFO_CODE[2000] })
        }
        if (userName.match(regexSpecialChar)) {
            res.status(401).send({ error: ERROR_CODE[1006] })
        }
        if (!email.match(regexEmail)) {
            res.status(401).send({ error: ERROR_CODE[1007] })
        }
        if (password.length < 6) {
            res.status(401).send({ error: INFO_CODE[2002] })
        }
        // let accountId: mongoose.Types.ObjectId();
        // var accountId = new mongoose.mongo.ObjectId();
        // console.log("newId", accountId)
        user = new User({ userName, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt); //here hash the password with bcrypt
        res.status(200).send(user);
        console.log(user)
        user.save();
    } catch (error) {
        res.status(500).send({ error: ERROR_CODE[1001] });
    }
})

// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            res.status(401).send({ error: ERROR_CODE[1002] });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).send({ error: ERROR_CODE[1003] });
        }
        var accountId = user._id.toString();
        var userToken = jwt.sign({ email: user.email, password: user.password, accountId }, 'VJSECRETMEOWS', { expiresIn: "24h" });
        res.header('authToken', userToken);
        res.status(200).send({ message: INFO_CODE[2001], userToken })
    } catch (error) {
        res.status(500).send({ error: ERROR_CODE[1004] })
    }
})

// Forget Password
router.put('/signup/reset/:id', async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        let user = await User.findOne({ userName, email });
        if (!user) {
            res.status(401).send({ error: ERROR_CODE[1002] });
        } else {
            if (password.length < 6) {
                res.status(401).send({ error: INFO_CODE[2002] });
            }
            let resetId = await User.findByIdAndUpdate(req.params.id, { password });
            const salt = await bcrypt.genSalt(10);
            resetId.password = await bcrypt.hash(password, salt);
            res.status(200).send(resetId);
            resetId.save();
        }
    } catch (error) {
        res.status(500).send({ error: ERROR_CODE[1004] })
    }
})

// if Header have authToken allow current page otherwise not allowed
const validateUser = (req, res, next) => {
    const token = req.header("Authorization").split(' ')[1];
    console.log("aaaaaaaaaaaa", token)
    if (!token) {
        return res.status(401).send({ error: 'JWT must be provided' });
    }
    req.token = token;
    next();
}

// GET all User
router.get('/all/users', validateUser, async (req, res) => {
    try {
        jwt.verify(req.token, "VJSECRETMEOWS", async (err, data) => {
            if (err) {
                res.status(401).send({ error: ERROR_CODE[1000] })
            } else {
                // const data = await User.find().select(['-password', '-_id']);
                const data = await User.find().select(['-password']);
                res.status(200).send(data);
            }
        })
    } catch (error) {
        res.status(500).send({ error: ERROR_CODE[1004] })
    }
})

// GET User by Id
router.get('/user/:id', validateUser, async (req, res) => {
    console.log("aaaaaaaaaaaa", req.token)
    try {
        jwt.verify(req.token, 'VJSECRETMEOWS', async (err, data) => {
            if (err) {
                res.status(401).send({ error: ERROR_CODE[1000] })
            } else {
                await User.findById(req.params.id).select(['-password'])
                    .then((result) => {
                        res.status(200).send(result)
                    }).catch((error) => {
                        res.status(400).send({
                            error: ERROR_CODE[1000]
                        })
                    })
            }
        })
    } catch (error) {
        res.status(500).send({
            error: ERROR_CODE[1004]
        })
    }
})

// Update User by Id
router.put('/update/user/:id', validateUser, async (req, res) => {
    try {
        console.log("req-to", req.token)
        const id = req.params.id;
        const updatedData = req.body;
        console.log("bbbb", updatedData)

        jwt.verify(req.token, 'VJSECRETMEOWS', async (err, data) => {
            if (err) {
                res.status(401).send({ error: ERROR_CODE[1000] })
            } else {
                await User.findByIdAndUpdate(id, updatedData)
                    .then((response) => {
                        if (response) {
                            console.log("vvvvv", response)
                            res.status(200).send(response)
                        }
                    }).catch((error) => {
                        res.status(500).send({
                            error: ERROR_CODE[1009]
                        })
                    })
            }
        })
    } catch (error) {
        res.status(500).send({
            error: ERROR_CODE[1004]
        })
    }
})


module.exports = router