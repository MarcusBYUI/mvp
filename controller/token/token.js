const createError = require("http-errors");
const Joi = require("joi");
const { client } = require("../../utils");

const { query } = require("../../model/query");


const getToken = async(req, res, next) => {
    const schema = Joi.object().keys({
        address: Joi.string().required()
    });

    try {
        //validation
        const value = await schema.validateAsync(req.body);

        const jettonInfo = await client.jettons.getJettonInfo(value.address);

        res.status(200).json({ status: 200, data: jettonInfo });
    } catch (error) {
        if (error.error) {
            next(createError(error.status, error.error.error));
        } else {
            next(createError(422, error.message));
        }
    }
};


module.exports = {
    getToken
}