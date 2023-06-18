DROP TABLE IF EXISTS `chat`;
DROP TABLE IF EXISTS `tokens`;
DROP TABLE IF EXISTS `People`;
CREATE TABLE `People` (

   `username` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type_fav` int(5),
  PRIMARY KEY (`email`),
  Foreign key (`type_fav`) references favorite_type(`type_fav`) on delete set null,
  INDEX `username_index` (`username`) 
);

CREATE TABLE `tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `token` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tokens_UN` (`token`),
  KEY `token_FK` (`email`),
  CONSTRAINT `token_FK` FOREIGN KEY (`email`) REFERENCES `People` (`email`) ON DELETE CASCADE
);

CREATE TABLE `chat` (
`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(15) NOT NULL,
  `message` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UN` (`id`),
  KEY `username_FK` (`username`),
  KEY `email_FK` (`email`),
  CONSTRAINT `username_FK` FOREIGN KEY (`username`) REFERENCES `People` (`username`) ON DELETE CASCADE,
  CONSTRAINT `email_FK` FOREIGN KEY (`email`) REFERENCES `People` (`email`) ON DELETE CASCADE
);
