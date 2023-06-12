const express = require("express");
const route = express.Router();
const postSchema = require("../model/postModel");
const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         const filepath = Date.now() + '-' + file.fieldname + '.jpg';
//         cb(null, filepath);
//     }
// });

// const upload = multer({ storage: storage })

// route.post('/upload', upload.single('filename'), (req, res) => {
//     res.send("file uploaded");
// })

route.get('/', async (req, res) => {
    try {
        // const { pages } = req.query
        const data = await postSchema.find({ user: req.user });
        // console.log(data);
        res.status(200).json({
            status: "Success",
            data
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        });
    };
});


route.post('/data', async (req, res) => {
    try {
        const datas = await postSchema.create({
            title: req.body.title,
            description: req.body.description,
            user: req.user
        });
        res.status(200).json({
            status: "Success",
            datas
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        });
    };
});

route.put('/update/:id', async (req, res) => {
    try {
        const data = await postSchema.updateMany({ _id: req.params.id }, req.body);
        res.status(200).json({
            status: "Success",
            data
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        });
    };
});

route.delete("/delete/:id", async (req, res) => {
    console.log("Inside delete");
    // console.log(req.body);

    try {
        const data = await postSchema.deleteOne({ _id: req.params.id });
        res.json({
            status: "sucess",
            data: req.data
        });
    } catch (e) {
        res.status(403).json({
            status: "failed",
            message: e.message,
        });
    }
});

route.delete("/deleteall", async (req, res) => {
    try {
        await postSchema.deleteMany({ user: req.user });

        return res.json({
            status: "sucess",
        });
    }
    catch (e) {
        return res.status(500).json({
            status: "failed",
            message: e.message
        });
    }
});
module.exports = route;