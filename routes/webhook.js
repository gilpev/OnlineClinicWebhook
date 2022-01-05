const express = require('express');
const router = express.Router();

// const downloadFile = (url) => {

// }
router.post('/recording', async (req, res) => {
    console.log('im in post recording');
    const payload = req.body.payload;
    const files = payload.object.recording_files
    console.log(payload);
    console.log(files);
})

module.exports = router;


