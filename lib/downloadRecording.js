const downloadRecording = async () => {  
  const url = 'https://drive.google.com/u/0/uc?id=1YCBONzB6EKSsDhJDQIjhI2xWMnP68V6i&export=download';
  const filePath = path.resolve(__dirname, 'recordings', 'fileNameToInsert.mp4');
  const writer = fs.createWriteStream(filePath);
  console.log("__dirname:    ", __dirname);

  try {
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    })

    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
        writer.on('finish', () => {
            // call function to query to database
            console.log('resolve');
            resolve('resolved');
        });
        writer.on('error', () => {
            fs.unlink(filePath, function (err) {
            if (err) throw err;
                console.log('File deleted!');
            });
            reject('rejected')
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

module.exports = { downloadRecording }