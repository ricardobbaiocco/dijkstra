-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 08/06/2023 às 15:15
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `dijkstra`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `arestas`
--

CREATE TABLE `arestas` (
  `id` int(11) NOT NULL,
  `cidade_origem` varchar(100) NOT NULL,
  `cidade_destino` varchar(100) NOT NULL,
  `peso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `arestas`
--

INSERT INTO `arestas` (`id`, `cidade_origem`, `cidade_destino`, `peso`) VALUES
(1, 'Erechim', 'Aratiba', 35),
(2, 'Erechim', 'Paulo Bento', 10),
(3, 'Erechim', 'Três Arroios', 20),
(4, 'Erechim', 'Barrão de Cotegipe', 10),
(5, 'Erechim', 'Gaurama', 15),
(6, 'Aratiba', 'Erechim', 35),
(7, 'Aratiba', 'Três Arroios', 25),
(8, 'Aratiba', 'Barra do Rio Azul', 12),
(9, 'Três Arroios', 'Erechim', 20),
(10, 'Três Arroios', 'Aratiba', 25),
(11, 'Três Arroios', 'Viadutos', 25),
(12, 'Viadutos', 'Gaurama', 8),
(13, 'Viadutos', 'Marcelino Ramos', 10),
(14, 'Viadutos', 'Três Arroios', 25),
(15, 'Marcelino Ramos', 'Viadutos', 10),
(16, 'Gaurama ', 'Erechim', 15),
(17, 'Gaurama ', 'Viadutos', 8),
(18, 'Paulo Bento', 'Erechim', 10),
(19, 'Barrão de Cotegipe', 'Erechim', 10),
(20, 'Barrão de Cotegipe', 'Itatiba do Sul', 15),
(21, 'Itatiba do Sul', 'Barra do Rio Azul', 8),
(22, 'Itatiba do Sul', 'Barrão de Cotegipe', 15),
(23, 'Barra do Rio Azul', 'Aratiba', 12),
(24, 'Barra do Rio Azul', 'Itatiba do Sul', 8);

-- --------------------------------------------------------

--
-- Estrutura para tabela `cidades`
--

CREATE TABLE `cidades` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cidades`
--

INSERT INTO `cidades` (`id`, `nome`) VALUES
(1, 'Aratiba'),
(2, 'Barra do Rio Azul'),
(3, 'Itatiba do Sul'),
(4, 'Barrão de Cotegipe'),
(5, 'Erechim'),
(6, 'Paulo Bento'),
(7, 'Três Arroios'),
(8, 'Gaurama'),
(9, 'Viadutos'),
(10, 'Marcelino Ramos');

-- --------------------------------------------------------

--
-- Estrutura para tabela `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nome` varchar(200) NOT NULL,
  `cpf` int(11) NOT NULL,
  `cep` int(8) NOT NULL,
  `rua` varchar(200) NOT NULL,
  `ibge` int(20) NOT NULL,
  `bairro` varchar(200) NOT NULL,
  `cidade` varchar(200) NOT NULL,
  `uf` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `clientes`
--

INSERT INTO `clientes` (`id`, `nome`, `cpf`, `cep`, `rua`, `ibge`, `bairro`, `cidade`, `uf`) VALUES
(4, 'Ricardo teste', 11122234, 99704132, 'Rua Pedro Menegolla', 4307005, 'Bela Vista', 'Erechim', 'RS');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `arestas`
--
ALTER TABLE `arestas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `cidades`
--
ALTER TABLE `cidades`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `arestas`
--
ALTER TABLE `arestas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT de tabela `cidades`
--
ALTER TABLE `cidades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
