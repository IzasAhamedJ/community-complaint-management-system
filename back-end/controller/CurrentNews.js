import current from "../models/CurrentNews.js";


export const createNews = async (req, res) => {
    try {
        const {
            title,
            description,
            message
        } = req.body

        const news = new current({
            title,
            description,
            message,
             image: req.file ? `/uploads/${req.file.filename}` : null, // save image path if uploaded
        })

        await news.save();


        res.status(200).json({
            message: 'news created successfully',
            success: true
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}



export const getNews = async (req, res) => {

    try {
        const getAllNews = await current.find({});

        res.status(200).json({
            data: getAllNews,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
} 