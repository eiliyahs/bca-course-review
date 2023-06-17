const db = require("./db_connection");

const insert_elective_sql = `
    INSERT INTO elective 
        (elective_name, art, gpa, grade, duration, teacher, description) 
    VALUES 
        (?, ?, ?, ?, ?, ?, ?);
`

db.execute(insert_elective_sql, ['Intro to Web Apps', 0, 0, '9, 10, 11, 12', 'period 9', 'Mr. Wang, Ms. Wang', 'How do we design, build, and deploy applications on the web? What technologies can we use? What are the advantages and disadvantages of the available options? In this course you will design, build, and deploy your first web applications. Pre-Requisite: Must have taken Structured Query Language. Some prior experience with HTML/CSS/JS is recommended.']);
db.execute(insert_elective_sql, ['Foundations of Computer Science 1', 0, 1, '9, 10, 11, 12', 'period 9', 'CS Staff', 'In this course, students are introduced to the Java programming language. Students learn console input and output, conditional expressions, while and for loops, and methods. Students learn the basics of the internal representation of values by the computer. Students practice the skills they acquire in this course by applying them to solve a variety of programming challenges.']);
db.execute(insert_elective_sql, ['Structured Query Language', 0, 1, '9, 10, 11, 12', 'period 9', 'CS Staff', 'Where and how do Google, Meta, and Uber store all of their data? In databases, of course! In this elective, you will learn to design, update, and query relational databases using Structured Query Language (SQL).!']);
db.execute(insert_elective_sql, ['Front End Web Development', 0, 1, '9, 10, 11, 12', 'period 9', 'CS Staff', 'In this course, the students learn the skills and technologies used to build interactive web applications. The students begin with HTML, CSS, and JavaScript, then advance their skills to include animation, UX/UI design patterns, responsive design, and a more in-depth look at CSS, JavaScript, and standard Javascript libraries. Students incorporate these concepts into the web applications they build throughout this course.']);

const insert_comment_sql = `
    INSERT INTO comment
        (comment, comment_user, elective_id)
    VALUES
        (?, ?, ?);
`

db.execute(insert_comment_sql, ["i love this class!!!!!!!", "bca student", 1]);
db.execute(insert_comment_sql, ["fun!", "jeremy", 1]);
db.execute(insert_comment_sql, ["totally tubular", "eiliyah", 2]);
db.execute(insert_comment_sql, ["so much fun!", "connie", 3]);

db.end();