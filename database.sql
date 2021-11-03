CREATE DATABASE institute;
Use institute;

CREATE TABLE `school` (
  `id` int(10) AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `street` varchar(60) NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `status` int(11) NOT NULL,

  CONSTRAINT pk_school_id PRIMARY KEY (id)
);