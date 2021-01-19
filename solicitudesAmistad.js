const express = require("express");
const router = express.Router();
const cifrarContrasenia = require("./cifrarContrasenia")
const bcrypt = require("bcrypt");

router.post("/", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.usuario;

    let usuarioSolicita


    db.collection("users").find().toArray(function(err, arrayUsuario) {
        if (err !== null) {
            res.send({ mensaje: "Ha habido un error" });
        } else {

            res.send(arrayUsuario)

        }
    });
});

router.put("/aceptar", function(req, res) {
    let db = req.app.locals.db

    let solicitante = req.body.solicitante
    let solicitado = req.body.solicitado

    let usuarioSolicitante = {}
    usuarioSolicitante.nombre = solicitante
    let usuarioSolicitado = {}
    usuarioSolicitado.nombre = solicitado


    db.collection("users").updateOne({ username: solicitado }, { $set: { peticionAmistad: "no" } }, function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            db.collection("users").updateOne({ username: solicitado }, { $push: { amistad: { $each: [{ username: solicitante }], $position: 0 } } }, function(err, datos) {
                if (err !== null) {
                    console.log(err)
                    res.send({ mensaje: "Error:" + err })
                } else {
                    db.collection("users").updateOne({ username: solicitado }, { $set: { solicitud: "no" } }, function(err, datos) {
                        if (err !== null) {
                            console.log(err)
                            res.send({ mensaje: "Error:" + err })
                        } else {
                            db.collection("users").updateOne({ username: solicitante }, { $set: { peticionAmistad: "no" } }, function(err, datos) {
                                if (err !== null) {
                                    console.log(err)
                                    res.send({ mensaje: "Error:" + err })
                                } else {
                                    db.collection("users").updateOne({ username: solicitante }, { $push: { amistad: { $each: [{ username: solicitado }], $position: 0 } } }, function(err, datos) {
                                        if (err !== null) {
                                            console.log(err)
                                            res.send({ mensaje: "Error:" + err })
                                        } else {
                                            res.send({ mensaje: "Solicitud aceptada" })

                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
});

router.put("/rechazar", function(req, res) {
    let db = req.app.locals.db

    let solicitante = req.body.solicitante
    let solicitado = req.body.solicitado

    db.collection("users").updateOne({ username: solicitado }, { $set: { peticionAmistad: "no" } }, function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            db.collection("users").updateOne({ username: solicitado }, { $set: { solicitud: "no" } }, function(err, datos) {
                if (err !== null) {
                    console.log(err)
                    res.send({ mensaje: "Error:" + err })
                } else {
                    res.send({ mensaje: "Solicitud rechazada" })
                }
            })
        }
    })

});
module.exports = router;