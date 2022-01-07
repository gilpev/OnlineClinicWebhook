CREATE TABLE IF NOT EXISTS recordings (
    payload_uuid        VARCHAR(150) NOT NULL,
    account_id          BIGINT NOT NULL,
    total_size          INT NOT NULL,
    host_email          VARCHAR(200) NOT NULL,
    timezone            VARCHAR(200) NOT NULL,
    recording_count     INT NOT NULL,
    recording_id        VARCHAR(200) NOT NULL,
    meeting_id          VARCHAR(200) NOT NULL,
    file_extension      ENUM ('MP4','M4A') NOT NULL,
    file_size           INT NOT NULL,
    recording_type      VARCHAR(200) NOT NULL,
    file_path           VARCHAR(400) NOT NULL, 
    PRIMARY KEY (payload_uuid, recording_id)
);

