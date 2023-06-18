create table `favorite_type` (
	type_fav int(5) Primary key AUTO_INCREMENT,
    type_fav_name varchar(255),
    chatroom_id int(5) unique not null
);

create table `People` (
	email varchar(255) Primary key,
    pass_word varchar(25),
    type_fav int(5),
    Foreign key (type_fav) references favorite_type(type_fav)
    on delete set null
);

create table `Profiles` (
	user_id int(11) Primary key AUTO_INCREMENT,
	name_profile varchar(25),
    email varchar(255),
    type_fav int(5),
	`file_path` varchar(200) NOT NULL,
    Foreign key (type_fav) references favorite_type(type_fav)
    on delete set null
);

create table `chatroom` (
	chatroom_id int(5) Primary key,
    message varchar(255),
    date_text timestamp DEFAULT CURRENT_TIMESTAMP,
    user_id int(11),
    Foreign key (user_id) references Profiles(user_id),
    Foreign key (chatroom_id) references favorite_type(chatroom_id)
);

DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `book_id` int(10) AUTO_INCREMENT,
  `genres` varchar(255) not null,
  `name_book` varchar(255) not null,
  `author` varchar(255),
  `describe` varchar(255),
  `file_path` varchar(200) NOT NULL,
  PRIMARY KEY (`book_id`)
);

DROP TABLE IF EXISTS `booklist`;
CREATE TABLE `booklist` (
  `booklist_id` int(10) AUTO_INCREMENT,
  `user_id` int(10),
  `book_id` int(10) null,
  `review` varchar(255),
  `rating` decimal(3, 2),
  PRIMARY KEY (`booklist_id`),
  Foreign key (user_id) references Profiles(user_id),
  Foreign key (book_id) references books(book_id)
  on delete set null
);

DROP TABLE IF EXISTS `songs`;
CREATE TABLE `songs` (
  `song_id` int(10) AUTO_INCREMENT,
  `artist` varchar(255),
  `name_song` varchar(255) not null,
  `genres` varchar(255) not null,
  `file_path` varchar(200) NOT NULL,
  PRIMARY KEY (`song_id`)
);

DROP TABLE IF EXISTS `playlist`;
CREATE TABLE `playlist` (
  `playlist_id` int(10) AUTO_INCREMENT,
  `user_id` int(10),
  `song_id` int(10),
  `review` varchar(255),
  `rating` decimal(3, 2),
  PRIMARY KEY (`playlist_id`),
  Foreign key (user_id) references Profiles(user_id),
  Foreign key (song_id) references songs(song_id)
  on delete set null
);

DROP TABLE IF EXISTS `movies`;
CREATE TABLE `movies` (
  `movie_id` int(10) AUTO_INCREMENT,
  `name_movie` varchar(255) not null,
  `genres` varchar(255) not null,
  `director` varchar(255),
  `taglines` varchar(255),
  `file_path` varchar(200) NOT NULL,
  PRIMARY KEY (`movie_id`)
);

DROP TABLE IF EXISTS `movielist`;
CREATE TABLE `movielist` (
  `movielist_id` int(10) AUTO_INCREMENT,
  `user_id` int(10),
  `movie_id` int(10),
  `review` varchar(255),
  `rating` decimal(3, 2),
  PRIMARY KEY (`movielist_id`),
  Foreign key (user_id) references Profiles(user_id),
  Foreign key (movie_id) references movies(movie_id)
  on delete set null
);


