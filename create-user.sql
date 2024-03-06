DROP SCHEMA IF EXISTS `classroom-manager`;

CREATE SCHEMA `classroom-manager`;
USE `classroom-manager`;


CREATE TABLE IF NOT EXISTS `classroom-manager`.`user` (
	id long PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(255),
    studentList LONGTEXT
)

