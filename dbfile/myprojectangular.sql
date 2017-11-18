-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2017 at 01:24 PM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 7.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myprojectangular`
--

-- --------------------------------------------------------

--
-- Table structure for table `ma_access_menu_list`
--

CREATE TABLE `ma_access_menu_list` (
  `aml_id` int(11) NOT NULL,
  `aml_menu_name` varchar(100) NOT NULL,
  `aml_router_link` varchar(100) NOT NULL,
  `aml_checked` varchar(50) NOT NULL,
  `aml_status` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ma_access_menu_list`
--

INSERT INTO `ma_access_menu_list` (`aml_id`, `aml_menu_name`, `aml_router_link`, `aml_checked`, `aml_status`) VALUES
(1, 'Dashboard', 'dashboard', 'true', 1),
(2, 'My Farm', 'myfarm', 'false', 1),
(3, 'Seed Search', 'seedsearch', 'false', 1),
(4, 'Users', 'users', 'false', 1),
(5, 'My Bioregion', 'mybioregion', 'false', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ma_bio_region`
--

CREATE TABLE `ma_bio_region` (
  `br_id` int(11) NOT NULL,
  `br_user_id` int(11) NOT NULL,
  `br_region_name` varchar(100) NOT NULL,
  `br_region_location_name` text NOT NULL,
  `br_loc_lat` varchar(150) NOT NULL,
  `br_loc_lng` varchar(150) NOT NULL,
  `br_upload_id` text NOT NULL,
  `br_created_at` datetime NOT NULL,
  `br_status` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ma_bio_region`
--

INSERT INTO `ma_bio_region` (`br_id`, `br_user_id`, `br_region_name`, `br_region_location_name`, `br_loc_lat`, `br_loc_lng`, `br_upload_id`, `br_created_at`, `br_status`) VALUES
(1, 3, 'vbn', 'v', '53.90726189999999', '-122.75519129999998', '1855', '2017-11-18 11:27:28', 1),
(2, 3, 'Test', 'Coimbatore-Ooty-Gundlupet Hwy, India', '11.4069393', '76.71459249999998', '4228', '2017-11-18 11:31:57', 1),
(3, 3, 'Test', 'Coimbatore-Ooty-Gundlupet Hwy, India', '11.4069393', '76.71459249999998', '4228', '2017-11-18 11:31:57', 1),
(4, 3, 'Test region', 'State Hwy N, Middle Brook, MO 63656, USA', '37.599699166466145', '-90.8011796875', '6989', '2017-11-18 11:34:39', 1),
(5, 3, 'Gopal', 'Erode-Chennimalai Rd, Anna Nagar, SIDCO Industrial Estate, Jaganathapuram Colony, Erode, Tamil Nadu 638001, India', '11.3270788', '77.7203217', '3750', '2017-11-18 11:56:25', 1),
(6, 3, 'Good', 'Eros Rd, Pretoria, South Africa', '-25.799948', '28.326013999999986', '7698', '2017-11-18 11:57:28', 1),
(7, 3, 'Yesy', 'Bangalore Nilgiri Rd, Lashkar Mohalla, Doora, Mysuru, Karnataka, India', '12.3116987', '76.65876509999998', '6286', '2017-11-18 11:59:16', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ma_registeruser`
--

CREATE TABLE `ma_registeruser` (
  `mr_id` int(11) NOT NULL,
  `mr_firstname` varchar(100) NOT NULL,
  `mr_lastname` varchar(100) NOT NULL,
  `mr_emailid` varchar(100) NOT NULL,
  `mr_password` text NOT NULL,
  `mr_userttype` enum('gf','bs') NOT NULL,
  `mr_createdate` datetime NOT NULL,
  `mr_status` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='user details from register';

--
-- Dumping data for table `ma_registeruser`
--

INSERT INTO `ma_registeruser` (`mr_id`, `mr_firstname`, `mr_lastname`, `mr_emailid`, `mr_password`, `mr_userttype`, `mr_createdate`, `mr_status`) VALUES
(1, 'adfg', 'adfg', 'sdfg', 'sdfg', 'gf', '2017-11-06 10:31:46', 1),
(2, 'gopal', 'k', 'nvb@gmail.com', '123456', 'bs', '2017-11-06 10:52:06', 1),
(3, 'George', 'test', 'test@test.com', 'DdRfAzFmW/UOxcCfDbtSqJsHMq1n7AjOCpPnHTPP9zs=', 'gf', '2017-11-06 11:08:18', 1),
(4, 'test', 'test', 'test@testy.cm', 'Z2gqO3vX/p6pJBnKCJSsMvsVVJWD97zDmMY5NpNhlaU=', 'gf', '2017-11-06 11:08:44', 1),
(5, 'user', 'esr', 'nvb@gmail.dmc', 'T4aLtvBom5mwVxImHJKAnFKKsHeY3g/NH1Najv3ceYE=', 'gf', '2017-11-06 11:31:27', 1),
(6, 'del', 'fe', 'del@sdfg.fds', 'V4zYH2R0wZjqsQhiuITGoMC5EbV/ypEPaJrNxc2a3yI=', 'gf', '2017-11-06 11:32:43', 1),
(7, 'Gopal', 'Admin', 'gopaladmin@gmail.com', '0mA3E66onMC9ACUy+yrlAwpCvsI2/G3aLXyIXRC4F5g=', 'bs', '2017-11-16 14:01:41', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ma_reg_user_type`
--

CREATE TABLE `ma_reg_user_type` (
  `mrut.id` int(5) NOT NULL,
  `mrut_name_abrev` varchar(20) NOT NULL,
  `mrut_name` varchar(100) NOT NULL,
  `mrut_status` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='register user types';

--
-- Dumping data for table `ma_reg_user_type`
--

INSERT INTO `ma_reg_user_type` (`mrut.id`, `mrut_name_abrev`, `mrut_name`, `mrut_status`) VALUES
(1, 'gf', 'Gardener/Farmer', 1),
(2, 'bs', 'Breeder/Seed Grower', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ma_seed_files`
--

CREATE TABLE `ma_seed_files` (
  `sf_id` int(11) NOT NULL,
  `sf_about_file` text NOT NULL,
  `sf_file_name` text NOT NULL,
  `sf_file_url` text NOT NULL,
  `sf_upload_id` text NOT NULL,
  `sf_upload_by` int(11) NOT NULL,
  `sf_upload_date` datetime NOT NULL,
  `sf_status` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ma_seed_files`
--

INSERT INTO `ma_seed_files` (`sf_id`, `sf_about_file`, `sf_file_name`, `sf_file_url`, `sf_upload_id`, `sf_upload_by`, `sf_upload_date`, `sf_status`) VALUES
(1, 'Album test1', 'company_3_1100.jpg', 'uploads/company_3_1100.jpg', '1100', 3, '2017-11-10 18:14:27', 1),
(2, 'Album test1', 'england_3_1100.jpg', 'uploads/england_3_1100.jpg', '1100', 3, '2017-11-10 18:14:27', 1),
(3, 'Album test1', 'france_3_1100.jpg', 'uploads/france_3_1100.jpg', '1100', 3, '2017-11-10 18:14:27', 1),
(4, 'Test', 'fileupload_3_6046.png', 'uploads/fileupload_3_6046.png', '6046', 3, '2017-11-14 12:00:19', 1),
(5, 'hi', 'france_3_7740.jpg', 'uploads/france_3_7740.jpg', '7740', 3, '2017-11-17 15:47:35', 1),
(6, 'hello', 'images_3_7750.png', 'uploads/images_3_7750.png', '7750', 3, '2017-11-17 15:48:31', 1),
(7, 'vbn', 'france_3_1855.jpg', 'uploads/france_3_1855.jpg', '1855', 3, '2017-11-18 11:27:28', 1),
(8, 'Test', 'nature1_3_4228.jpg', 'uploads/nature1_3_4228.jpg', '4228', 3, '2017-11-18 11:31:57', 1),
(9, 'Test', 'nature2_3_4228.jpg', 'uploads/nature2_3_4228.jpg', '4228', 3, '2017-11-18 11:31:57', 1),
(10, 'Test region', 'natureandoutside1_3_6989.jpg', 'uploads/natureandoutside1_3_6989.jpg', '6989', 3, '2017-11-18 11:34:39', 1),
(11, 'Test region', 'natureandoutside2_3_6989.jpg', 'uploads/natureandoutside2_3_6989.jpg', '6989', 3, '2017-11-18 11:34:39', 1),
(12, 'Gopal', 'nature1_3_3750.jpg', 'uploads/nature1_3_3750.jpg', '3750', 3, '2017-11-18 11:56:25', 1),
(13, 'Gopal', 'nature2_3_3750.jpg', 'uploads/nature2_3_3750.jpg', '3750', 3, '2017-11-18 11:56:25', 1),
(14, 'Gopal', 'natureandoutside1_3_3750.jpg', 'uploads/natureandoutside1_3_3750.jpg', '3750', 3, '2017-11-18 11:56:25', 1),
(15, 'Gopal', 'natureandoutside2_3_3750.jpg', 'uploads/natureandoutside2_3_3750.jpg', '3750', 3, '2017-11-18 11:56:25', 1),
(16, 'Good', 'java-developer_3_7698.jpg', 'uploads/java-developer_3_7698.jpg', '7698', 3, '2017-11-18 11:57:28', 1),
(17, 'Yesy', 'images_3_6286.png', 'uploads/images_3_6286.png', '6286', 3, '2017-11-18 11:59:16', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ma_users`
--

CREATE TABLE `ma_users` (
  `mu_id` int(11) NOT NULL,
  `mu_firstname` varchar(100) NOT NULL,
  `mu_lastname` varchar(100) NOT NULL,
  `mu_emailid` varchar(100) NOT NULL,
  `mu_password` text NOT NULL,
  `mu_user_role` varchar(100) NOT NULL,
  `mu_createdby` int(11) NOT NULL,
  `mu_createdate` datetime NOT NULL,
  `mu_status` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='admin''s added user details';

--
-- Dumping data for table `ma_users`
--

INSERT INTO `ma_users` (`mu_id`, `mu_firstname`, `mu_lastname`, `mu_emailid`, `mu_password`, `mu_user_role`, `mu_createdby`, `mu_createdate`, `mu_status`) VALUES
(1, 'Test', 'george', 'george@gmail.com', 'Z2gqO3vX/p6pJBnKCJSsMvsVVJWD97zDmMY5NpNhlaU=', '1', 3, '2017-11-10 18:13:09', 1),
(2, 'Suman', 'G', 'suman@mdd.com', 'Z2gqO3vX/p6pJBnKCJSsMvsVVJWD97zDmMY5NpNhlaU=', '2', 3, '2017-11-10 18:13:43', 1),
(3, '', '', '', '898yruPnlCxu8zJhGmU2RPWENvUgPRY4O/nev+gT3K8=', '', 3, '2017-11-15 12:22:56', 1),
(4, 'test', 'new', 'new@gmail.com', 'ZcXUbXVYMwzInjYNlE1zEvhq3X+kABSBNTJdIcH8L9w=', '2', 3, '2017-11-17 14:43:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ma_user_roles`
--

CREATE TABLE `ma_user_roles` (
  `ur_id` int(11) NOT NULL,
  `ur_name` varchar(100) NOT NULL,
  `ur_roles` text NOT NULL,
  `ur_created_at` datetime NOT NULL,
  `ur_created_by` int(11) NOT NULL,
  `ur_status` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='user roles here';

--
-- Dumping data for table `ma_user_roles`
--

INSERT INTO `ma_user_roles` (`ur_id`, `ur_name`, `ur_roles`, `ur_created_at`, `ur_created_by`, `ur_status`) VALUES
(1, 'Role 12', 'a:2:{i:0;s:9:\"dashboard\";i:1;s:5:\"users\";}', '0000-00-00 00:00:00', 3, 1),
(5, 'Test', 'a:2:{i:0;s:9:\"dashboard\";i:1;s:6:\"myfarm\";}', '2017-11-15 15:38:05', 3, 1),
(6, 'Testt', 'a:1:{i:0;s:9:\"dashboard\";}', '2017-11-16 12:58:24', 3, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ma_access_menu_list`
--
ALTER TABLE `ma_access_menu_list`
  ADD PRIMARY KEY (`aml_id`);

--
-- Indexes for table `ma_bio_region`
--
ALTER TABLE `ma_bio_region`
  ADD PRIMARY KEY (`br_id`);

--
-- Indexes for table `ma_registeruser`
--
ALTER TABLE `ma_registeruser`
  ADD PRIMARY KEY (`mr_id`);

--
-- Indexes for table `ma_reg_user_type`
--
ALTER TABLE `ma_reg_user_type`
  ADD PRIMARY KEY (`mrut.id`);

--
-- Indexes for table `ma_seed_files`
--
ALTER TABLE `ma_seed_files`
  ADD PRIMARY KEY (`sf_id`);

--
-- Indexes for table `ma_users`
--
ALTER TABLE `ma_users`
  ADD PRIMARY KEY (`mu_id`),
  ADD KEY `fk_admin_id` (`mu_createdby`);

--
-- Indexes for table `ma_user_roles`
--
ALTER TABLE `ma_user_roles`
  ADD PRIMARY KEY (`ur_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ma_access_menu_list`
--
ALTER TABLE `ma_access_menu_list`
  MODIFY `aml_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `ma_bio_region`
--
ALTER TABLE `ma_bio_region`
  MODIFY `br_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `ma_registeruser`
--
ALTER TABLE `ma_registeruser`
  MODIFY `mr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `ma_reg_user_type`
--
ALTER TABLE `ma_reg_user_type`
  MODIFY `mrut.id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `ma_seed_files`
--
ALTER TABLE `ma_seed_files`
  MODIFY `sf_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `ma_users`
--
ALTER TABLE `ma_users`
  MODIFY `mu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `ma_user_roles`
--
ALTER TABLE `ma_user_roles`
  MODIFY `ur_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `ma_users`
--
ALTER TABLE `ma_users`
  ADD CONSTRAINT `fk_admin_id` FOREIGN KEY (`mu_createdby`) REFERENCES `ma_registeruser` (`mr_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
