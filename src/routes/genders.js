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

