-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2018 at 02:39 AM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `493_save_state`
--

-- --------------------------------------------------------

--
-- Table structure for table `active_block`
--

CREATE TABLE `active_block` (
  `pos_x` int(10) NOT NULL,
  `pos_y` int(10) NOT NULL,
  `shape_matrix` int(11) NOT NULL,
  `rotation` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `active_block`
--

INSERT INTO `active_block` (`pos_x`, `pos_y`, `shape_matrix`, `rotation`) VALUES
(4, 6, 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `board`
--

CREATE TABLE `board` (
  `col_num` int(11) NOT NULL DEFAULT '0',
  `row_num` int(11) NOT NULL DEFAULT '0',
  `value` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `board`
--

INSERT INTO `board` (`col_num`, `row_num`, `value`) VALUES
(0, 0, 0),
(1, 0, 0),
(2, 0, 0),
(3, 0, 0),
(4, 0, 0),
(5, 0, 0),
(6, 0, 0),
(7, 0, 0),
(8, 0, 0),
(9, 0, 0),
(0, 1, 0),
(1, 1, 0),
(2, 1, 0),
(3, 1, 0),
(4, 1, 0),
(5, 1, 0),
(6, 1, 0),
(7, 1, 0),
(8, 1, 0),
(9, 1, 0),
(0, 2, 0),
(1, 2, 0),
(2, 2, 0),
(3, 2, 0),
(4, 2, 0),
(5, 2, 0),
(6, 2, 0),
(7, 2, 0),
(8, 2, 0),
(9, 2, 0),
(0, 3, 0),
(1, 3, 0),
(2, 3, 0),
(3, 3, 0),
(4, 3, 0),
(5, 3, 0),
(6, 3, 0),
(7, 3, 0),
(8, 3, 0),
(9, 3, 0),
(0, 4, 0),
(1, 4, 0),
(2, 4, 0),
(3, 4, 0),
(4, 4, 0),
(5, 4, 0),
(6, 4, 0),
(7, 4, 0),
(8, 4, 0),
(9, 4, 0),
(0, 5, 0),
(1, 5, 0),
(2, 5, 0),
(3, 5, 0),
(4, 5, 0),
(5, 5, 0),
(6, 5, 0),
(7, 5, 0),
(8, 5, 0),
(9, 5, 0),
(0, 6, 0),
(1, 6, 0),
(2, 6, 0),
(3, 6, 0),
(4, 6, 0),
(5, 6, 4),
(6, 6, 0),
(7, 6, 0),
(8, 6, 0),
(9, 6, 0),
(0, 7, 0),
(1, 7, 0),
(2, 7, 0),
(3, 7, 0),
(4, 7, 0),
(5, 7, 4),
(6, 7, 0),
(7, 7, 0),
(8, 7, 0),
(9, 7, 0),
(0, 8, 0),
(1, 8, 0),
(2, 8, 0),
(3, 8, 0),
(4, 8, 4),
(5, 8, 4),
(6, 8, 0),
(7, 8, 0),
(8, 8, 0),
(9, 8, 0),
(0, 9, 0),
(1, 9, 0),
(2, 9, 0),
(3, 9, 0),
(4, 9, 0),
(5, 9, 0),
(6, 9, 0),
(7, 9, 0),
(8, 9, 0),
(9, 9, 0),
(0, 10, 0),
(1, 10, 0),
(2, 10, 0),
(3, 10, 0),
(4, 10, 0),
(5, 10, 0),
(6, 10, 0),
(7, 10, 0),
(8, 10, 0),
(9, 10, 0),
(0, 11, 0),
(1, 11, 0),
(2, 11, 0),
(3, 11, 0),
(4, 11, 0),
(5, 11, 0),
(6, 11, 0),
(7, 11, 0),
(8, 11, 0),
(9, 11, 0),
(0, 12, 0),
(1, 12, 0),
(2, 12, 0),
(3, 12, 0),
(4, 12, 0),
(5, 12, 0),
(6, 12, 0),
(7, 12, 0),
(8, 12, 0),
(9, 12, 0),
(0, 13, 0),
(1, 13, 0),
(2, 13, 0),
(3, 13, 0),
(4, 13, 0),
(5, 13, 0),
(6, 13, 0),
(7, 13, 0),
(8, 13, 0),
(9, 13, 0),
(0, 14, 0),
(1, 14, 0),
(2, 14, 0),
(3, 14, 0),
(4, 14, 0),
(5, 14, 0),
(6, 14, 0),
(7, 14, 0),
(8, 14, 0),
(9, 14, 0),
(0, 15, 0),
(1, 15, 0),
(2, 15, 0),
(3, 15, 0),
(4, 15, 0),
(5, 15, 0),
(6, 15, 0),
(7, 15, 0),
(8, 15, 0),
(9, 15, 0),
(0, 16, 0),
(1, 16, 0),
(2, 16, 0),
(3, 16, 0),
(4, 16, 0),
(5, 16, 0),
(6, 16, 0),
(7, 16, 0),
(8, 16, 0),
(9, 16, 0),
(0, 17, 0),
(1, 17, 6),
(2, 17, 0),
(3, 17, 0),
(4, 17, 0),
(5, 17, 0),
(6, 17, 0),
(7, 17, 0),
(8, 17, 0),
(9, 17, 0),
(0, 18, 6),
(1, 18, 6),
(2, 18, 0),
(3, 18, 0),
(4, 18, 0),
(5, 18, 0),
(6, 18, 0),
(7, 18, 3),
(8, 18, 0),
(9, 18, 0),
(0, 19, 6),
(1, 19, 1),
(2, 19, 1),
(3, 19, 1),
(4, 19, 1),
(5, 19, 3),
(6, 19, 3),
(7, 19, 3),
(8, 19, 0),
(9, 19, 0);

-- --------------------------------------------------------

--
-- Table structure for table `next_block`
--

CREATE TABLE `next_block` (
  `shape_matrix` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `next_block`
--

INSERT INTO `next_block` (`shape_matrix`) VALUES
(2);

-- --------------------------------------------------------

--
-- Table structure for table `other_vars`
--

CREATE TABLE `other_vars` (
  `boardHeight` int(11) NOT NULL,
  `boardWidth` int(11) NOT NULL,
  `changePowerups` int(11) NOT NULL DEFAULT '0',
  `level` int(11) NOT NULL DEFAULT '0',
  `player_name` varchar(15) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `other_vars`
--

INSERT INTO `other_vars` (`boardHeight`, `boardWidth`, `changePowerups`, `level`, `player_name`, `score`) VALUES
(20, 10, 1, 1, 'Thien', 20);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `board`
--
ALTER TABLE `board`
  ADD KEY `col_number` (`col_num`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
