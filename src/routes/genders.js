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

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const genderUpdated = await Gender.update(id, {
            nombre
        });
        res.json({
            success: true,
            message: 'Genero actualizado exitosamene',
            payload: genderUpdated,
        });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const genderDeleted = await Gender.del(id);
        res.json({
            success: true,
            message: 'Genero eliminado exitosamente',
            payload: genderDeleted,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;