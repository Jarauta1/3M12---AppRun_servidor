const express = require("express");
const router = express.Router();
const cifrarContrasenia = require("./cifrarContrasenia")
const bcrypt = require("bcrypt");

router.post("/", function(req, res) {
    let db = req.app.locals.db

    let usuario = req.body.usuario

    let usuarios = []
    let object = {}
    let entrenamiento
    let actividades
    let distancia
    let tiempo

    db.collection("users").find().toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {

            for (let i = 0; i < datos.length; i++) {
                if (datos[i].username !== usuario) {
                    object = {}
                    object.nombre = datos[i].nombre
                    object.apellido = datos[i].apellido
                    object.username = datos[i].username
                    object.altura = datos[i].altura
                    object.peso = datos[i].peso
                    object.edad = datos[i].edad
                    object.descripcion = datos[i].descripcion
                    actividades = 0
                    distancia = 0
                    tiempo = 0

                    entrenamiento = datos[i].entrenamiento

                    for (let j = 0; j < entrenamiento.length; j++) {
                        if (entrenamiento[j].mes !== "total") {
                            actividades += entrenamiento[j].actividades
                            distancia += entrenamiento[j].distancia
                            tiempo += entrenamiento[j].tiempo
                        }
                    }

                    distancia = distancia / 1000
                    distancia = parseFloat(distancia)
                    distancia = distancia.toFixed(1)

                    let segundos = tiempo % 60
                    let segundosOperar = tiempo - segundos

                    let minutosCalculo = segundosOperar / 60
                    let minutos = minutosCalculo % 60
                    let minutosOperar = minutosCalculo - minutos

                    let horasCalculo = minutosOperar / 60
                    let horas = horasCalculo % 24
                    let horasOperar = horasCalculo - horas

                    let diasCalculo = horasOperar / 24
                    let dias = diasCalculo % 24

                    object.actividades = actividades
                    object.distancia = distancia
                    object.segundos = segundos
                    object.minutos = minutos
                    object.horas = horas
                    object.dias = dias


                    usuarios.push(object)

                }
            }
            res.send(usuarios)
        }
    })



})

router.put("/peticion", function(req, res) {
    let db = req.app.locals.db

    let nombre = req.body.nombreSolicitado
    let nombreEnvia = req.body.nombreEnvia

    db.collection("users").updateOne({ nombre: nombre }, { $set: { peticionAmistad: "si" } }, function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            db.collection("users").updateOne({ nombre: nombre }, { $set: { solicitud: nombreEnvia } }, function(err, datos) {
                if (err !== null) {
                    console.log(err)
                    res.send({ mensaje: "Error:" + err })
                } else {

                }
            })
        }
    })


})


module.exports = router