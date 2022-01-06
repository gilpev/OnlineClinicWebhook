const fs = require('fs');
const axios = require('axios');
const path = require('path');  
const { resolve } = require('path');
const parentPath = path.resolve(__dirname, '..')

const createDirForRecording = (meetId) => {
    return new Promise((resolve, reject) => {
        const dir = path.join(path.resolve(parentPath, 'recordings') , `${meetId}`);
        console.log('dir:' ,dir);
        fs.access(dir, function(error) {
            if (error) {
                console.log("Directory does not exist.")
                fs.mkdir(dir, (err) => {
                    if(err){
                        reject("Failed to create dir")
                    } else {
                        console.log('Successfully created a new directory')
                        resolve(dir)
                    }
                });
            } else {
                console.log("Directory exists.");
                resolve(dir);
            }
        })
    })
}

const downloadRecording = async (dirPath, fileData) => {  
    const url = fileData.download_url;
    const filePath = path.resolve(
        dirPath, fileData.meeting_id + fileData.recording_type + '.' + fileData.file_extension
    );
    const writer = fs.createWriteStream(filePath);

    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        })

        response.data.pipe(writer)

        return new Promise((resolve, reject) => {
            writer.on('finish', () => {
                console.log('resolve');
                resolve(filePath);
            });
            writer.on('error', (err) => {
                if (err) throw err;
                reject(err);
            })
        })
        } catch (err) {
            console.log('Failed to download file');
            fs.unlink(filePath, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });
        }
}

module.exports = { downloadRecording, createDirForRecording }