const express = require("express");
const router = express.Router();
const cifrarContrasenia = require("./cifrarContrasenia")
const bcrypt = require("bcrypt");

router.put("/", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.username
    let descripcion = req.body.descripcion
    let distancia = req.body.distancia
    let tiempo = req.body.tiempo
    let desnivel = req.body.desnivel
    let calorias = req.body.calorias
    let media = req.body.media
    let maxima = req.body.maxima
    let anyo = req.body.anyo
    let mes = req.body.mes
    let equipamiento = req.body.equipamiento

    if (mes == 01) {
        mes = "enero"
    } else if (mes === 02) {
        mes = "febrero"
    } else if (mes === 03) {
        mes = "marzo"
    } else if (mes === 04) {
        mes = "abril"
    } else if (mes === 05) {
        mes = "mayo"
    } else if (mes === 06) {
        mes = "junio"
    } else if (mes === 07) {
        mes = "julio"
    } else if (mes === 08) {
        mes = "agosto"
    } else if (mes === 09) {
        mes = "septiembre"
    } else if (mes === 10) {
        mes = "octubre"
    } else if (mes === 11) {
        mes = "noviembre"
    } else if (mes === 12) {
        mes = "diciembre"
    }

    db.collection("users").updateOne({ username: username }, { $push: { entrenamiento: { $each: [{ descripcion: descripcion, distancia: distancia, tiempo: tiempo, elevacion: desnivel, calorias: calorias, velocidadMedia: media, velocidadMaxima: maxima, anyo: anyo, mes: mes, zapatillas: equipamiento, actividades: 1 }], $position: 0 } } }, function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            db.collection("users").find({ username: username }).toArray(function(err, datos) {
                if (err !== null) {
                    console.log(err)
                    res.send({ mensaje: "Error:" + err })
                } else {

                    db.collection("users").find({ username: username }).toArray(function(err, datos) {
                        if (err !== null) {
                            console.log(err)
                            res.send({ mensaje: "Error:" + err })
                        } else {


                            let kilometros = parseFloat(distancia / 1000)
                            kilometros = kilometros.toFixed(2)

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

                            res.send({ mensaje: "Entrenamiento introducido con éxito", descripcion: descripcion, distancia: kilometros, segundos: segundos, minutos: minutos, horas: horas, desnivel: desnivel, calorias: calorias, media: media, maxima: maxima, anyo: anyo, mes: mes, equipamiento: equipamiento })

                        }
                    })
                }
            })
        }
    })




})

module.exports = router