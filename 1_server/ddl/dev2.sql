CREATE TABLE `user_table` (
   `user_id`   varchar(20)   NOT NULL,
   `user_password`   varchar(20)   NOT NULL   COMMENT '유저 비밀번호',
   `age`   int   NOT NULL,
   `user_name`   varchar(20)   NOT NULL,
   `gender`   char(1)   NOT NULL,
   `current_weight`   float(5,2)   NOT NULL,
   `height`   float(5,2)   NOT NULL,
   `goal_weight`   float(5,2)   NOT NULL   COMMENT '목표 체중',
   `d_day`   date   NOT NULL   COMMENT '목표 체중 감량일',
   `setting`   bool   NULL   DEFAULT 0   COMMENT '세팅환경설정이 되어 있는지
(정보기입하다가 튕겼는지)
false(0) => 세팅환경설정 안 된 상태
true => 세팅 환경설정 완료',
   `bmr`   float(8,2)   NULL   DEFAULT 1,
   `minimum_kcal`  float(8,2)   NOT NULL   DEFAULT 1000   COMMENT '1일 사용자가 원하는 섭취량. 디폴트값 1000kcal',
   `kcal_per_day`   float(8,2)   NULL,
   `profile_path`   varchar(600)   NULL   COMMENT '유저 프로필 이미지. 디포트 넣어줘야됨',
   `purpose` bool NULL DEFAULT 0 COMMENT '0 = 다이어트 1 = 벌크업'
);

CREATE TABLE `activity_table` (
   `index`   int   NOT NULL  AUTO_INCREMENT COMMENT 'auto increment',
   `user_id`   varchar(20)   NOT NULL,
   `working_out_code2`   VARCHAR(255)   NOT NULL,
   `date`   date   NULL   COMMENT '운동한 날짜',
   `working_time`   int   NULL   COMMENT '운동한 시간(분) : 정수로 받음'
);

CREATE TABLE `ingredient_table` (
   `food_code`   varchar(30)   NOT NULL   COMMENT '음식 코드',
   `food_name`   varchar(30)   NOT NULL   COMMENT '음식이름',
   `carbo`   FLOAT(8,4)   NOT NULL   COMMENT '탄수화물 g',
   `protein`  FLOAT(8,4)   NOT NULL   COMMENT '단백질 g',
   `fat`   FLOAT(8,4)  NOT NULL   COMMENT '지방 g',
   `kcal`   FLOAT(8,4)   NOT NULL,
   `category1` VARCHAR(30) NOT NULL COMMENT '음식 종류',
   `category2` VARCHAR(30) NOT NULL COMMENT '한식 / 중식 일식',
   `category3` VARCHAR(30) NOT NULL COMMENT '메인 / 사이드 / 간식'
);

CREATE TABLE `meal_recommendation_table` (
   `index`   int   NOT NULL  AUTO_INCREMENT COMMENT 'auto increment',
   `user_id`   varchar(20)   NOT NULL,
   `food_code`   varchar(30)   NOT NULL   COMMENT '음식 코드',
   `meal_type`   int   NULL   COMMENT '0 = 아침
1 = 점심
2 = 저녁
3 = 간식',
   `date`   date   NULL   COMMENT '{user_id}가 {아침,점심,저녁}을 먹은 시간',
   `food_name`   varchar(30)   NULL   COMMENT '음식 이름'
);



CREATE TABLE `user_meal_table` (
   `index`   int   NOT NULL  AUTO_INCREMENT COMMENT 'auto increment',
   `food_code`   varchar(30)   NOT NULL   COMMENT '음식 코드',
   `user_id`   varchar(20)   NOT NULL,
   `date`   datetime   NULL   COMMENT '{user_id}가 {아침,점심,저녁}을 먹은 시간',
   `food_name`   varchar(30)   NOT NULL   COMMENT '음식 이름',
   `img_path`   varchar(600)   NULL   COMMENT 'img_path',
   `is_model` BOOL NOT NULL DEFAULT 0 COMMENT '모델 사용 여부',
   `is_change` BOOL COMMENT '모델 결과 수정 여부',
   `bef` VARCHAR(30) COMMENT '수정 이전',
   `aft` VARCHAR(30) COMMENT '수정 이후',
   `gram` FLOAT(8,2) NOT NULL DEFAULT 0 COMMENT '음식 중량'
);

CREATE TABLE `Untitled` (
   `working_out_code`   VARCHAR(255)   NOT NULL,
   `coefficient`   float(4)   NOT NULL
);

ALTER TABLE `user_table` ADD CONSTRAINT `PK_USER_TABLE` PRIMARY KEY (
   `user_id`
);

ALTER TABLE `activity_table` ADD CONSTRAINT `PK_ACTIVITY_TABLE` PRIMARY KEY (
   `index`,
   `user_id`,
   `working_out_code2`
);

ALTER TABLE `ingredient_table` ADD CONSTRAINT `PK_INGREDIENT_TABLE` PRIMARY KEY (
   `food_code`
);

ALTER TABLE `meal_recommendation_table` ADD CONSTRAINT `PK_MEAL_RECOMMENDATION_TABLE` PRIMARY KEY (
   `index`,
   `user_id`,
   `food_code`
);

ALTER TABLE `user_meal_table` ADD CONSTRAINT `PK_USER_MEAL_TABLE` PRIMARY KEY (
   `index`,
   `food_code`,
   `user_id`
);

ALTER TABLE `Untitled` ADD CONSTRAINT `PK_UNTITLED` PRIMARY KEY (
   `working_out_code`
);

ALTER TABLE `activity_table` ADD CONSTRAINT `FK_user_table_TO_activity_table_1` FOREIGN KEY (
   `user_id`
)
REFERENCES `user_table` (
   `user_id`
);

ALTER TABLE `activity_table` ADD CONSTRAINT `FK_Untitled_TO_activity_table_1` FOREIGN KEY (
   `working_out_code2`
)
REFERENCES `Untitled` (
   `working_out_code`
);

ALTER TABLE `meal_recommendation_table` ADD CONSTRAINT `FK_user_table_TO_meal_recommendation_table_1` FOREIGN KEY (
   `user_id`
)
REFERENCES `user_table` (
   `user_id`
);

ALTER TABLE `meal_recommendation_table` ADD CONSTRAINT `FK_ingredient_table_TO_meal_recommendation_table_1` FOREIGN KEY (
   `food_code`
)
REFERENCES `ingredient_table` (
   `food_code`
);

ALTER TABLE `user_meal_table` ADD CONSTRAINT `FK_ingredient_table_TO_user_meal_table_1` FOREIGN KEY (
   `food_code`
)
REFERENCES `ingredient_table` (
   `food_code`
);

ALTER TABLE `user_meal_table` ADD CONSTRAINT `FK_user_table_TO_user_meal_table_1` FOREIGN KEY (
   `user_id`
)
REFERENCES `user_table` (
   `user_id`
);
