const SQL = require('@nearform/sql');
const { query } = require('../config/db');

const addToDataBase = (useData, fileData, filePath) => {
    const sql = SQL`
            INSERT INTO webhook_assignment.recordings (
            payload_uuid, account_id, total_size, host_email, timezone,            
            recording_count, recording_id, meeting_id,     
            file_extension, file_size, recording_type, file_path)
            VALUES (
            ${useData.uuid}, ${useData.id}, ${useData.total_size}, 
            ${useData.host_email}, ${useData.timezone}, ${useData.recording_count},
            ${fileData.id}, ${fileData.meeting_id},
            ${fileData.file_extension}, ${fileData.file_size},
            ${fileData.recording_type}, ${filePath});
        `
    return query(sql);
}

module.exports = { addToDataBase }