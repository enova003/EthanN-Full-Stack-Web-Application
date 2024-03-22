const express = require("express");
const router = express.Router();
const database = require("../database");
const {sendEmail} = require("../utils/sendmail");

//get all student records
router.get("/", (req, res) => {
  database.execute("select * from courseadvising", function (err, result) {
    res.send(result);
  });
});

//get student records by student name
router.get("/:name", (req, res) => {
    try {
      database.execute(
        "SELECT * FROM courseadvising WHERE student_name = ?",
        [req.params.name],
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(500).send("Error retrieving student information");
          } else {
            if (result.length === 0) {
              res.status(404).send("Student Information not found");
            } else {
              res.status(200).send(result);
            }
          }
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

//courseadvising post API
router.post("/", (req, res) => {
    try {
  
      database.execute(
        "insert into courseadvising (date, current_term, status, last_term, last_gpa, prerequisites, student_name, planned_courses, student_email, rejectionReason) values (?,?,?,?,?,?,?,?,?,?)",
        [
          req.body.date,    
          req.body.current_term,
          "Pending",
          req.body.last_term,
          req.body.last_gpa,
          req.body.prerequisites,
          req.body.student_name,
          req.body.planned_courses,
          req.body.student_email,
          "N/A",
        ],
        function (err, result) {
          if (err) {
            res.status(500).send({
              status:500,
              message:"Server Error: Record not inserted",
            });
          } else {
            res.status(200).send({
              status:200,
              message:"Student info successfully inserted in the database."
            });
          }
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  });

//update status by id
router.put("/:id", (req, res) => {
  try {
    database.execute(
      "update courseadvising set status=?, rejectionReason=? where id=?",
      [req.body.status, req.body.rejectionReason, req.params.id],
      function (err, result) {
        if (result.affectedRows == 0) {
          res.status(401).send("Record not found");
        } else {
          database.execute(
            "SELECT student_email FROM courseadvising WHERE id = ?",
            [req.params.id],
            function (err, emailResult) {
              if (err) {
                res.status(500).send("Error retrieving student's email");
              } else {
                const studentEmail = emailResult[0].student_email;
                sendEmail(studentEmail, `Course Plan Status Update`, `Dear student, you are receiving this email today as there has been a change to the status of one or more of your previously submitted course plans. To view this change, please log into your account and navigate to the Course Advising Form webpage.`);
                //console.log("email: ", studentEmail);
                res.status(200).send("Status updated successfully");
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;