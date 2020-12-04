DROP DATABASE IF EXISTS accounts_db;

CREATE DATABASE accounts_db;

USE accounts_db;

CREATE TABLE users (
	
	id INTEGER(255) NOT NULL AUTO_INCREMENT,

	username VARCHAR(255) NOT NULL,

	email VARCHAR(255) NOT NULL,

	password VARCHAR(255) NOT NULL,
    
    PRIMARY KEY (id)

);

CREATE TABLE video_links (

	id INTEGER(255) NOT NULL AUTO_INCREMENT,

	videoname VARCHAR(30) NOT NULL,

	videolink VARCHAR(255) NOT NULL,

	userlink  VARCHAR(255) NOT NULL,
    
    PRIMARY KEY (id),

    FOREIGN KEY (userlink) REFERENCES users(username)

);
