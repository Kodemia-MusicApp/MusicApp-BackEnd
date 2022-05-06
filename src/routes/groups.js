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

router.get('name', async (req, res, next) => {
    try {
        const { name } = req.params;
        const retrievedGroup = await Group.getByName(name);
        res.json({
            success: true,
            payload: retrievedGroup,
        });
    } catch (error) {
        next(error);
    }
});