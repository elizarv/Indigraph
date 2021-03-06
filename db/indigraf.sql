-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-12-2018 a las 05:39:06
-- Versión del servidor: 10.1.9-MariaDB
-- Versión de PHP: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `indigraf`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administracion`
--

CREATE TABLE `administracion` (
  `id` int(11) NOT NULL,
  `colorP` varchar(45) NOT NULL,
  `colorS` varchar(45) NOT NULL,
  `logo` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `administracion`
--

INSERT INTO `administracion` (`id`, `colorP`, `colorS`, `logo`, `nombre`) VALUES
(0, '#000000', '#000000', 'back/images/logito.jpg', 'IndiGraf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivo`
--

CREATE TABLE `archivo` (
  `id` int(11) NOT NULL,
  `url` varchar(45) NOT NULL,
  `subidoPor` varchar(45) NOT NULL,
  `fechaSubida` datetime NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `periodo` int(11) NOT NULL,
  `estado` int(11) NOT NULL,
  `extension` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `archivo`
--

INSERT INTO `archivo` (`id`, `url`, `subidoPor`, `fechaSubida`, `descripcion`, `periodo`, `estado`, `extension`) VALUES
(3, 'back/cargas/archivos/proteccion1.pdf', 'eliza', '0000-00-00 00:00:00', NULL, 23, 0, 1),
(4, 'back/cargas/archivos/proteccion2.pdf', 'eliza', '0000-00-00 00:00:00', NULL, 23, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `indicador`
--

CREATE TABLE `indicador` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descripcion` mediumtext,
  `imagen` varchar(45) DEFAULT NULL,
  `padre` int(11) DEFAULT NULL,
  `esPadre` int(11) NOT NULL,
  `unidadMedida` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `indicador`
--

INSERT INTO `indicador` (`id`, `nombre`, `descripcion`, `imagen`, `padre`, `esPadre`, `unidadMedida`) VALUES
(0, 'cero', 'Este es un puto cero XD', NULL, NULL, 1, ''),
(21, 'Conferencias', 'Estadísticas de conferencias asistidas.', 'back/images/conferencias.png', 0, 1, 'Conferencias'),
(24, 'Ponentes', 'Estadísticas de la cantidad de ponentes pertenecientes a la UFPS que asistieron a una ponencia.', 'back/images/ponente.jpg', 21, 0, 'Personas'),
(32, 'Movilidad', 'Estadísticas de movilidad entrante y saliente de la UFPS.', 'back/images/movilidad.png', 0, 1, 'Personas'),
(33, 'Movilidad Saliente', 'Estudiantes y/o docentes que realizan movilidad saliente en la UFPS.', 'back/images/saliente.png', 32, 0, 'Personas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `periodo`
--

CREATE TABLE `periodo` (
  `fecha_ini` datetime NOT NULL,
  `fecha_fin` datetime NOT NULL,
  `verde` double NOT NULL,
  `indicador` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `cantidad` double NOT NULL,
  `amarillo` double NOT NULL,
  `rojo` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `periodo`
--

INSERT INTO `periodo` (`fecha_ini`, `fecha_fin`, `verde`, `indicador`, `id`, `cantidad`, `amarillo`, `rojo`) VALUES
('2018-06-03 00:00:00', '2018-09-05 00:00:00', 100, 21, 23, 80, 50, 30),
('2018-01-01 00:00:00', '2018-12-01 00:00:00', 10, 24, 26, 6, 5, 3),
('2018-11-01 00:00:00', '2018-11-30 00:00:00', 30, 32, 34, 7, 10, 6),
('2018-11-01 00:00:00', '2018-11-30 00:00:00', 30, 33, 35, 4, 10, 8),
('2018-10-01 00:00:00', '2018-10-31 00:00:00', 30, 33, 36, 7, 10, 8),
('2018-09-01 00:00:00', '2018-09-30 00:00:00', 15, 32, 37, 8, 9, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `relacion`
--

CREATE TABLE `relacion` (
  `predecesor` int(11) NOT NULL,
  `sucesor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `username` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `tipo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`username`, `password`, `nombre`, `tipo`) VALUES
('admin', '0000', 'Administrador', 1),
('eliza', '1234', 'Elizabeth', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administracion`
--
ALTER TABLE `administracion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `archivo`
--
ALTER TABLE `archivo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Archivo_Usuario1_idx` (`subidoPor`),
  ADD KEY `fk_Archivo_Periodo1_idx` (`periodo`);

--
-- Indices de la tabla `indicador`
--
ALTER TABLE `indicador`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Indicador_Indicador_idx` (`padre`);

--
-- Indices de la tabla `periodo`
--
ALTER TABLE `periodo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Periodo_Indicador1_idx` (`indicador`);

--
-- Indices de la tabla `relacion`
--
ALTER TABLE `relacion`
  ADD PRIMARY KEY (`predecesor`,`sucesor`),
  ADD KEY `fk_Relacion_Indicador2_idx` (`predecesor`),
  ADD KEY `fk_Relacion_Indicador1_idx` (`sucesor`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `archivo`
--
ALTER TABLE `archivo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `indicador`
--
ALTER TABLE `indicador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT de la tabla `periodo`
--
ALTER TABLE `periodo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `archivo`
--
ALTER TABLE `archivo`
  ADD CONSTRAINT `fk_Archivo_Periodo1` FOREIGN KEY (`periodo`) REFERENCES `periodo` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Archivo_Usuario1` FOREIGN KEY (`subidoPor`) REFERENCES `usuario` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `indicador`
--
ALTER TABLE `indicador`
  ADD CONSTRAINT `fk_Indicador_Indicador` FOREIGN KEY (`padre`) REFERENCES `indicador` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `periodo`
--
ALTER TABLE `periodo`
  ADD CONSTRAINT `fk_Periodo_Indicador1` FOREIGN KEY (`indicador`) REFERENCES `indicador` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `relacion`
--
ALTER TABLE `relacion`
  ADD CONSTRAINT `fk_Relacion_Indicador1` FOREIGN KEY (`sucesor`) REFERENCES `indicador` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Relacion_Indicador2` FOREIGN KEY (`predecesor`) REFERENCES `indicador` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
