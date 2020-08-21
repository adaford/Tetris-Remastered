-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2018 at 02:38 AM
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
-- Database: `493_high_scores`
--

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `Name` varchar(15) NOT NULL DEFAULT 'PlayerName',
  `Score` int(11) NOT NULL DEFAULT '0',
  `order_inserted` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`Name`, `Score`, `order_inserted`) VALUES
('Megan', 4715, 1),
('Megan', 565, 2),
('Megan', 310, 3),
('Adam', 305, 4),
('Adam', 310, 5),
('Shawki', 4105, 6),
('Shawki', 7085, 7),
('ADAMFORD', 9700, 115),
('ADAMFORD', 6355, 116),
('Megan', 6175, 117),
('ADAMFORD', 10135, 118),
('Megan', 675, 119),
('weifong', 3415, 120),
('weifong', 5390, 121),
('Megan', 4675, 122),
('Playername', 635, 123),
('Thien', 7430, 124),
('Thien', 1145, 125),
('Megan', 4040, 126);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`order_inserted`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `order_inserted` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
