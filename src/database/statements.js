import betterSqlite3 from 'better-sqlite3'
// const db = require('better-sqlite3')('studentdatabase.db');
const db = betterSqlite3('studentdatabase.db')


export const createAdminTable = () => {
    const sql = `
        CREATE TABLE admin (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            password TEXT
        );
    `
    db.prepare(sql).run();
}

export const createCourseTable = () => {
    const sql = `
        CREATE TABLE course (
            course_id INTEGER PRIMARY KEY AUTOINCREMENT,
            major TEXT NOT NULL,
            minor TEXT,
            bachelor TEXT NOT NULL,
            course_details TEXT,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        );
    `
    db.prepare(sql).run();
}

export const createStudentTable = () => {
    const sql = `
        CREATE TABLE student (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lastname TEXT NOT NULL,
            firstname TEXT NOT NULL,
            middlename TEXT NOT NULL,
            birthday TEXT NOT NULL,
            year_level INTEGER NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            course_id INTEGER,
            FOREIGN KEY (course_id)
            REFERENCES course (course_id) 
        );
    `
    db.prepare(sql).run();
}

export const insertStudent = (studentDetails) => {
    const sql = `
        INSERT INTO student (lastname, firstname, middlename, birthday, year_level, course_id, created_at, updated_at)
        VALUES (?,?,?,?,?,?,?,?);
    `
    const { lastname, firstname, middlename, birthday, year_level, course_id, created_at, updated_at } = studentDetails;
    db.prepare(sql).run(lastname, firstname, middlename, birthday, year_level, course_id, created_at, updated_at)
}

export const updateStudent = (id, detailsToUpdate) => {
    let detailsString = ''
    const list = Object.entries(detailsToUpdate)
    list.forEach((detail, idx) => {
        detailsString += `${detail?.[0]} = ${detail?.[1]}${idx != list?.length - 1 ? ',' : ''} `
    })
    const sql = `
        UPDATE student SET
        ${detailsString}
        WHERE id = ${id}
    `
    db.prepare(sql).run()
}

export const insertCourse = ({
    major, minor, bachelor, course_details, created_at, updated_at
}) => {
    db.prepare(`
            INSERT INTO course (major, minor, bachelor, course_details, created_at, updated_at)
            VALUES (?,?,?,?,?,?);
        `).run(major, minor, bachelor, course_details, created_at, updated_at)
}

export const fetchAllStudents = () => {
  const sql = `
    SELECT * FROM student INNER JOIN course
    ON student.course_id = course.course_id
  `
  const rows = db.prepare(sql).run()
  console.log(rows)
  return rows;
}

// createCourseTable()
// createStudentTable()

// insertCourse({
//     major: 'Computer Science',
//     minor: null,
//     bachelor: "Science",
//     course_details: 'A course for computer theory.',
//     created_at: 'created_timestamp',
//     updated_at: 'updated_timestamp'
// })

// insertStudent({
//     lastname: 'Doe',
//     firstname: 'Jane',
//     middlename: 'Awesome',
//     birthday: 'some birthday',
//     year_level: 2,
//     created_at: 'create timestamp',
//     updated_at: 'create timestamp',
//     course_id: null
// })

updateStudent(1, {course_id: 1})