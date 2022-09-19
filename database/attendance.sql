-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 28, 2022 at 09:46 PM
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
-- Table structure for table `attendance`
--

CREATE TABLE IF NOT EXISTS `attendance` (
  `child_id` int(11) NOT NULL,
  `attendance_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`child_id`, `attendance_date`) VALUES
(8, '2022-04-28'),
(8, '2022-04-28'),
(8, '2022-04-28'),
(8, '2022-04-28'),
(8, '2022-04-28'),
(8, '2022-04-28'),
(8, '2022-04-28'),
(15, '2022-04-28'),
(7, '2022-04-28'),
(7, '2022-04-28'),
(7, '2022-04-28'),
(15, '2022-04-28'),
(15, '2022-04-28'),
(1, '2022-04-28'),
(1, '2022-04-28'),
(15, '0000-00-00'),
(15, '0000-00-00'),
(15, '0000-00-00'),
(15, '0000-00-00'),
(7, '0000-00-00'),
(1, '0000-00-00'),
(1, '0000-00-00'),
(1, '0000-00-00'),
(1, '0000-00-00'),
(15, '2022-04-29'),
(7, '2022-04-29'),
(14, '2022-04-28'),
(14, '2022-04-28'),
(14, '2022-04-28');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
