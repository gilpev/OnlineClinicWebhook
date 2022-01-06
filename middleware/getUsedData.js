
const getUsedData = (req, res, next) => {
    const {uuid, id, total_size, host_email, timezone, recording_count} = req.body.payload.object;
    const files = req.body.payload.object.recording_files;
    const filesArr = [];
    if(!uuid || !id || !total_size || !host_email ||
        !timezone || !recording_count || !files){
        return res.status(400).json({ 
                msg: 'Incomplete Data',
                success: false
        });
    }
    req.useData = {uuid, id, total_size, host_email, timezone, recording_count};
    for(const file of files){
        const { 
            meeting_id, recording_start, recording_end, 
            file_extension, file_size, recording_type, download_url 
        } = file;

        if(!meeting_id || !recording_start || !recording_end || 
            !file_extension || !file_size || !recording_type || !download_url){
            return res.status(400).json({ 
                msg: 'Incomplete Data',
                success: false
            }); 
        }
        filesArr.push({
            meeting_id, recording_start, recording_end, 
            file_extension, file_size, recording_type, download_url
        });
    }
    req.filesArr = filesArr;
    next();
}

module.exports = { getUsedData };