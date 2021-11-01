DROP DATABASE IF EXISTS chess_db;
CREATE DATABASE chess_db;

USE chess_db;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(50),
    ngames INT,
    wins INT,
    ties INT,
    user_rank INT
    );


CREATE TABLE user_friends (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user1_id INT,
    user2_id INT,
    FOREIGN KEY (user1_id)
    REFERENCES users(id)
    ON DELETE SET NULL
);
