const express = require('express');
const router = express.Router();
const Review = require('../useCases/review');

router.get('/', async (req, res, next) => {
    try {
        const reviews = await Review.getAll();
        res.json({
            success: true,
            message: 'Estos son todos los reviews',
            payload: reviews,
        });
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { id_group, review, id_client } = req.body;
        const reviewCreated = await Review.create(id_group, review, id_client);
        res.json({
            success: true,
            message: 'Review creado exitosamente',
            payload: reviewCreated,
        });
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { review } = req.body;
        const reviewUpdated = await Review.update(id, {review});
        res.json({
            success: true,
            message: 'Review actualizado exitosamente',
            payload: reviewUpdated,
        });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const reviewDeleted = await Review.del(id);
        res.json({
            success: true,
            message: 'Review eliminado exitosamente',
            payload: reviewDeleted,
        });
    } catch (error) {
        next(error);
    };
});

module.exports = router;