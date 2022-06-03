const Review = require('../../models/review').model;

const create = async (id_group, review, id_client) => {
    const review = new Review({
        id_group,
        review,
        id_client,
    });
    return await review.save();
}

const getAll = async () => {
    return await Review.find({}).exec();
};

const update = async (id, review) => {
    const updatedReview = await Review.findByIdAndUpdate(id, {
        review,
        },
        { new: true }
    ).exec();
    return updatedReview;
};

const del = async (id) => {
    return await Review.findByIdAndDelete(id).exec();
}

module.exports = {
    create,
    getAll,
    update,
    del,
};
