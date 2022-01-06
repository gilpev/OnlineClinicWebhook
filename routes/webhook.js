const express = require('express');
const router = express.Router();
const {getUsedData} = require('../middleware/getUsedData');
const {downloadRecording, createDirForRecording} = require('../lib/downloadRecording');

router.post('/recording',getUsedData, async (req, res) => {
    const useData = req.useData;
    const files = req.filesArr;
    console.log(files);
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
            console.log(useData, file, filePath);
            // await addToDataBase(useData, file, filePath);
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: `Server error`
        })
    }
    // const {download_url, file_extension, id } = files[0];
    // const {download_url:d2, file_extension:f2, id:id2 } = files[1];

    // console.log(payload);
    // console.log(files);
})

module.exports = router;

