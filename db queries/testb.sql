-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: testdb
-- ------------------------------------------------------
-- Server version	5.5.5-10.11.14-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `department_name` varchar(100) NOT NULL,
  `is_dept_tech` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  CONSTRAINT `CONSTRAINT_1` CHECK (`is_dept_tech` in (0,1))
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designations`
--

DROP TABLE IF EXISTS `designations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `department_id` int(10) unsigned NOT NULL,
  `designation_name` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `designations_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designations`
--

LOCK TABLES `designations` WRITE;
/*!40000 ALTER TABLE `designations` DISABLE KEYS */;
/*!40000 ALTER TABLE `designations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `employee_id` varchar(20) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `department` int(10) unsigned NOT NULL,
  `designation` int(10) unsigned NOT NULL,
  `reporting_manager_id` int(10) unsigned NOT NULL,
  `is_reporting_manager` tinyint(4) DEFAULT 0,
  `joining_date` date DEFAULT NULL,
  `employee_status` int(10) unsigned DEFAULT NULL,
  `employee_type` varchar(2) DEFAULT NULL,
  `employee_work_place` varchar(30) DEFAULT NULL,
  `notice_period` varchar(20) DEFAULT NULL,
  `nationality` varchar(50) DEFAULT NULL,
  `official_email` varchar(100) DEFAULT NULL,
  `landline_number` varchar(20) DEFAULT NULL,
  `landline_ext_num` varchar(20) DEFAULT NULL,
  `official_mobile_number` varchar(20) DEFAULT NULL,
  `passport_number` varchar(20) DEFAULT NULL,
  `passport_issue_date` date DEFAULT NULL,
  `passport_expiry` date DEFAULT NULL,
  `passport_issue_place` varchar(50) DEFAULT NULL,
  `visa_number` varchar(50) DEFAULT NULL,
  `visa_issue_date` date DEFAULT NULL,
  `visa_expiry_date` date DEFAULT NULL,
  `civil_id_number` varchar(20) DEFAULT NULL,
  `civil_issue_date` date DEFAULT NULL,
  `civil_expiry_date` date DEFAULT NULL,
  `qualification_name` varchar(100) DEFAULT NULL,
  `course_completed_year` int(10) unsigned DEFAULT NULL,
  `university_college` varchar(200) DEFAULT NULL,
  `last_company_name` varchar(50) DEFAULT NULL,
  `years_in_last_company` float DEFAULT NULL,
  `total_years_exp_while_joining` float DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('M','F','O') DEFAULT NULL,
  `marital_status` varchar(15) DEFAULT NULL,
  `local_residential_address` text DEFAULT NULL,
  `permanent_address` text DEFAULT NULL,
  `personal_email_id` varchar(50) DEFAULT NULL,
  `personal_mobile_number` varchar(15) DEFAULT NULL,
  `blood_group` varchar(5) DEFAULT NULL,
  `emergency_contact_name1` varchar(50) DEFAULT NULL,
  `emergency_contact_number1` varchar(15) DEFAULT NULL,
  `emergency_contact_email_id1` varchar(50) DEFAULT NULL,
  `emergency_contact_name2` varchar(50) DEFAULT NULL,
  `emergency_contact_number2` varchar(15) DEFAULT NULL,
  `emergency_contact_email_id2` varchar(50) DEFAULT NULL,
  `basic_salary` decimal(10,3) DEFAULT 0.000,
  `hr_allowance` decimal(10,3) DEFAULT 0.000,
  `transport_allowance` decimal(10,3) DEFAULT 0.000,
  `other_allowances` decimal(10,3) DEFAULT 0.000,
  `total_salary` decimal(12,3) DEFAULT 0.000,
  `pasi_eligibility` tinyint(4) DEFAULT 0,
  `mobile_entitlement` int(11) DEFAULT NULL,
  `air_fare_value` decimal(8,3) DEFAULT NULL,
  `bank_name` varchar(100) DEFAULT NULL,
  `branch_name` varchar(100) DEFAULT NULL,
  `account_number` varchar(50) DEFAULT NULL,
  `name_as_in_bank` varchar(100) DEFAULT NULL,
  `remarks` varchar(1000) DEFAULT NULL,
  `emp_live_status` tinyint(4) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `last_updated` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee_id` (`employee_id`),
  KEY `reporting_manager_id` (`reporting_manager_id`),
  KEY `employee_department` (`department`),
  KEY `employee_designation` (`designation`),
  CONSTRAINT `employee_department` FOREIGN KEY (`department`) REFERENCES `departments` (`id`),
  CONSTRAINT `employee_designation` FOREIGN KEY (`designation`) REFERENCES `designations` (`id`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`reporting_manager_id`) REFERENCES `employees` (`id`),
  CONSTRAINT `CONSTRAINT_1` CHECK (`is_reporting_manager` in (0,1)),
  CONSTRAINT `CONSTRAINT_2` CHECK (`pasi_eligibility` in (0,1)),
  CONSTRAINT `CONSTRAINT_3` CHECK (`emp_live_status` in (0,1))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'AEC001','Test','User',1,1,0,1,NULL,NULL,NULL,NULL,NULL,'Omani',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0.000,0.000,0.000,0.000,0.000,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2026-02-03 07:58:45','2026-02-03 07:59:54');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_roles`
--

DROP TABLE IF EXISTS `system_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(70) NOT NULL,
  `description` varchar(400) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_roles`
--

LOCK TABLES `system_roles` WRITE;
/*!40000 ALTER TABLE `system_roles` DISABLE KEYS */;
INSERT INTO `system_roles` VALUES (1,'DIRECTOR','CEO to view all the dashboards','2026-02-03 11:15:36','2026-02-03 11:15:36'),(2,'SUPER_ADMIN','IT & System Configuration','2026-02-03 11:15:36','2026-02-03 11:15:36'),(3,'HR_MANAGER','HR Head - Salaries & People','2026-02-03 11:15:36','2026-02-03 11:15:36'),(4,'FINANCE_MANAGER','Finance Head - Treasury & Payouts','2026-02-03 11:15:36','2026-02-03 11:15:36'),(5,'ACCOUNTANT','Accountant - Records & Vouchers','2026-02-03 11:15:36','2026-02-03 11:15:36'),(6,'TENDER_MANAGER','Tender Head - Pricing & Submission','2026-02-03 11:15:36','2026-02-03 11:15:36'),(7,'TENDER_ADMIN','Tender Staff - Estimation','2026-02-03 11:15:36','2026-02-03 11:15:36'),(8,'PROJECT_MANAGER','Project Leads - Operational Approvals and General Managers','2026-02-03 11:15:36','2026-02-03 11:15:36'),(9,'EMPLOYEE','General Staff - Self Service','2026-02-03 11:15:36','2026-02-03 11:15:36');
/*!40000 ALTER TABLE `system_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_pk` int(10) unsigned NOT NULL,
  `username` varchar(20) NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `last_login` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `employee_pk` (`employee_pk`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`employee_pk`) REFERENCES `employees` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `system_roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'AEC001',1,'$2b$10$Yeg4A7AfrJrwZCzYWRpS9.cKI82vKincSIN29csVz4rBWP2AMFBLa','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6MSwidXNlcm5hbWUiOiJBRUMwMDEiLCJyb2xlIjoiRElSRUNUT1IifSwiaWF0IjoxNzcxODMyODkwLCJleHAiOjE3NzI0Mzc2OTB9.2GkydkIZ6vMKHqr5811o4ZW-hIcLwSUhyVVYUkS-YkQ',1,NULL,'2026-02-03 12:01:50','2026-02-23 11:48:10');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-23 13:40:20
