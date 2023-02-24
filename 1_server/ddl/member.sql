
CREATE TABLE member (
	id VARCHAR(20) NOT NULL, /* id */
	pw VARCHAR(20) NOT NULL, /* 새 컬럼 */
	email VARCHAR(30) NOT NULL, /* 새 컬럼2 */
	age INT NOT NULL, /* 새 컬럼3 */
	gender VARCHAR(5) NOT NULL /* 새 컬럼4 */
);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE UNIQUE INDEX PK_TABLE
	ON member (
		id ASC
	);

ALTER TABLE member
	ADD
		CONSTRAINT PK_TABLE
		PRIMARY KEY (
			id
		);