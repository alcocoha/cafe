const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

// llamamos el modelo del Usuario
const Usuario = require('../models/usuario');

app.get('/all-users', (req, res) => {
    // res.json('get usuario');

    // console.log('res', res.json()s)

    if(err){
        return res.status(400).json({
            ok: false,
            err
        });
    }

    res.json({
        ok: true,
        usuarios
    });
})

app.get('/usuario', (req, res) => {
    // res.json('get usuario');

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado : true }, 'nombre email role estado google') // Dentro del find en el objeto podemos poner condiciones
        .skip(desde)
        .limit(limite)
        .exec( (err, usuarios) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.countDocuments({ estado : true }, (err, conteo)=>{
                res.json({
                    ok: true,
                    usuarios,
                    conteo
                });
            });

        });
})

app.post('/usuario', (req, res) => {
    const body = req.body;

    // Utilizamos el modelo para grabar en la base de datos
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync( body.password, saltRounds ),
        role: body.role
    });

    // Grabamos en la base de datos con la palabra reservada - save
    usuario.save((err, usuarioDB ) => {
        console.log('err', err)
        console.log('usuarioDB', usuarioDB)

        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        usuarioDB.password = null;

        return res.status(200).json({
                ok: true,
                usuario: usuarioDB
            });

    });
})

app.put('/usuario/:id', (req, res) => {
    const id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate( id, body, { new: true, runValidators: true }, ( err, usuarioDB ) => {

        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });


})

app.delete('/usuario/:id', (req, res) => { // Eliminar fisicamente
    // res.json('delete usuario');
    const id = req.params.id;
    const cambiaEstado = {
        estado: false
    }

    // Usuario.findByIdAndRemove( id, (err, usuarioBorrado) => { // Eliminar fisicamente
    Usuario.findByIdAndUpdate( id, cambiaEstado, { new: true }, ( err, usuarioBorrado ) => {
        console.log('usuarioBorrado', usuarioBorrado)
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        console.log('usuarioBorrado', usuarioBorrado)
        if(usuarioBorrado.estado){ // validamos si existe lo borro si no le digo al usuario que no existe este usuario
            return res.json({
                ok: true,
                usuario: usuarioBorrado
            });
        } else {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario no encontrado'
                }
            });
        }
    })
})


module.exports = app;