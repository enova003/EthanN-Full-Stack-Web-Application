-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 11, 2024 at 07:25 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `course_ad`
--

-- --------------------------------------------------------

--
-- Table structure for table `courseadvising`
--

CREATE TABLE `courseadvising` (
  `id` bigint(255) NOT NULL,
  `date` varchar(100) NOT NULL,
  `current_term` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL,
  `last_term` varchar(100) NOT NULL,
  `last_gpa` varchar(50) NOT NULL,
  `prerequisites` varchar(100) NOT NULL,
  `student_name` varchar(100) NOT NULL,
  `planned_courses` varchar(250) NOT NULL,
  `student_email` varchar(100) NOT NULL,
  `rejectionReason` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courseadvising`
--

INSERT INTO `courseadvising` (`id`, `date`, `current_term`, `status`, `last_term`, `last_gpa`, `prerequisites`, `student_name`, `planned_courses`, `student_email`, `rejectionReason`) VALUES
(19, '3/13/2024', 'Spring 2024', 'Rejected', 'Fall 2023', '3.66', 'CS 361', 'Ethan G', 'CS 450', 'e.gabriel0402@gmail.com', 'You must register for at least three (3) courses.'),
(90, '3/20/2024', 'Fall 2024', 'Pending', 'Spring 2024', '3.50', 'CS 250, CS 252, CS 170, CS 381', 'Ethan G', 'CS 330, CS 270, CS 402', 'e.gabriel0402@gmail.com', 'N/A'),
(97, '05/05/2023', 'Summer 2023', 'Approved', 'Spring 2023', '3.24', 'CS 150', 'Travis Harre', 'CS 250, CS 252, CS 381', 'travisharre449@gmail.com', 'N/A'),
(107, '03/25/2024', 'Fall 2024', 'Rejected', 'Spring 2024', '3.28', 'CS 170, CS 250, CS 252', 'Travis Harre', 'CS 270, CS 330', 'travisharre449@gmail.com', 'Student must register for atleast three courses.');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_name` varchar(100) NOT NULL,
  `course_level` varchar(100) NOT NULL,
  `prerequisite` varchar(100) NOT NULL,
  `course_lvlGroup` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_name`, `course_level`, `prerequisite`, `course_lvlGroup`) VALUES
('Introduction to Computer Science with Python', 'CS 115', 'None', '100'),
('Introduction to Information Literacy and Research', 'CS 120G', 'None', '100'),
('Introduction to Information Literacy and Research for Scientists', 'CS 121G', 'None', '100'),
('Honors: Introduction to Information Literacy and Research', 'CS 126G', 'CS 120G', '100'),
('Introduction to Programming with C++', 'CS 150', 'None', '100'),
('Introduction to Programming with Java', 'CS 151', 'None', '100'),
('Introduction to Programming with Python', 'CS 153', 'None', '100'),
('Introduction to Computer Architecture I', 'CS 170', 'CS 150', '100'),
('Programming with C++', 'CS 250', 'CS 150', '200'),
('Introduction to Unix for Programmers', 'CS 252', 'CS 150', '200'),
('Introduction to Computer Architecture II', 'CS 270', 'CS 170', '200'),
('Internet Concepts', 'CS 312', 'CS 252', '300'),
('Object-Oriented Design and Programming', 'CS 330', 'CS 250, CS 252', '300'),
('Introduction to Software Engineering', 'CS 350', 'CS 252, CS 330', '300'),
('Principles of Programming Languages', 'CS 355', 'CS 250, CS252', '300'),
('Data Structures and Algorithms', 'CS 361', 'CS 250, CS 252', '300'),
('Computer Science Internship', 'CS 368', 'None', '300'),
('Introduction to Discrete Structures', 'CS 381', 'CS 150', '300'),
('Introduction to Theoretical Computer Science', 'CS 390', 'CS 250, CS 381', '300'),
('Formal Software Foundations', 'CS 402', 'CS 381', '400'),
('Professional Workforce Development I', 'CS 410', 'CS 330, CS 350, CS 361', '400'),
('Professional Workforce Development II', 'CS 411W', 'CS 330, CS 350, CS 410', '400'),
('Computational Methods and Software', 'CS 417', 'CS 250', '400'),
('Web Programming', 'CS 418', 'CS 312, CS 330', '400'),
('Introduction to Machine Learning', 'CS 422', 'CS 150', '400'),
('Web Server Design', 'CS 431', 'CS 150', '400'),
('Web Science', 'CS 432', 'CS 330, CS 361', '400'),
('App Development for Smart Devices', 'CS 441', 'CS 250, CS 330', '400'),
('Database Concepts', 'CS 450', 'CS 252, CS 361, CS 381', '400'),
('Introduction to Networks and Communications', 'CS 455', 'CS 250, CS 252, CS 270', '400'),
('Computer Graphics', 'CS 460', 'CS 361', '400'),
('Principles and Practice of Cyber Defense', 'CS 466', 'CS 250, CS 270, CS 455', '400'),
('Introduction to Reverse Software Engineering', 'CS 467', 'CS 250, CS 270', '400'),
('Data Analytics for Cybersecurity', 'CS 469', 'CS 455', '400'),
('Operating Systems', 'CS 471', 'CS 150, CS 170, CS 361', '400'),
('Network and Systems Security', 'CS 472', 'CS 361', '400'),
('Systems Programming', 'CS 476', 'CS 330, CS 361', '400'),
('Introduction to Artificial Intelligence', 'CS 480', 'CS 361', '400'),
('Applied Parallel Computing', 'CS 487', 'CS 270, CS 361, CS 417', '400'),
('Principles of Compiler Construction', 'CS 488', 'CS 361', '400'),
('Honors Research I in Computer Science', 'CS 491', 'CS 350', '400'),
('Honors Research II in Computer Science', 'CS 492', 'CS 491', '400'),
('Foundations of Computing', 'CS 500', 'CS 250', '500'),
('Formal Software Foundations', 'CS 502', 'CS 381', '500'),
('Web Programming', 'CS 518', 'CS 312, CS 330', '500'),
('Web Security', 'CS 533', 'CS 312, CS 330', '500'),
('Principles and Practice of Cyber Defense', 'CS 566', 'CS 250, CS 270, CS 455', '500'),
('Algorithms and Data Structures', 'CS 600', 'CS 361, CS 381', '600'),
('Foundations of Cybersecurity', 'CS 610', 'CS 270', '600'),
('Parallel Computer Architecture', 'CS 635', 'CS 665', '600'),
('Computer Architecture', 'CS 665', 'None', '600'),
('Independent Study in Computer Science', 'CS 697', 'None', '600'),
('Applied Algorithms', 'CS 710', 'CS 600', '700'),
('Natural Language Processing', 'CS 733', 'CS 480', '700'),
('Memory Analysis and Forensics', 'CS 762', 'CS 270, CS 471', '700'),
('Blockchains and Cryptocurrencies: Fundamentals, Technologies, and Economics', 'CS 764', 'CS 471, CS 455', '700'),
('Advanced Computer and Network Security', 'CS 772', 'CS 455', '700'),
('Data Mining and Security', 'CS 773', 'CS 471, CS 455', '700'),
('Distributed System Security with .Net', 'CS 774', 'CS 471', '700'),
('Design of Network Protocols', 'CS 779', 'CS 455', '700'),
('Applied Algorithms', 'CS 810', 'CS 600', '800'),
('Natural Language Processing', 'CS 833', 'CS 480', '800'),
('Memory Analysis and Forensics', 'CS 862', 'CS 270, CS 471', '800'),
('Advanced Computer and Network Security', 'CS 872', 'None', '800'),
('Topics in Computer Science ', 'CS 895', 'CS 862, CS 872', '800');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `u_id` int(255) NOT NULL,
  `u_first_name` varchar(20) NOT NULL,
  `u_last_name` varchar(20) NOT NULL,
  `u_email` varchar(35) NOT NULL,
  `u_password` varchar(200) NOT NULL,
  `is_approved` tinyint(1) NOT NULL,
  `is_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`u_id`, `u_first_name`, `u_last_name`, `u_email`, `u_password`, `is_approved`, `is_admin`) VALUES
(1, 'Admin', 'Admin', 'enova003@odu.edu', '$2b$10$T0/38I4.ETjd27yeLO3qE.YAE5dZWCHsJdn59//f0mSaoMkXTp132', 1, 1),
(4, 'test', 'test', 'test@test.com', '$2b$10$fihH187/r4aU/HpD6YwFUOaw6rCjrhSyssQiE0IIqIf75S9xiTRzW', 1, 0),
(19, 'James', 'Baxter', 'test@gmail.com', '$2b$10$dMBS4ZfxsRgCXstjDcUW9OnSbSeM91l9ClP479L33PFb2CH1LvTCm', 0, 0),
(64, 'Brad', 'Way', 'bradway@email.com', '$2b$10$/.5zQSfe3ZfbBlvHV/T04.1D7VBUWkzonEH4tL0xM0QfcItMkFYQG', 0, 0),
(82, 'Ethan', 'G', 'e.gabriel0402@gmail.com', '$2b$10$awMugNHOTEwwR9AgS30wyu.NSRiJvcnmpWfTzXtgLAESgCu34Q2Iu', 1, 0),
(84, 'Travis', 'Harre', 'travisharre449@gmail.com', '$2b$10$dgahSBJcqYrl1QuBHvtlzuR62gDmHZotw4LSNy/gsnm7bwM0s4RAa', 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courseadvising`
--
ALTER TABLE `courseadvising`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD UNIQUE KEY `course_level` (`course_level`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`u_id`),
  ADD UNIQUE KEY `u_email` (`u_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courseadvising`
--
ALTER TABLE `courseadvising`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `u_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
