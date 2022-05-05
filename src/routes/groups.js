const express = require('express');
const router = express.Router();
const Group = require('../useCases/group');

router.get('/', async (req, res, next) => {
    try {
        const groups = await Group.getAll();
        res.json({
            success: true,
            payload: groups,
        });
    } catch (error) {
        next(error);
    }
});