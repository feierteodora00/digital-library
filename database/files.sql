-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 28, 2022 at 09:47 PM
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
-- Table structure for table `files`
--

CREATE TABLE IF NOT EXISTS `files` (
`id` int(10) unsigned NOT NULL,
  `filename` varchar(255) NOT NULL,
  `folder_id` int(10) unsigned DEFAULT NULL,
  `module_id` int(10) unsigned DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=331 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `filename`, `folder_id`, `module_id`) VALUES
(281, 'Letter standard Reference - AIDA CAMPIAN.docx', 231, 61),
(301, 'KF4011 Assignment 18_19 no 2 - presentation 001 - referall(1).docx', 0, 0),
(302, 'S117.doc', 0, 0),
(303, 'text (2).txt', 0, 0),
(305, 'S117 (1) (2).doc', 0, 0),
(307, 'WeeklyStandUp_w5.docx', 0, 0),
(308, 'Aida.docx', 223, 2),
(309, 'Dockerfile', 229, 2),
(310, 'KV6002Assignment3Report21-22v3 (1) (2).docx', 0, 0),
(311, 'WeeklyStandUp_w4.docx', 0, 0),
(312, 'text (1).txt', 235, 61),
(313, 'text (2).txt', 230, 60),
(314, 'receipt-2021SEM1_KV6006BNN01-Assignment 2 - IdeaBook Individual.txt', 230, 60),
(316, 'text (2) (1).txt', 257, 1),
(317, 'Letter standard Reference - AIDA CAMPIAN.docx', 257, 1),
(325, 'text (1).txt', 261, 2),
(328, 'text (2).txt', 268, 60);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `files`
--
ALTER TABLE `files`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=331;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
