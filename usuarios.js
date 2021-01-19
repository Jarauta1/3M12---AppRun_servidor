const express = require("express");
const router = express.Router();
const cifrarContrasenia = require("./cifrarContrasenia")
const bcrypt = require("bcrypt");
/* const array = require("./array") */

router.post("/usuario", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.username


    db.collection("users").find({ username: username }).toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {

            let amistad = datos[0].amistad
            let longitud = amistad.length

            if (longitud > 0) {
                res.send({ longitud: longitud, amigo: amistad[0].username })
            } else if (longitud == 0) {
                res.send({ mensaje: "No hay amigos" })
            }
        }

    })

})


router.post("/registro", cifrarContrasenia, function(req, res) {
    let db = req.app.locals.db

    let username = req.body.username;
    let password = req.body.password;

    db.collection("users").find({ username: username }).toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {

            if (datos.length > 0) {
                res.send({ registro: "no", mensaje: "Ese nombre de usuario ya esta ocupado" })
            } else {
                db.collection("users").insertOne({ username: username, password: password, amistad: [], peticionAmistad: "no", solicitud: "no", zapatillas: "Ninguna", bicicleta: "Ninguna", entrenamiento: [], }, function(err, datos) {
                    if (err !== null) {
                        res.send({ mensaje: "Error al registrar el usuario" })
                    } else {
                        res.send({ registro: "si", mensaje: "Usuario registrado correctamente" })

                    }
                });
            }

        }
    })

    /* if (array == 0) {
        let usuario = { username: username, password: password, amistad: "Ninguno", peticionAmistad: "No", zapatillas: "Ninguna", bicicleta: "Ninguna", entrenamiento: {} }
        array.push(usuario);

        res.send({ registro: "si", array: array, mensaje: "Usuario registrado correctamente" })
    } else {
        for (let i = 0; i < array.length; i++) {

            if (array[i].username == username) {
                res.send({ registro: "no", mensaje: "Ese nombre de usuario ya esta ocupado" })
            } else {
                let usuario = { username: username, password: password, amistad: "Ninguno", peticionAmistad: "No", zapatillas: "Ninguna", bicicleta: "Ninguna", entrenamiento: {} }
                array.push(usuario);

                res.send({ registro: "si", array: array, mensaje: "Usuario registrado correctamente" })
            }
        }
    }
 */


})

router.post("/login", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.username;
    let password = req.body.password;

    db.collection("users").find({ username: username }).toArray(function(err, arrayUsuario) {
        if (err !== null) {
            res.send({ mensaje: "Ha habido un error" });
        } else {

            if (arrayUsuario.length > 0) {
                if (bcrypt.compareSync(password, arrayUsuario[0].password)) {
                    res.send({ entrar: "si", mensaje: "Logueado correctamente" });
                } else {
                    res.send({ entrar: "no", mensaje: "Contraseña incorrecta" });
                }
            } else {
                res.send({ entrar: "no", mensaje: "El usuario no existe" });
            }
        }
    });
});

router.put("/perfil", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.usuario
    let nombre = req.body.nombre
    let apellido = req.body.apellido
    let altura = parseFloat(req.body.altura)
    let edad = parseFloat(req.body.edad)
    let peso = parseFloat(req.body.peso)
    let sexo = req.body.sexo

    let perfil = { nombre: nombre, apellido: apellido, altura: altura, edad: edad, peso: peso, sexo: sexo }

    db.collection("users").find({ username: username }).toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {


            db.collection("users").updateOne({ username: username }, { $set: { nombre: nombre, apellido: apellido, altura: altura, edad: edad, peso: peso, sexo: sexo } }, function(err, datos) {
                if (err !== null) {
                    res.send({ mensaje: "Error al registrar el usuario" })
                } else {
                    res.send({ mensaje: "Usuario registrado correctamente" })

                }
            });


        }
    })

    /* for (let i = 0; i < array.length; i++) {
        if (username == array[i].username) {
            array[i].nombre = nombre;
            array[i].apellido = apellido;
            array[i].altura = altura;
            array[i].edad = edad;
            array[i].peso = peso;
            res.send({ array: array, mensaje: "Usuario registrado correctamente" })
        } else {
            res.send({ mensaje: "Error al registrar el usuario" })
        }
    } */

})

module.exports = router;