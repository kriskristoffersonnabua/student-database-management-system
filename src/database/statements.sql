CREATE TABLE admin (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    password TEXT
);

CREATE TABLE student (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lastname TEXT NOT NULL,
    firstname TEXT NOT NULL,
    middlename TEXT NOT NULL,
    birthday TEXT NOT NULL,
    year_level INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    course_id INTEGER NOT NULL,
    FOREIGN KEY (course_id)
    REFERENCES course (course_id) 
);

CREATE TABLE course (
    course_id INTEGER PRIMARY KEY AUTOINCREMENT,
    major TEXT NOT NULL,
    minor TEXT,
    bachelor TEXT NOT NULL,
    course_details TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

INSERT INTO course (major, minor, bachelor, course_details, created_at, updated_at)
VALUES ('computer science', null, 'science', 'Course for computer science', '2025-05-21T10:45:23.410Z', '2025-05-21T10:45:23.410Z');

INSERT INTO student (lastname, firstname, middlename, birthday, year_level, created_at, course_id, updated_at)
VALUES ('doe', 'john', 'awesome', '2025-05-21T10:45:23.410Z', 2, '2025-05-21T10:45:23.410Z', 1, '2025-05-21T10:45:23.410Z');

UPDATE student
SET firstname = 'john'
WHERE id = 1;

DELETE FROM student
WHERE id = 2;

SELECT * FROM student;

SELECT * FROM course;

SELECT * FROM student INNER JOIN course
ON student.course_id = course.course_id

DROP TABLE admin;
DROP TABLE student;
DROP TABLE course;

SELECT * FROM admin;