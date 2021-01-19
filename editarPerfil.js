const express = require("express");
const router = express.Router();
const cifrarContrasenia = require("./cifrarContrasenia")
const bcrypt = require("bcrypt");

router.post("/", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.username

    db.collection("users").find({ username: username }).toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {

            res.send(datos[0])
        }
    })
})

router.put("/nombre", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.username
    let nombre = req.body.nombre
    
    db.collection("users").updateOne({ username: username }, { $set: { nombre: nombre } }, function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            db.collection("users").find({ username: username }).toArray(function(err, datos) {
                if (err !== null) {
                    console.log(err)
                    res.send({ mensaje: "Error:" + err })
                } else {
                    res.send({ nombre: datos[0].nombre, mensaje: `Editado correctamente. Ahora tu nombre es ${datos[0].nombre}.` })
                }
            })
        }
    })
})

router.put("/apellido", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.username
    let apellido = req.body.apellido

    db.collection("users").updateOne({ username: username }, { $set: { apellido: apellido } }, function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            db.collection("users").find({ username: username }).toArray(function(err, datos) {
                if (err !== null) {
                    console.log(err)
                    res.send({ mensaje: "Error:" + err })
                } else {
                    res.send({ apellido: datos[0].apellido, mensaje: `Editado correctamente. Ahora tu apellido es ${datos[0].apellido}.` })
                }
            })
        }
    })
})

router.put("/edad", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.username
    let edad = req.body.edad

    db.collection("users").updateOne({ username: username }, { $set: { edad: edad } }, function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            db.collection("users").find({ username: username }).toArray(function(err, datos) {
                if (err !== null) {
                    console.log(err)
                    res.send({ mensaje: "Error:" + err })
                } else {
                    res.send({ edad: datos[0].edad, mensaje: `Editado correctamente. Ahora tu edad es ${datos[0].edad}.` })
                }
            })
        }
    })
})

router.put("/altura", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.username
    let altura = req.body.altura

    db.collection("users").updateOne({ username: username }, { $set: { altura: altura } }, function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            db.collection("users").find({ username: username }).toArray(function(err, datos) {
                if (err !== null) {
                    console.log(err)
                    res.send({ mensaje: "Error:" + err })
                } else {
                    res.send({ altura: datos[0].altura, mensaje: `Editado correctamente. Ahora tu altura es ${datos[0].altura}.` })
                }
            })
        }
    })
})

router.put("/peso", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.username
    let peso = req.body.peso

    db.collection("users").updateOne({ username: username }, { $set: { peso: peso } }, function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            db.collection("users").find({ username: username }).toArray(function(err, datos) {
                if (err !== null) {
                    console.log(err)
                    res.send({ mensaje: "Error:" + err })
                } else {
                    res.send({ peso: datos[0].peso, mensaje: `Editado correctamente. Ahora tu peso es ${datos[0].peso}.` })
                }
            })
        }
    })
})


router.put("/editarPerfil", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.username
    let nombre = req.body.nombre
    let apellido = req.body.apellido
    let edad = req.body.edad
    let altura = req.body.altura
    let peso = req.body.peso
    let calzado1 = req.body.calzado1
    let calzado2 = req.body.calzado2
    let descripcion = req.body.descripcion

    db.collection("users").updateMany({ username: username }, { $set: { nombre: nombre, apellido: apellido, edad: edad, altura: altura, peso: peso, zapatillasUno: calzado1, zapatillasDos: calzado2, descripcion: descripcion } }, function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            db.collection("users").find({ username: username }).toArray(function(err, datos) {
                if (err !== null) {
                    console.log(err)
                    res.send({ mensaje: "Error:" + err })
                } else {
                    res.send({ nombre: datos[0].nombre, mensaje: `Editado correctamente. Ahora tu nombre es ${datos[0].nombre}.` })
                }
            })
        }
    })
})

module.exports = router