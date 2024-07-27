const express = require('express');
const Crud = require("../../models/Crud-Operation/Crud");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { ERROR_CODE } = require('../../../constant');


// Create Table for CRUD Operation
router.post('/crud/table', async (req, res) => {
    try {
        let crud = new Crud(req.body);
        res.status(200).send(crud)
        console.log("crud",crud)
        crud.save();
    } catch (error) {
        res.status(500).send({ error: ERROR_CODE[1008] });
    }
})


// if Header have authToken allow current page otherwise not allowed
const validateUser = (req, res, next) => {
    // const token = req.header("authToken");
    // var token = req.headers["x-access-token"]
    // console.log("vvvvvvvvvvvvp", req.header("authorization"))
    const token = req.header("Authorization").split(' ')[1];
    console.log("token", token)
    if (!token) {
        return res.status(401).send({ error: 'JWT must be provided' });
      }
    req.token = token;
    next();
}

//  Get all Tables
router.get('/crud/all/tables', validateUser, async (req, res) => {
    try {
        jwt.verify(req.token, "VJSECRETMEOWS", async (err, data) => {
            if(err) {
                res.status(401).send({ error: ERROR_CODE[1000] })
            } else {
                // await Crud.find()
                // .then((result) => {
                //     if(result !== null && result !== undefined) {
                //         console.log("all tables", result)
                //         res.status(200).send(result);
                //     } else {
                //         res.status(500).send({ error : ERROR_CODE[1009]});
                //     }
                // }).catch((error) => {
                //     res.status(500).send({ error: ERROR_CODE[1009] });
                // })

                // *** temp ***
                console.log(req.token)
                console.log("new-ONE", data)
                let accountId = data.accountId;
                console.log("accountId", accountId)

                await Crud.find({accountId})
                .then((result) => {
                    console.log("result", result)
                    if(result !== null && result !== undefined) {
                        res.status(200).send(result)
                    } else {
                        res.status(500).send({ error : ERROR_CODE[1009]});
                    }
                }).catch((error) => {
                    res.status(500).send({ error: ERROR_CODE[1009] });
                })
            }
        })
    } catch(error) {
        res.status(500).send({ error: ERROR_CODE[1008] });
    }
})

// Get by Id
router.get('/crud/table/:id', validateUser, async (req, res) => {
    try {
        jwt.verify(req.token, "VJSECRETMEOWS", async (err, data) => {
            if (err) {
                res.status(401).send({ error: ERROR_CODE[1000] })
                console.log("Errror", err)
            } else {
                await Crud.findById(req.params.id)
                    .then((result) => {
                        // res.status(200).send(result);
                        if(result !== null && result !== undefined) {
                            res.status(200).send(result);
                            console.log("Id-------->", result)
                        } else {
                            res.status(500).send({ error : ERROR_CODE[1009]});
                        }
                    }).catch((error) => {
                        res.status(500).send({ error: ERROR_CODE[1009] });
                    })
            }
        })
    } catch (error) {
        res.status(500).send({ error: ERROR_CODE[1008] });
    }
})

// Delete by Id
router.delete('/crud/table/delete/:id', validateUser, async (req, res) => {
    try {
        jwt.verify(req.token, "VJSECRETMEOWS", async (err, data) => {
            if(err) {
                res.status(401).send({ error: ERROR_CODE[1000] })
            } else {
                await Crud.findByIdAndRemove(req.params.id)
                .then((result) => {
                    if(result !== null && result !== undefined) {
                        res.status(200).send(result);
                    } else {
                        res.status(500).send({ error : ERROR_CODE[1009]});
                    }
                }).catch((error) => {
                    res.status(500).send({ error : ERROR_CODE[1009]});
                })
            }
        })
    } catch (error) {
        res.status(500).send({ error: ERROR_CODE[1008] });
    }
})

// Update by Id
router.put('/crud/table/update/:id', validateUser, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        jwt.verify(req.token, "VJSECRETMEOWS", async (err, data) => {
            if(err) {
                res.status(401).send({ error: ERROR_CODE[1000] })
            } else {
                await Crud.findByIdAndUpdate(id, updatedData)
                .then((data) => {
                    if(data !== null && data !== undefined) {
                        res.status(200).send(data);
                    }
                }).catch((error) => {
                    res.status(500).send({ error: ERROR_CODE[1009]});
                })
            }
        })
    } catch(error) {
        res.status(500).send({ error: ERROR_CODE[1008] });
    }
})



module.exports = router