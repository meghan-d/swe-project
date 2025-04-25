
-- Create the database
CREATE DATABASE IF NOT EXISTS cinema_booking;
USE cinema_booking;

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255),
    phone VARCHAR(15),
    address TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE
);

-- Movies Table
CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    category VARCHAR(50),
    cast TEXT,
    director VARCHAR(100),
    producer VARCHAR(100),
    synopsis TEXT,
    trailer_url TEXT,
    rating_code VARCHAR(10),
    poster_url TEXT,
    release_date DATE
);

-- Showtimes Table
CREATE TABLE showtimes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT,
    show_date DATE,
    show_time TIME,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);

-- Seats Table
CREATE TABLE seats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    showtime_id INT,
    seat_number VARCHAR(10),
    is_booked BOOLEAN DEFAULT FALSE,
    user_id INT NULL,
    age_category VARCHAR(20),
    FOREIGN KEY (showtime_id) REFERENCES showtimes(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Orders Table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_price DECIMAL(10,2),
    promo_code VARCHAR(50),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order Items Table
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    seat_id INT,
    price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (seat_id) REFERENCES seats(id) ON DELETE CASCADE
);

-- Promotions Table
CREATE TABLE promotions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE,
    discount_percentage INT,
    is_active BOOLEAN DEFAULT TRUE
);

-- Sample Movie Entry
INSERT INTO movies (title, category, cast, director, producer, synopsis, trailer_url, rating_code, poster_url, release_date)
VALUES (
    'Interstellar', 'Currently Running',
    'Matthew McConaughey, Anne Hathaway',
    'Christopher Nolan', 'Emma Thomas',
    'A team travels through a wormhole to find a new habitable planet.',
    'https://youtube.com/embed/zSWdZVtXT7E',
    'PG-13',
    'https://image.url/interstellar.jpg',
    '2025-04-01'
);
