-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 30 Apr 2020 pada 10.43
-- Versi server: 10.1.38-MariaDB
-- Versi PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pos_app`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(55) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`id`, `name`, `date_created`, `date_updated`) VALUES
(1, 'Indonesian Food', '2020-02-18 00:04:24', '2020-02-18 10:40:28'),
(2, 'Beverages', '2020-02-18 03:47:37', '2020-02-23 15:37:30'),
(3, 'Western', '2020-02-18 11:02:59', '2020-02-18 11:02:59'),
(4, 'Chinese Food', '2020-02-23 15:31:16', '2020-02-23 15:31:16'),
(5, 'Middle Eastern', '2020-02-23 15:35:04', '2020-04-01 04:05:53');

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_order`
--

CREATE TABLE `detail_order` (
  `id` int(11) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `product_id` varchar(8) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `detail_order`
--

INSERT INTO `detail_order` (`id`, `order_id`, `product_id`, `quantity`) VALUES
(11, '0cafd591-0cfb-48d6-9427-238150b04e67', '42325f10', 5),
(12, '0cafd591-0cfb-48d6-9427-238150b04e67', '54a54590', 5),
(13, '2f1a5720-8e1a-4ac7-b805-5f5ae9e18b39', '42325f10', 5),
(14, '2f1a5720-8e1a-4ac7-b805-5f5ae9e18b39', '54a54590', 5),
(15, '2db83c49-347a-4aed-88c5-8d4aaaf46213', '42325f10', 5),
(16, '2db83c49-347a-4aed-88c5-8d4aaaf46213', '54a54590', 5);

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `id` varchar(55) NOT NULL,
  `name` varchar(55) NOT NULL,
  `description` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`id`, `name`, `description`, `quantity`, `image`, `category`, `price`, `date_created`, `date_updated`) VALUES
('6db9d2e0', 'Coto Makasar ', 'Makanan Khas Makasar', 95, 'http://20.20.20.154:5000/pictures/coto-makassar.jpg', 1, 15000, '2020-03-02 12:36:24', '2020-04-04 14:17:42'),
('6dbcc3a0', 'Rawon Daging', 'Makanan Khas Jatim', 98, 'http://20.20.20.154:5000/pictures/rawon-daging.jpg', 1, 15000, '2020-03-02 12:43:33', '2020-03-02 12:43:33'),
('710c8cf0', 'Burger', 'Burger', 23, 'http://20.20.20.154:5000/pictures/burger.jpg', 3, 25000, '2020-03-04 13:17:04', '2020-03-04 13:17:04'),
('72cc3880', 'Fu Yung Hai', 'Fu Yung Hai', 25, 'http://20.20.20.154:5000/pictures/fuyunghai.jpg', 4, 15000, '2020-03-05 01:34:25', '2020-03-05 01:34:25'),
('7ed7d7c0', 'Es Cendol', 'Minuman Segar', 25, 'http://20.20.20.154:5000/pictures/es-cendol.jpg', 2, 5000, '2020-03-02 12:36:53', '2020-03-02 12:36:53'),
('a54k8iwrp5w', 'Beef Steak', 'Beef Steak', 100, 'http://20.20.20.154:5000/pictures/beef-steak.jpg', 3, 30000, '2020-04-02 15:22:51', '2020-04-02 15:22:51'),
('a54k8iwsb8w', 'Chicken Steak', 'Chicken Steak', 100, 'http://20.20.20.154:5000/pictures/chicken-steak.jpg', 3, 25000, '2020-04-02 15:23:20', '2020-04-02 15:23:20'),
('a54k8iwswf2', 'Es Jeruk', 'Es Jeruk', 100, 'http://20.20.20.154:5000/pictures/es-jeruk.jpg', 2, 5000, '2020-04-02 15:23:47', '2020-04-02 15:23:47'),
('a54k8iwucq6', 'Es Teh', 'Es Teh', 100, 'http://20.20.20.154:5000/pictures/es-teh.png', 2, 3000, '2020-04-02 15:24:55', '2020-04-02 15:24:55'),
('a54k8iwv2oa', 'Kebab', 'Kebab', 100, 'http://20.20.20.154:5000/pictures/kebab.jpg', 5, 15000, '2020-04-02 15:25:29', '2020-04-02 15:25:29'),
('a54k8iww3x5', 'Nasi Kebuli', 'Nasi Kebuli', 100, 'http://20.20.20.154:5000/pictures/nasi-kebuli.jpg', 5, 25000, '2020-04-02 15:26:17', '2020-04-02 15:26:17'),
('a5ee4060', 'Es Pisang Ijo', 'Es Pisang enak', 20, 'http://20.20.20.154:5000/pictures/es-pisang-ijo.jpeg', 2, 7000, '2020-03-02 12:37:58', '2020-03-02 12:37:58');

-- --------------------------------------------------------

--
-- Struktur dari tabel `purchase`
--

CREATE TABLE `purchase` (
  `purchase_id` varchar(55) NOT NULL,
  `user` varchar(55) NOT NULL,
  `total` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `purchase`
--

INSERT INTO `purchase` (`purchase_id`, `user`, `total`, `date_created`) VALUES
('670et01v4k8hhruzl', '1', 100000, '2020-04-01 15:35:19'),
('670et01v4k8hhspp7', '1', 430000, '2020-04-01 15:35:58'),
('670et01v4k8hhzuat', '1', 225000, '2020-04-01 15:41:31'),
('670et02ack8hfrbml', 'undefined', 30000, '2020-04-01 14:38:54'),
('670et03gsk8e56wrv', '1', 105000, '2020-03-30 07:19:47'),
('670et05osk8heu9f0', 'undefined', 150000, '2020-04-01 14:13:12'),
('670et05osk8hezkay', 'undefined', 185000, '2020-04-01 14:17:19'),
('670et05osk8hfj3ha', 'undefined', 90000, '2020-04-01 14:32:31'),
('670et05osk8hfkjdr', 'undefined', 30000, '2020-04-01 14:33:38'),
('670et071sk8f9p5sb', '1', 105000, '2020-03-31 02:13:43'),
('670et07vok8gwswie', '1', 375000, '2020-04-01 05:48:15'),
('670et07vok8gy911k', '1', 305000, '2020-04-01 06:28:47'),
('670et0a5sk8irued3', 'undefined', 30000, '2020-04-02 13:05:00'),
('670et0a5sk8irw15l', 'undefined', 30000, '2020-04-02 13:06:16'),
('670et0ag0k8eeg1fh', '1', 7000, '2020-03-30 11:38:50'),
('670et0ag0k8eegejh', '1', 27000, '2020-03-30 11:39:07'),
('670et0b6ok8mostml', 'undefined', 15000, '2020-04-05 06:50:52'),
('670et0bskk8ekewet', '1', 96000, '2020-03-30 14:25:54'),
('670et0cm8k8fea7xu', '1', 48000, '2020-03-31 04:22:04');

-- --------------------------------------------------------

--
-- Struktur dari tabel `purchase_detail`
--

CREATE TABLE `purchase_detail` (
  `no` int(11) NOT NULL,
  `purchase_id` varchar(55) NOT NULL,
  `product_id` varchar(55) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `purchase_detail`
--

INSERT INTO `purchase_detail` (`no`, `purchase_id`, `product_id`, `quantity`) VALUES
(1, '670et02qok8e53ysa', '3gkk8cjxvpu', 6),
(2, '670et03gsk8e56wrv', '3gkk8cjxvpu', 5),
(3, '670et03gsk8e56wrv', '4b040c10', 3),
(4, '670et0ag0k8eeg1fh', '50434d10', 7),
(5, '670et0ag0k8eegejh', '3gkk8cjxvpu', 1),
(6, '670et0ag0k8eegejh', '4b040c10', 1),
(7, '670et0bskk8ekewet', '3gkk8cjxvpu', 8),
(8, '670et071sk8f9p5sb', '3gkk8cjxvpu', 5),
(9, '670et071sk8f9p5sb', '4b040c10', 3),
(10, '670et0cm8k8fea7xu', '3gkk8cjxvpu', 4),
(11, '670et07vok8gwswie', '6db9d2e0', 25),
(12, '670et07vok8gy911k', '6dbcc3a0', 5),
(13, '670et07vok8gy911k', '6db9d2e0', 10),
(14, '670et05osk8heu9f0', '6dbcc3a0', 20),
(15, '670et05osk8hezkay', '6dbcc3a0', 20),
(16, '670et05osk8hezkay', '6db9d2e0', 490),
(17, '670et05osk8hezkay', 'a5ee4060', 25),
(18, '670et05osk8hfj3ha', '6dbcc3a0', 80),
(19, '670et05osk8hfj3ha', '6db9d2e0', 100),
(20, '670et05osk8hfkjdr', '6db9d2e0', 100),
(21, '670et05osk8hfkjdr', '6dbcc3a0', 80),
(22, '670et02ack8hfrbml', '6db9d2e0', 1),
(23, '670et02ack8hfrbml', '6dbcc3a0', 1),
(24, '670et01v4k8hhruzl', '6db9d2e0', 1),
(25, '670et01v4k8hhruzl', '6dbcc3a0', 4),
(26, '670et01v4k8hhruzl', '710c8cf0', 1),
(27, '670et01v4k8hhspp7', '710c8cf0', 1),
(28, '670et01v4k8hhzuat', '6dbcc3a0', 15),
(29, '670et0a5sk8irued3', '6db9d2e0', 1),
(30, '670et0a5sk8irued3', '6dbcc3a0', 1),
(31, '670et0a5sk8irw15l', '6db9d2e0', 1),
(32, '670et0a5sk8irw15l', '6dbcc3a0', 1),
(33, '670et0b6ok8mostml', '6db9d2e0', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` text NOT NULL,
  `status` int(11) NOT NULL,
  `salt` text NOT NULL,
  `password` text NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `status`, `salt`, `password`, `date_created`, `date_updated`) VALUES
(1, 'Admin', 'admin@gmail.com', 1, 'a3687771d9ee1b8ae2', 'b5da122f28ef05383409faed0b8f6e01491891bef466f13ad3ff6fbbfe856583f993a1d4f4d9f3a9cc130580763ba2fa2b3eca55973dc6f77edea531599e56c1', '2020-04-06 12:51:48', '2020-04-06 12:51:48'),
(2, 'Cashier', 'cashier@gmail.com', 2, '904edea28c946a8d87', '637aeaa7f83dbac245f7f1afb1827dc8804e6bd1f9d42f9e1c58a6b65af25a3a9ebdb4e85cc6633de0f1c4235a8d8486a11fde34bffeceb94104201ccfe4e018', '2020-04-06 15:17:51', '2020-04-30 05:34:02'),
(3, 'Adia', 'adia@gmail.com', 1, '38c61dd08eb001d3ae', 'eb9588828ff415d2843caf04e48e71a9b2f3b125aec32c451a20e1fce83cdf5738ab5f2b27bb08842ccb4178bfb49ac15a04937e7f97180929f383fbeaf7476a', '2020-04-29 04:34:56', '2020-04-30 06:00:46');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_status`
--

CREATE TABLE `user_status` (
  `id` int(55) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user_status`
--

INSERT INTO `user_status` (`id`, `status`) VALUES
(1, 'Administrator'),
(2, 'Cashier');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `detail_order`
--
ALTER TABLE `detail_order`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `purchase`
--
ALTER TABLE `purchase`
  ADD PRIMARY KEY (`purchase_id`);

--
-- Indeks untuk tabel `purchase_detail`
--
ALTER TABLE `purchase_detail`
  ADD PRIMARY KEY (`no`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user_status`
--
ALTER TABLE `user_status`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `detail_order`
--
ALTER TABLE `detail_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `purchase_detail`
--
ALTER TABLE `purchase_detail`
  MODIFY `no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
