const express = require("express");
const router = express.Router();
const cifrarContrasenia = require("./cifrarContrasenia")
const bcrypt = require("bcrypt");

let actividades = 0
let calorias = 0
let desnivel = 0
let media = 0
let maxima = 0
let asics = 0
let mizuno = 0
let distancia = 0
let tiempo = 0

router.post("/", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.username
    let anyo = parseInt(req.body.anyo)
    let mes = req.body.mes

    db.collection("users").find({ username: username }).toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            let entrenamiento = datos[0].entrenamiento
            let contador = 0
            actividades = 0
            calorias = 0
            desnivel = 0
            media = 0
            maxima = 0
            asics = 0
            mizuno = 0
            distancia = 0
            tiempo = 0
            for (let i = 0; i < entrenamiento.length; i++) {
                if (entrenamiento[i].mes !== "total") {
                    contador++
                    actividades += entrenamiento[i].actividades
                    calorias += entrenamiento[i].calorias / 1000
                    desnivel += entrenamiento[i].elevacion / 1000
                    media += entrenamiento[i].velocidadMedia
                    maxima += entrenamiento[i].velocidadMaxima
                    distancia += entrenamiento[i].distancia / 1000
                    tiempo += entrenamiento[i].tiempo
                }
                if (entrenamiento[i].zapatillas == "ASICS" && entrenamiento[i].mes !== "total") {
                    asics += entrenamiento[i].distancia / 1000
                }
                if (entrenamiento[i].zapatillas == "MIZUNO" && entrenamiento[i].mes !== "total") {
                    mizuno += entrenamiento[i].distancia / 1000
                }
            }

            calorias = parseFloat(calorias).toFixed(2)
            desnivel = parseFloat(desnivel).toFixed(2)
            media = media / contador
            maxima = maxima / contador
            media = parseFloat(media).toFixed(2)
            maxima = parseFloat(maxima).toFixed(2)
            asics = parseFloat(asics).toFixed(2)
            mizuno = parseFloat(mizuno).toFixed(2)
            distancia = parseFloat(distancia).toFixed(2)

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

            let peso = parseFloat(datos[0].peso)
            let altura = parseFloat(datos[0].altura)
            let nombre = datos[0].nombre
            let apellido = datos[0].apellido
            let edad = parseInt(datos[0].edad)
            let sexo = datos[0].sexo
            let zapatillasUno = datos[0].zapatillasUno
            let zapatillasDos = datos[0].zapatillasDos
            let descripcion = datos[0].descripcion
            
            let pesoMiller
            let pesoHamwi
            let ppi
            let imc
            let avatar

            let random = parseInt(Math.random() * (34 - 1) + 1);

            if (sexo == "hombre") {
                pesoMiller = 56.2 + (0.555 * (altura - 152.4))
                pesoMiller = parseFloat(pesoMiller).toFixed(0)
                pesoHamwi = 48 + (1.06 * (altura - 152.4))
                pesoHamwi = parseFloat(pesoHamwi).toFixed(0)
                avatar = `./Imagenes/avatar/h${random}.png`
            } else if (sexo == "mujer") {
                pesoMiller = 53.1 + (0.535 * (altura - 152.4))
                pesoMiller = parseFloat(pesoMiller).toFixed(0)
                pesoHamwi = 45.5 + (0.866 * (altura - 152.4))
                pesoHamwi = parseFloat(pesoHamwi).toFixed(0)
                avatar = `./Imagenes/avatar/m${random}.png`
            }

            ppi = (peso / ((parseFloat(pesoMiller) + parseFloat(pesoHamwi)) / 2)) * 100
            ppi = parseFloat(ppi).toFixed(1)

            imc = peso / ((altura / 100) * (altura / 100))
            imc = parseFloat(imc).toFixed(1)

            res.send({ descripcion: descripcion, calzado1: zapatillasUno, calzado2: zapatillasDos, avatar: avatar, pesoMiller: pesoMiller, pesoHamwi: pesoHamwi, ppi: ppi, imc: imc, nombre: nombre, apellido: apellido, altura: altura, peso: peso, edad: edad, actividades: actividades, calorias: calorias, desnivel: desnivel, media: media, maxima: maxima, asics: asics, mizuno: mizuno, distancia: distancia, segundos: segundos, minutos: minutos, horas: horas, dias: dias, username: username })
        }
    })



})

router.post("/graficas", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.username
    let anyo = req.body.anyo
    let actividad = req.body.actividad
    let ene
    let feb
    let mar
    let abr
    let may
    let jun
    let jul
    let ago
    let sep
    let oct
    let nov
    let dic

    db.collection("users").find({ username: username }).toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            let entrenamiento = datos[0].entrenamiento


            for (let i = 0; i < entrenamiento.length; i++) {
                if (entrenamiento[i].anyo == anyo) {
                    if (entrenamiento[i].mes == "enero") {
                        ene = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "febrero") {
                        feb = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "marzo") {
                        mar = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "abril") {
                        abr = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "mayo") {
                        may = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "junio") {
                        jun = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "julio") {
                        jul = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "agosto") {
                        ago = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "septiembre") {
                        sep = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "octubre") {
                        oct = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "noviembre") {
                        nov = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "diciembre") {
                        dic = entrenamiento[i][`${actividad}`]
                    }
                    if (ene === undefined) {
                        ene = 0
                    }
                    if (feb === undefined) {
                        feb = 0
                    }
                    if (mar === undefined) {
                        mar = 0
                    }
                    if (abr === undefined) {
                        abr = 0
                    }
                    if (may === undefined) {
                        may = 0
                    }
                    if (jun === undefined) {
                        jun = 0
                    }
                    if (jul === undefined) {
                        jul = 0
                    }
                    if (ago === undefined) {
                        ago = 0
                    }
                    if (sep === undefined) {
                        sep = 0
                    }
                    if (oct === undefined) {
                        oct = 0
                    }
                    if (nov === undefined) {
                        nov = 0
                    }
                    if (dic === undefined) {
                        dic = 0
                    }


                }
            }
            res.send({ ene: ene, feb: feb, mar: mar, abr: abr, may: may, jun: jun, jul: jul, ago: ago, sep: sep, oct: oct, nov: nov, dic: dic })

        }
    })





})

router.post("/graficasBarra", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.username
    let actividad = req.body.actividad
    let ene18, ene19, ene20
    let feb18, feb19, feb20
    let mar18, mar19, mar20
    let abr18, abr19, abr20
    let may18, may19, may20
    let jun18, jun19, jun20
    let jul18, jul19, jul20
    let ago18, ago19, ago20
    let sep18, sep19, sep20
    let oct18, oct19, oct20
    let nov18, nov19, nov20
    let dic18, dic19, dic20

    db.collection("users").find({ username: username }).toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {

            let entrenamiento = datos[0].entrenamiento

            for (let i = 0; i < entrenamiento.length; i++) {
                if (entrenamiento[i].anyo == 2018) {
                    if (entrenamiento[i].mes == "enero") {
                        ene18 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "febrero") {
                        feb18 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "marzo") {
                        mar18 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "abril") {
                        abr18 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "mayo") {
                        may18 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "junio") {
                        jun18 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "julio") {
                        jul18 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "agosto") {
                        ago18 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "septiembre") {
                        sep18 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "octubre") {
                        oct18 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "noviembre") {
                        nov18 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "diciembre") {
                        dic18 = entrenamiento[i][`${actividad}`]
                    }
                    if (ene18 === undefined) {
                        ene18 = 0
                    }
                    if (feb18 === undefined) {
                        feb18 = 0
                    }
                    if (mar18 === undefined) {
                        mar18 = 0
                    }
                    if (abr18 === undefined) {
                        abr18 = 0
                    }
                    if (may18 === undefined) {
                        may18 = 0
                    }
                    if (jun18 === undefined) {
                        jun18 = 0
                    }
                    if (jul18 === undefined) {
                        jul18 = 0
                    }
                    if (ago18 === undefined) {
                        ago18 = 0
                    }
                    if (sep18 === undefined) {
                        sep18 = 0
                    }
                    if (oct18 === undefined) {
                        oct18 = 0
                    }
                    if (nov18 === undefined) {
                        nov18 = 0
                    }
                    if (dic18 === undefined) {
                        dic18 = 0
                    }
                }
            }

            for (let i = 0; i < entrenamiento.length; i++) {
                if (entrenamiento[i].anyo == 2019) {
                    if (entrenamiento[i].mes == "enero") {
                        ene19 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "febrero") {
                        feb19 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "marzo") {
                        mar19 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "abril") {
                        abr19 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "mayo") {
                        may19 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "junio") {
                        jun19 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "julio") {
                        jul19 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "agosto") {
                        ago19 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "septiembre") {
                        sep19 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "octubre") {
                        oct19 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "noviembre") {
                        nov19 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "diciembre") {
                        dic19 = entrenamiento[i][`${actividad}`]
                    }
                    if (ene19 === undefined) {
                        ene19 = 0
                    }
                    if (feb19 === undefined) {
                        feb19 = 0
                    }
                    if (mar19 === undefined) {
                        mar19 = 0
                    }
                    if (abr19 === undefined) {
                        abr19 = 0
                    }
                    if (may19 === undefined) {
                        may19 = 0
                    }
                    if (jun19 === undefined) {
                        jun19 = 0
                    }
                    if (jul19 === undefined) {
                        jul19 = 0
                    }
                    if (ago19 === undefined) {
                        ago19 = 0
                    }
                    if (sep19 === undefined) {
                        sep19 = 0
                    }
                    if (oct19 === undefined) {
                        oct19 = 0
                    }
                    if (nov19 === undefined) {
                        nov19 = 0
                    }
                    if (dic19 === undefined) {
                        dic19 = 0
                    }
                }
            }

            for (let i = 0; i < entrenamiento.length; i++) {
                if (entrenamiento[i].anyo == 2020) {
                    if (entrenamiento[i].mes == "enero") {
                        ene20 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "febrero") {
                        feb20 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "marzo") {
                        mar20 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "abril") {
                        abr20 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "mayo") {
                        may20 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "junio") {
                        jun20 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "julio") {
                        jul20 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "agosto") {
                        ago20 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "septiembre") {
                        sep20 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "octubre") {
                        oct20 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "noviembre") {
                        nov20 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "diciembre") {
                        dic20 = entrenamiento[i][`${actividad}`]
                    }
                    if (ene20 === undefined) {
                        ene20 = 0
                    }
                    if (feb20 === undefined) {
                        feb20 = 0
                    }
                    if (mar20 === undefined) {
                        mar20 = 0
                    }
                    if (abr20 === undefined) {
                        abr20 = 0
                    }
                    if (may20 === undefined) {
                        may20 = 0
                    }
                    if (jun20 === undefined) {
                        jun20 = 0
                    }
                    if (jul20 === undefined) {
                        jul20 = 0
                    }
                    if (ago20 === undefined) {
                        ago20 = 0
                    }
                    if (sep20 === undefined) {
                        sep20 = 0
                    }
                    if (oct20 === undefined) {
                        oct20 = 0
                    }
                    if (nov20 === undefined) {
                        nov20 = 0
                    }
                    if (dic20 === undefined) {
                        dic20 = 0
                    }
                }
            }


            res.send({ ene18: ene18, feb18: feb18, mar18: mar18, abr18: abr18, may18: may18, jun18: jun18, jul18: jul18, ago18: ago18, sep18: sep18, oct18: oct18, nov18: nov18, dic18: dic18, ene19: ene19, feb19: feb19, mar19: mar19, abr19: abr19, may19: may19, jun19: jun19, jul19: jul19, ago19: ago19, sep19: sep19, oct19: oct19, nov19: nov19, dic19: dic19, ene20: ene20, feb20: feb20, mar20: mar20, abr20: abr20, may20: may20, jun20: jun20, jul20: jul20, ago20: ago20, sep20: sep20, oct20: oct20, nov20: nov20, dic20: dic20 })

        }
    })





})

router.post("/graficasAcumulado", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.username
    let actividad = req.body.actividad
    let ene18, ene19, ene20
    let feb18, feb19, feb20
    let mar18, mar19, mar20
    let abr18, abr19, abr20
    let may18, may19, may20
    let jun18, jun19, jun20
    let jul18, jul19, jul20
    let ago18, ago19, ago20
    let sep18, sep19, sep20
    let oct18, oct19, oct20
    let nov18, nov19, nov20
    let dic18, dic19, dic20

    db.collection("users").find({ username: username }).toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {

            let entrenamiento = datos[0].entrenamiento



            for (let i = 0; i < entrenamiento.length; i++) {
                if (entrenamiento[i].anyo == 2018) {
                    if (entrenamiento[i].mes == "enero") {
                        ene18 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "febrero") {
                        feb18 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "marzo") {
                        mar18 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "abril") {
                        abr18 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "mayo") {
                        may18 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "junio") {
                        jun18 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "julio") {
                        jul18 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "agosto") {
                        ago18 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "septiembre") {
                        sep18 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "octubre") {
                        oct18 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "noviembre") {
                        nov18 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "diciembre") {
                        dic18 = entrenamiento[i][`${actividad}`]
                    }
                    if (ene18 === undefined) {
                        ene18 = 0
                    }
                    if (feb18 === undefined) {
                        feb18 = 0
                    }
                    if (mar18 === undefined) {
                        mar18 = 0
                    }
                    if (abr18 === undefined) {
                        abr18 = 0
                    }
                    if (may18 === undefined) {
                        may18 = 0
                    }
                    if (jun18 === undefined) {
                        jun18 = 0
                    }
                    if (jul18 === undefined) {
                        jul18 = 0
                    }
                    if (ago18 === undefined) {
                        ago18 = 0
                    }
                    if (sep18 === undefined) {
                        sep18 = 0
                    }
                    if (oct18 === undefined) {
                        oct18 = 0
                    }
                    if (nov18 === undefined) {
                        nov18 = 0
                    }
                    if (dic18 === undefined) {
                        dic18 = 0
                    }
                }
            }

            for (let i = 0; i < entrenamiento.length; i++) {
                if (entrenamiento[i].anyo == 2019) {
                    if (entrenamiento[i].mes == "enero") {
                        ene19 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "febrero") {
                        feb19 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "marzo") {
                        mar19 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "abril") {
                        abr19 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "mayo") {
                        may19 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "junio") {
                        jun19 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "julio") {
                        jul19 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "agosto") {
                        ago19 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "septiembre") {
                        sep19 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "octubre") {
                        oct19 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "noviembre") {
                        nov19 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "diciembre") {
                        dic19 = entrenamiento[i][`${actividad}`]
                    }
                    if (ene19 === undefined) {
                        ene19 = 0
                    }
                    if (feb19 === undefined) {
                        feb19 = 0
                    }
                    if (mar19 === undefined) {
                        mar19 = 0
                    }
                    if (abr19 === undefined) {
                        abr19 = 0
                    }
                    if (may19 === undefined) {
                        may19 = 0
                    }
                    if (jun19 === undefined) {
                        jun19 = 0
                    }
                    if (jul19 === undefined) {
                        jul19 = 0
                    }
                    if (ago19 === undefined) {
                        ago19 = 0
                    }
                    if (sep19 === undefined) {
                        sep19 = 0
                    }
                    if (oct19 === undefined) {
                        oct19 = 0
                    }
                    if (nov19 === undefined) {
                        nov19 = 0
                    }
                    if (dic19 === undefined) {
                        dic19 = 0
                    }
                }
            }

            for (let i = 0; i < entrenamiento.length; i++) {
                if (entrenamiento[i].anyo == 2020) {
                    if (entrenamiento[i].mes == "enero") {
                        ene20 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "febrero") {
                        feb20 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "marzo") {
                        mar20 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "abril") {
                        abr20 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "mayo") {
                        may20 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "junio") {
                        jun20 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "julio") {
                        jul20 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "agosto") {
                        ago20 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "septiembre") {
                        sep20 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "octubre") {
                        oct20 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "noviembre") {
                        nov20 = entrenamiento[i][`${actividad}`]
                    }
                    if (entrenamiento[i].mes == "diciembre") {
                        dic20 = entrenamiento[i][`${actividad}`]
                    }
                    if (ene20 === undefined) {
                        ene20 = 0
                    }
                    if (feb20 === undefined) {
                        feb20 = 0
                    }
                    if (mar20 === undefined) {
                        mar20 = 0
                    }
                    if (abr20 === undefined) {
                        abr20 = 0
                    }
                    if (may20 === undefined) {
                        may20 = 0
                    }
                    if (jun20 === undefined) {
                        jun20 = 0
                    }
                    if (jul20 === undefined) {
                        jul20 = 0
                    }
                    if (ago20 === undefined) {
                        ago20 = 0
                    }
                    if (sep20 === undefined) {
                        sep20 = 0
                    }
                    if (oct20 === undefined) {
                        oct20 = 0
                    }
                    if (nov20 === undefined) {
                        nov20 = 0
                    }
                    if (dic20 === undefined) {
                        dic20 = 0
                    }
                }
            }


            res.send({ ene18: ene18, feb18: feb18, mar18: mar18, abr18: abr18, may18: may18, jun18: jun18, jul18: jul18, ago18: ago18, sep18: sep18, oct18: oct18, nov18: nov18, dic18: dic18, ene19: ene19, feb19: feb19, mar19: mar19, abr19: abr19, may19: may19, jun19: jun19, jul19: jul19, ago19: ago19, sep19: sep19, oct19: oct19, nov19: nov19, dic19: dic19, ene20: ene20, feb20: feb20, mar20: mar20, abr20: abr20, may20: may20, jun20: jun20, jul20: jul20, ago20: ago20, sep20: sep20, oct20: oct20, nov20: nov20, dic20: dic20 })

        }
    })





})

module.exports = router;