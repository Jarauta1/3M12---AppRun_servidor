const express = require("express");
const router = express.Router();
const cifrarContrasenia = require("./cifrarContrasenia")
const bcrypt = require("bcrypt");

router.post("/", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.username;

    let usuarioSolicita

    db.collection("users").find({ username: username }).toArray(function(err, arrayUsuario) {
        if (err !== null) {
            res.send({ mensaje: "Ha habido un error" });
        } else {
            if (arrayUsuario[0].peticionAmistad == "si") {
                usuarioSolicita = arrayUsuario[0].solicitud
                res.send({ solicitud: "si", solicitante: usuarioSolicita })
            }

        }
    });
});

module.exports = router;