CREATE TABLE `books` (
  `book_id` int PRIMARY KEY,
  `title` varchar(100),
  `author` varchar(100),
  `published_year` int,
  `isbn` varchar(20),
  `copies` int
);

CREATE TABLE `borrowing` (
  `borrow_id` int PRIMARY KEY,
  `book_id` int,
  `member_id` int,
  `borrow_date` date,
  `return_date` date,
  `late_fee` decimal(10,2),
  `due_date` date
);

CREATE TABLE `members` (
  `member_id` int PRIMARY KEY,
  `first_name` varchar(50),
  `last_name` varchar(50),
  `date_of_birth` date,
  `email` varchar(100),
  `phone` varchar(15)
);

ALTER TABLE `borrowing` ADD FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`);

ALTER TABLE `borrowing` ADD FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`);
