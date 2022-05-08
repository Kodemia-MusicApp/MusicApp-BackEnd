const express = require('express');
const router = express.Router();
const Gender = require('../useCases/gender');

router.get('/', async (req, res, next) => {
    try {
        const genders = await Gender.getAll();
        res.json({
            success: true,
            payload: genders
        });
    } catch (error) {
        next(error);
    }
});

router.get('/:name', async (req, res, next) => {
    try {
        const { name } = req.params;
        const retrievedGender = await Gender.getByName(name)
        res.json({
            success: true,
            payload: retrievedGender,
        });
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { nombre } = req.body;
        const genderCreated = await Gender.create(nombre);
        res.json({
            success: true,
            message: 'Genero creado exitosamente',
            payload: genderCreated
        });
    } catch (error) {
        next(error);
    }
});

