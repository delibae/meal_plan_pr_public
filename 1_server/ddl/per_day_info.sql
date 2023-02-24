CREATE TABLE `per_day_information_table` (
   `index` int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `user_id`   varchar(20)   NOT NULL,
   `weight`   float(4,2)   NULL,
   `lose_kcal`   float(8,2)   NULL   COMMENT '오늘 칼로리 소모량',
   `kcal_consume`   float(8,2)   NULL   COMMENT '오늘 하루 총 칼로리 섭취량',
   `date`   date   NULL
);

ALTER TABLE `per_day_information_table` ADD CONSTRAINT `PK_PER_DAY_INFORMATION_TABLE` PRIMARY KEY (
   `INDEX`
);