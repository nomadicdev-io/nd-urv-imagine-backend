import express from "express";
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

router.route('/').get((req, res)=> {
    console.log('Hello Alan')
    res.send('API Works!')
})

router.route('/').post(async (req, res)=> {
    try {

        const {prompt} = req.body;

        const apiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '512x512',
            response_format: 'b64_json'
        })

        const image = apiResponse.data.data[0].image;

        res.status(200).json({photo: image})

    } catch(err) {
        console.log(err)
        res.status(500).send(err?.response.data.error.message)
    }
})

export default router;