-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 28, 2022 at 09:48 PM
-- Server version: 5.5.58-0+deb7u1-log
-- PHP Version: 5.6.31-1~dotdeb+7.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `unn_w18002348`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `phone_number` varchar(13) NOT NULL,
  `role` enum('admin','teacher','parent','') NOT NULL,
  `approved` int(1) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `hashed_password`, `phone_number`, `role`, `approved`) VALUES
(10, 'Gabi', 'Stelea', 'gabi@example.com', '$2y$10$8pPN6bsj37i7RVYrR79O0eVga8k1FDyO535tGjAyKIKV8d74GmLZ6', '', 'teacher', 0),
(11, 'aida', 'campean', 'test@testtest.com', '$2y$10$e6wKFu3XyZTU9jamRO0Kie4zs0eZS7Fjeq7ibbqD.NBGw84cqn4Du', '07777777', 'parent', 1),
(4, 'tester', 'campean', 'test@hotmail.com', '$2y$10$bUo0lfPq4ZLPAsS42ze0wutieGwcqYEFrO9mpFDxkTlTPQfJlInV6', '0777777777', 'teacher', 1),
(6, 'Jake', 'Parent', 'jake@example.com', '$2y$10$/OaF1tqAmW3fiL7FjGJBQ.lf2YtU7q7oKI6jYKiO9FCo2oqxPWm3q', '', 'parent', 1),
(7, 'Ada', 'Teacher', 'ada@example.com', '$2y$10$YsbryOXFLsj10J8r6tS46.iAotgfY2xZnYf6SDas1NRiyeGXKAdj6', '02147483647', 'teacher', 1),
(8, 'Teo', 'Admin', 'teo@example.com', '$2y$10$KeCt938CicvjijFRmZMhiOb1Dbwig6aL0N2w70il51agmLI//SX/y', '', 'admin', 1),
(9, 'aida', 'test', 'test@tester.com', '$2y$10$YkU.dtJECEtWvUoVICRD6eI5W0IBilqwe7XCxnNsZs5EcSYWaij3e', '7777777', 'teacher', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `username` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
