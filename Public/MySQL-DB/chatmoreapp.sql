-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 02, 2023 at 06:34 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chatmoreapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `chatmoregroups`
--

CREATE TABLE `chatmoregroups` (
  `groupid` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `groupname` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `admins` mediumtext COLLATE utf8mb4_bin NOT NULL,
  `members` mediumtext COLLATE utf8mb4_bin NOT NULL,
  `chatlogs` longtext COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `chatmoregroups`
--

INSERT INTO `chatmoregroups` (`groupid`, `groupname`, `admins`, `members`, `chatlogs`) VALUES
('ID1670316686677', 'Sports Preview', '', '', '{\"sento\":\"ID1670316686677\", \"Id\":1674616616395, \"from\":\"reformer\", \"Msg\":\"Hello my people\", \"time\":\"04:16\"},{\"sento\":\"ID1670316686677\", \"Id\":1674616649229, \"from\":\"reformer\", \"Msg\":\"I hope all is well\", \"time\":\"04:17\"},{\"sento\":\"ID1670316686677\", \"Id\":1674703129467, \"from\":\"mary\", \"Msg\":\"just joined now\", \"time\":\"04:18\"},{\"sento\":\"ID1670316686677\", \"Id\":1674703139089, \"from\":\"mary\", \"Msg\":\"what\'s happening here?\", \"time\":\"04:18\"},{\"sento\":\"ID1670316686677\", \"Id\":1674789609976, \"from\":\"franky\", \"Msg\":\"Whats the live score guys\", \"time\":\"04:20\"},{\"sento\":\"ID1670316686677\", \"Id\":1674789622719, \"from\":\"franky\", \"Msg\":\"I really missed the City match\", \"time\":\"04:20\"},{\"sento\":\"ID1670316686677\", \"Id\":1674876113136, \"from\":\"deguru\", \"Msg\":\"Even me too\", \"time\":\"04:21\"},{\"sento\":\"ID1670316686677\", \"Id\":1674876120908, \"from\":\"deguru\", \"Msg\":\"but we move<!laf\", \"time\":\"04:22\"},{\"sento\":\"ID1670316686677\", \"Id\":1674878319469, \"from\":\"franky\", \"Msg\":\"regardless <!lol\", \"time\":\"04:58\"},{\"sento\":\"ID1670316686677\", \"Id\":1674880253207, \"from\":\"ahmed\", \"Msg\":\"latest update guys\", \"time\":\"05:30\"},{\"sento\":\"ID1670316686677\", \"Id\":1674880275100, \"from\":\"mary\", \"Msg\":\"City trashed Arsenal<!nag\", \"time\":\"05:31\"},{\"sento\":\"ID1670316686677\", \"Id\":1674935118453, \"from\":\"franky\", \"Msg\":\"yes we did it for a reason\", \"time\":\"20:45\"},{\"sento\":\"ID1670316686677\", \"Id\":1675008252987, \"from\":\"mary\", \"Msg\":\"what reason?\", \"time\":\"17:04\"},{\"sento\":\"ID1670316686677\", \"Id\":1675008574102, \"from\":\"franky\", \"Msg\":\"known only to us<!laf\", \"time\":\"17:09\"},{\"sento\":\"ID1670316686677\", \"Id\":1675008590022, \"from\":\"mary\", \"Msg\":\"like seriously\", \"time\":\"17:09\"},{\"sento\":\"ID1670316686677\", \"Id\":1675008603259, \"from\":\"franky\", \"Msg\":\"believe me when I tell you\", \"time\":\"17:10\"},{\"sento\":\"ID1670316686677\", \"Id\":1675008703722, \"from\":\"mary\", \"Msg\":\"sure i do\", \"time\":\"17:11\"},{\"sento\":\"ID1670316686677\", \"Id\":1675089068036, \"from\":\"ahmed\", \"Msg\":\"hello\", \"time\":\"15:31\"},{\"sento\":\"ID1670316686677\", \"Id\":1675089717451, \"from\":\"nelson\", \"Msg\":\"hi\", \"time\":\"15:41\"},{\"sento\":\"ID1670316686677\", \"Id\":1675142285869, \"from\":\"ahmed\", \"Msg\":\"was up\", \"time\":\"06:18\"},{\"sento\":\"ID1670316686677\", \"Id\":1675152549602, \"from\":\"ahmed\", \"Msg\":\"hello\", \"time\":\"09:09\"},{\"sento\":\"ID1670316686677\", \"Id\":1675257377517, \"from\":\"ahmed\", \"Msg\":\"yeah\", \"time\":\"14:16\"},{\"sento\":\"ID1670316686677\", \"Id\":1675257416609, \"from\":\"ahmed\", \"Msg\":\"hello\", \"time\":\"14:16\"},{\"sento\":\"ID1670316686677\", \"Id\":1675257431056, \"from\":\"ahmed\", \"Msg\":\"was up allemo!!laf\", \"time\":\"14:17\"},{\"sento\":\"ID1670316686677\", \"Id\":1675359031724, \"from\":\"walkingdead\", \"Msg\":\"hello @ahmed\", \"time\":\"18:30\"}'),
('ID1670316762324', 'Technology', '', '', '{\"sento\":\"ID1670316762324\", \"Id\":1674616630850, \"from\":\"reformer\", \"Msg\":\"Hoe is it going in here\", \"time\":\"04:17\"},{\"sento\":\"ID1670316762324\", \"Id\":1674616675114, \"from\":\"reformer\", \"Msg\":\"doing well right?\", \"time\":\"04:17\"},{\"sento\":\"ID1670316762324\", \"Id\":1674703153053, \"from\":\"mary\", \"Msg\":\"lets talk about tech\", \"time\":\"04:19\"},{\"sento\":\"ID1670316762324\", \"Id\":1674703155564, \"from\":\"mary\", \"Msg\":\"shall we\", \"time\":\"04:19\"},{\"sento\":\"ID1670316762324\", \"Id\":1674703168384, \"from\":\"mary\", \"Msg\":\"it will be interesting\", \"time\":\"04:19\"},{\"sento\":\"ID1670316762324\", \"Id\":1674789633944, \"from\":\"franky\", \"Msg\":\"like kind of what\", \"time\":\"04:20\"},{\"sento\":\"ID1670316762324\", \"Id\":1674789641457, \"from\":\"franky\", \"Msg\":\"are we to talk about\", \"time\":\"04:20\"},{\"sento\":\"ID1670316762324\", \"Id\":1674876146060, \"from\":\"deguru\", \"Msg\":\"I have something in mind \", \"time\":\"04:22\"},{\"sento\":\"ID1670316762324\", \"Id\":1674876152697, \"from\":\"deguru\", \"Msg\":\"who cares to know\", \"time\":\"04:22\"},{\"sento\":\"ID1670316762324\", \"Id\":1674878438464, \"from\":\"franky\", \"Msg\":\"I bro, especially UX Development\", \"time\":\"05:00\"},{\"sento\":\"ID1670316762324\", \"Id\":1674885013944, \"from\":\"franky\", \"Msg\":\"hello people\", \"time\":\"06:50\"},{\"sento\":\"ID1670316762324\", \"Id\":1675359098353, \"from\":\"walkingdead\", \"Msg\":\"was up franky, you have an idea on UX Dev?\", \"time\":\"18:31\"}'),
('ID1670316762329', 'Religion', '', '', '{\"sento\":\"ID1670316762329\", \"Id\":1674935419839, \"from\":\"franky\", \"Msg\":\"Anyone Home?\", \"time\":\"20:50\"},{\"sento\":\"ID1670316762329\", \"Id\":1675014010999, \"from\":\"ahmed\", \"Msg\":\"yeah\", \"time\":\"18:40\"}'),
('ID1670316762339', 'Science', '', '', '{\"sento\":\"ID1670316762339\", \"Id\":1675007124962, \"from\":\"franky\", \"Msg\":\"Science is live therefore live it\", \"time\":\"16:45\"},{\"sento\":\"ID1670316762339\", \"Id\":1675014241456, \"from\":\"ahmed\", \"Msg\":\"absolutely\", \"time\":\"18:44\"}'),
('ID1670316762354', 'Gossip', '', '', '{\"sento\":\"ID1670316762354\", \"Id\":1675013938770, \"from\":\"ahmed\", \"Msg\":\"nothing to gossip about?\", \"time\":\"18:38\"}'),
('ID1670316762374', 'Education', '', '', ''),
('ID1670316762399', 'Music', '', '', ''),
('ID1670316762429', 'Wed Masters', '', '', '{\"sento\":\"ID1670316762429\", \"Id\":1675013960418, \"from\":\"ahmed\", \"Msg\":\"Any Web Master here?\", \"time\":\"18:39\"},{\"sento\":\"ID1670316762429\", \"Id\":1675013968513, \"from\":\"ahmed\", \"Msg\":\"it has been long\", \"time\":\"18:39\"}'),
('ID1670316762464', 'Programming', '', '', '{\"sento\":\"ID1670316762464\", \"Id\":1675009018383, \"from\":\"franky\", \"Msg\":\"who is here\", \"time\":\"17:16\"}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `telephone` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `pwd` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `user_img` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `about` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `friends` longtext COLLATE utf8mb4_bin NOT NULL,
  `chats` longtext COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `telephone`, `pwd`, `user_img`, `about`, `friends`, `chats`) VALUES
('ahmed', '08145494878', '12345', '16764530_jqkmyjqjsa6wjex9i3pv_jpeg71043e6c394bf4d5f20a3e9dc81fadd2.jpg', 'Making a difference in the community is the actual goal of mine', 'franky,mary,nelson,prof', '{\"replyto\":\"franky\",\"from\":\"ahmed\",\"Id\":1675013798518,\"Msg\":\"yeah\",\"time\":\"18:36\"},{\"replyto\":\"prof\",\"from\":\"ahmed\",\"Id\":1675014266764,\"Msg\":\"hello\",\"time\":\"18:44\"},{\"replyto\":\"franky\",\"from\":\"ahmed\",\"Id\":1675089087173,\"Msg\":\"hello\",\"time\":\"15:31\"},{\"replyto\":\"franky\",\"from\":\"ahmed\",\"Id\":1675214320672,\"Msg\":\"helloemo!!smileemo!!smile\",\"time\":\"02:18\"},{\"replyto\":\"prof\",\"from\":\"ahmed\",\"Id\":1675257873322,\"Msg\":\"was up\",\"time\":\"14:24\"},{\"replyto\":\"franky\", \"from\":\"ahmed\", \"Id\":1675268521120, \"Msg\":\"hello\", \"time\":\"17:22\"}'),
('deguru', '07065124789', '12345', 'tinubu.jpg', 'Expertise in web development and Software Engineering', 'franky,mary', '{\"replyto\":\"franky\", \"from\":\"deguru\", \"Id\":1675254608477, \"Msg\":\"Hello\", \"time\":\"13:30\"},{\"replyto\":\"franky\", \"from\":\"deguru\", \"Id\":1675254635310, \"Msg\":\"was up\", \"time\":\"13:30\"}'),
('eliz', '07045879615', '12345', '', 'Hello, I\'m using ChatMore App', 'franky', ''),
('franky', '09145789613', '12345', 'buhari.jpg', 'Gifted in Motivating people to actualize their potentials', 'ahmed,deguru,eliz,mary,prof,reformer,walkingdead', '{\"replyto\":\"eliz\",\"from\":\"franky\",\"Id\":1675014829620,\"Msg\":\"hello sweetheart\",\"time\":\"18:53\"},{\"replyto\":\"reformer\",\"from\":\"franky\",\"Id\":1675014929790,\"Msg\":\"was upemo!!cool\",\"time\":\"18:55\"},{\"replyto\":\"deguru\", \"from\":\"franky\", \"Id\":1675254642358, \"Msg\":\"yeah I am fine\", \"time\":\"13:30\"},{\"replyto\":\"ahmed\", \"from\":\"franky\", \"Id\":1675269277675, \"Msg\":\"was up\", \"time\":\"17:34\"},{\"replyto\":\"ahmed\", \"from\":\"franky\", \"Id\":1675339070062, \"Msg\":\"hi\", \"time\":\"12:57\"},{\"replyto\":\"ahmed\", \"from\":\"franky\", \"Id\":1675339080394, \"Msg\":\"gjhgjh\", \"time\":\"12:58\"},{\"replyto\":\"ahmed\", \"from\":\"franky\", \"Id\":1675339082072, \"Msg\":\"jhgjhghj\", \"time\":\"12:58\"},{\"replyto\":\"ahmed\", \"from\":\"franky\", \"Id\":1675339084326, \"Msg\":\"ddg\", \"time\":\"12:58\"},{\"replyto\":\"ahmed\", \"from\":\"franky\", \"Id\":1675339087149, \"Msg\":\"wrwe\", \"time\":\"12:58\"},{\"replyto\":\"eliz\", \"from\":\"franky\", \"Id\":1675339096130, \"Msg\":\"hello\", \"time\":\"12:58\"},{\"replyto\":\"eliz\", \"from\":\"franky\", \"Id\":1675339098881, \"Msg\":\"dfdgf\", \"time\":\"12:58\"},{\"replyto\":\"eliz\", \"from\":\"franky\", \"Id\":1675339100406, \"Msg\":\"jhgjg\", \"time\":\"12:58\"}'),
('mary', '07369851245', '12345', 'HD-wallpaper-avatar-avatar-movies.jpg', 'Cosmetics and Beauty Accessories is my calling\r\n\r\n', 'ahmed,deguru,franky,reformer,rose', ''),
('nelson', '09135467815', '4566', 'Peter-Obi-1.jpg', 'Prof in Web Dev ', 'ahmed,reformer', ''),
('prof', '07065124781', '12345', '', 'Hello, I\'m using ChatMore App', 'ahmed,franky,rose', ''),
('reformer', '07035124879', '12345', 'FeizYEoWIAMytmR.jpg', 'Mind your Business, Poke nosing ain\'t healthy you know? ', 'franky,mary,nelson', '{\"replyto\":\"mary\", \"from\":\"reformer\", \"Id\":1675023173604, \"Msg\":\"hello\", \"time\":\"21:12\"}'),
('rose', '07035469815', '12345', 'FeizYEoWIAMytmR.jpg', 'Hello, I\'m using ChatMore App', 'mary,prof', '{\"replyto\":\"mary\",\"from\":\"rose\",\"Id\":1675091135511,\"Msg\":\"Hello\",\"time\":\"16:05\"},{\"replyto\":\"mary\", \"from\":\"rose\", \"Id\":1675352740847, \"Msg\":\"was up\", \"time\":\"16:45\"},{\"replyto\":\"prof\", \"from\":\"rose\", \"Id\":1675352751215, \"Msg\":\"Hello Prof\", \"time\":\"16:45\"}'),
('walkingdead', '07136547891', '12345', 'Fresh_Stock_Content.jpg', 'Software Engineer', 'deguru,franky', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chatmoregroups`
--
ALTER TABLE `chatmoregroups`
  ADD PRIMARY KEY (`groupid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `telephone` (`telephone`),
  ADD UNIQUE KEY `username` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
