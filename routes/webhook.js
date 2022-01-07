const express = require('express');
const router = express.Router();
const {getUsedData} = require('../middleware/getUsedData');
const {downloadRecording, createDirForRecording} = require('../lib/downloadRecording');
const { addToDataBase } = require('../quries/webhookQueries');

router.post('/recording',getUsedData, async (req, res) => {
    const useData = req.useData;
    const files = req.filesArr;
    try {
        const dirPath = await createDirForRecording(useData.id);
        if(!dirPath){
            return res.status(400).json({
                success: false,
                msg: `Failed to download`
            });
        }
        for(const file of files){
            const filePath = await downloadRecording(dirPath, file);
            if(!filePath){
                return res.status(400).json({
                    success: false,
                    msg: `Failed to download`
                });
            }
            const response = await addToDataBase(useData, file, filePath);
        }
        res.status(200).json({
            success: true,
            msg: `Recordings downloaded successfully and added to database`
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false,
            msg: `Server error`,
            err_msg: err.message
        })
    }
})

module.exports = router;

