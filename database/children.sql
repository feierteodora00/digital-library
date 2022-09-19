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
-- Table structure for table `children`
--

CREATE TABLE IF NOT EXISTS `children` (
`id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `dob` date NOT NULL,
  `class` int(30) NOT NULL,
  `parent_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `children`
--

INSERT INTO `children` (`id`, `first_name`, `last_name`, `dob`, `class`, `parent_id`) VALUES
(1, 'Alexandra', 'Tansanu', '2019-05-07', 1, 1),
(2, 'Teodora', 'Tansanu', '2019-05-07', 1, 1),
(3, 'Ilinca', 'Chiscop', '2022-04-15', 1, 8),
(4, 'Gabriel', 'Chiscop', '2019-05-07', 2, 6),
(5, 'Teo', 'Kid', '2019-05-07', 1, 9),
(6, 'Elena', 'Matei', '2019-05-07', 2, 13),
(7, 'Alex', 'Green', '2021-07-04', 3, 5),
(8, 'John', 'John', '2018-04-28', 3, 2),
(9, 'Jake', 'Dow', '2017-06-30', 3, 5),
(10, 'Jake', 'Kid', '2018-01-30', 2, 3),
(11, 'Mattew', 'Kid', '2018-06-07', 3, 6),
(12, 'Miruna', 'Titeiu', '2019-05-07', 2, 11),
(13, 'Carla', 'Borcoman', '2019-05-07', 3, 14),
(14, 'Alexandra', 'Kid', '2018-04-29', 1, 9),
(15, 'Alex', 'Borcoman', '2019-05-07', 3, 9),
(16, 'Bogdan', 'Borcoman', '2019-05-07', 3, 14),
(17, 'Another', 'Kid', '2019-05-07', 2, 9),
(18, 'test', 'test', '2019-05-07', 2, 2),
(19, 'test', 'test', '2019-05-07', 2, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `children`
--
ALTER TABLE `children`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `children`
--
ALTER TABLE `children`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
