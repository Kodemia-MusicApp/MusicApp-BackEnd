const express = require('express');
const router = express.Router();
const Group = require('../useCases/group');

router.get('/', async (req, res, next) => {
    try {
        const groups = await Group.getAll();
        res.json({
            success: true,
            message: 'Estos son todos los grupos',
            payload: groups,
        });
    } catch (error) {
        next(error);
    }
});

router.get('/:email', async (req, res, next) => {
    try {
        const { email } = req.params;
        const retrievedGroup = await Group.getByEmail(email);
        res.json({
            success: true,
            message: 'Este es el grupo por email',
            payload: retrievedGroup,
        });
    } catch (error) {
        next(error);
    }
});

router.get('/:name', async (req, res, next) => {
    try {
        const { name } = req.params;
        const retrievedGroup = await Group.getByName(name);
        res.json({
            success: true,
            message: 'Este es el grupo por nombre',
            payload: retrievedGroup,
        });
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { nombre, representante, correo, telefono, password, integrantes, precioHora, zonaServicio, descripcion, genero } = req.body;
        const groupCreated = await Group.create(nombre, representante, correo, telefono, password, integrantes, precioHora, zonaServicio, descripcion, genero);
        res.json({
            success: true,
            message: 'Grupo creado exitosamente',
            payload: groupCreated,
        })
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, representante, correo, telefono, integrantes, precioHora, zonaServicio, descripcion, genero } = req.body;
        const groupUpdated = await Group.update(id, {
            nombre,
            representante,
            correo,
            telefono,
            integrantes,
            precioHora,
            zonaServicio,
            descripcion,
            genero
        });
        res.json({
            success: true,
            message: 'Grupo actualizado exitosamente',
            payload: groupUpdated,
        })
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const groupDeleted = await Group.del(id);
        res.json({
            success: true,
            message: 'Grupo eliminado exitosamente',
            payload: groupDeleted,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;