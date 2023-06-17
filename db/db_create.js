const db = require("./db_connection");

/**** Drop existing tables, if any ****/

const drop_comment_table_sql = "DROP TABLE IF EXISTS comment;"

db.execute(drop_comment_table_sql);

const drop_elective_table_sql = "DROP TABLE IF EXISTS elective;"

db.execute(drop_elective_table_sql);


/**** Create tables ****/

const create_elective_table_sql = `
    CREATE TABLE elective (
        elective_id INT NOT NULL AUTO_INCREMENT,
        elective_name VARCHAR(45) NOT NULL,
        art TINYINT NOT NULL,
        gpa TINYINT NOT NULL,
        grade VARCHAR(45) NOT NULL,
        duration VARCHAR(45) NOT NULL,
        teacher VARCHAR(45) NOT NULL,
        description VARCHAR(450) NOT NULL,
        PRIMARY KEY (elective_id)
    );
`

db.execute(create_elective_table_sql);

const create_comment_table_sql = `
    CREATE TABLE comment (
        comment_id INT NOT NULL AUTO_INCREMENT,
        comment VARCHAR(45) NOT NULL,
        comment_user VARCHAR(45) NOT NULL,
        elective_id INT NOT NULL,
        PRIMARY KEY (comment_id),
        INDEX elective_id_idx (elective_id ASC),
        CONSTRAINT elective_id 
            FOREIGN KEY (elective_id) 
            REFERENCES elective (elective_id) 
            ON DELETE RESTRICT 
            ON UPDATE CASCADE
); 
`

db.execute(create_comment_table_sql);
db.end();