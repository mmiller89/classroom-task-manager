CREATE USER IF NOT exists 'root'@'localhost' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON * . * TO 'root'@'localhost';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

CREATE DATABASE IF NOT EXISTS `classroommanager`;
USE classroommanager;



CREATE TABLE IF NOT EXISTS user (
	id BIGINT(20) AUTO_INCREMENT,
    username VARCHAR(255),
    studentList LONGTEXT,
    PRIMARY KEY(`id`)
);

INSERT INTO user (username, studentList) VALUES ('Tom B. Erichsen', 'Skagen 21');
SELECT * FROM classroommanager.user;

