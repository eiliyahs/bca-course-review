// Set up the server
const express = require("express");
const db = require('./db/db_pool');
const helmet = require("helmet")
const app = express();
//Configure Express to use certain HTTP headers for security
//Explicitly set the CSP to allow certain sources
app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'cdnjs.cloudflare.com']
      }
    }
  }));
const port = process.env.PORT || 8080;
const logger = require("morgan");

const DEBUG = true;

const read_elective_all_sql = `
    SELECT 
        elective_id, elective_name, art, gpa, grade, duration, teacher, description
    FROM elective
`;

const read_elective_detail_sql = `
    SELECT 
        elective_name, art, gpa, grade, duration, teacher, description
    FROM elective
    WHERE elective_id = ?
`;

const read_comment_sql = `
    SELECT 
        comment.comment, comment.comment_user, comment.elective_id
    FROM comment
    JOIN elective
        ON elective.elective_id = comment.elective_id
    WHERE comment.elective_id = ?
`;

const create_comment_sql = `
    INSERT INTO comment 
        (comment, comment_user, elective_id) 
    VALUES 
        (?, ?, ?);
`;

// Configure Express to use EJS
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// Define middleware that logs all incoming requests
app.use(logger("dev"));

// Configure Express to parse URL-encoded POST request bodies (traditional forms)
app.use(express.urlencoded({ extended: false }));

// Define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));

// Define a route for the default home page
app.get("/", (req, res) => {
  res.render('index');
});

// Define a route for submitting a new comment
app.post("/review/:id", (req, res) => {
  const electiveId = req.params.id;
  db.execute(create_comment_sql, [req.body.comment, req.body.name, electiveId], (error, results) => {
    if (DEBUG)
      console.log(error ? error : results);
    if (error)
      res.status(500).send(error); // Internal Server Error
    else {
      res.redirect(`/review/${electiveId}`);
    }
  });
});

// Define a route for the review details
app.get("/review/:id", (req, res) => {
  const electiveId = req.params.id;

  db.execute(read_elective_detail_sql, [electiveId], (error, electiveResult) => {
    if (DEBUG)
      console.log(error ? error : electiveResult);
    if (error)
      res.status(500).send(error); // Internal Server Error
    else if (electiveResult.length === 0)
      res.status(404).send(`No elective found with id = "${electiveId}"`); // NOT FOUND
    else {
      const elective = electiveResult[0];

      db.execute(read_comment_sql, [electiveId], (error, commentResult) => {
        if (DEBUG)
          console.log(error ? error : commentResult);
        if (error)
          res.status(500).send(error); // Internal Server Error
        else {
          const comments = commentResult;

          res.render('details', { elective, comments, electiveId });
        }
      });
    }
  });
});

// define a route for the review
app.get( "/review", ( req, res ) => {
    db.execute(read_elective_all_sql, (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            let data = { electives : results };
            res.render('review', data);
        }
    });
} );

// Start the server
app.listen(port, () => {
  console.log(`App server listening on ${port}. (Go to http://localhost:${port})`);
});
