CREATE TABLE IF NOT EXISTS recordings (
    recording_id       INT NOT NULL AUTO_INCREMENT,
    file_path          VARCHAR(500) NOT NULL UNIQUE, 
    PRIMARY KEY (recording_id)
);