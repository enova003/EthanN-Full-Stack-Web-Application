const express = require("express");
const router = express.Router();
const database = require("../database");

//get all courses
router.get("/", (req, res) => {
  database.execute("select * from courses", function (err, result) {
    res.send(result);
  });
});

//get course by course level
router.get("/:level", (req, res) => {
    try {
      database.execute(
        "SELECT * FROM courses WHERE course_level = ?",
        [req.params.level],
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(500).send("Error retrieving course by course level");
          } else {
            if (result.length === 0) {
              res.status(404).send("Course not found");
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

// update course name
router.put("/course_name/:level", (req, res) => {
  try {
    database.execute(
      "update courses set course_name=? where course_level=?",
      [req.body.course_name, req.params.level],
      function (err, result) {
        if (result.affectedRows == 0) {
          res.status(401).send("Record not found");
        } else {
          res.status(200).send("Record updated successfully");
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

// update course prerequisite
router.put("/prerequisite/:level", (req, res) => {
    try {
      database.execute(
        "update courses set prerequisite=? where course_level=?",
        [req.body.prerequisite, req.params.level],
        function (err, result) {
          if (result.affectedRows == 0) {
            res.status(401).send("Record not found");
          } else {
            res.status(200).send("Record updated successfully");
          }
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  });

//user post API
router.post("/", (req, res) => {
    try {
  
      database.execute(
        "insert into courses (course_name, course_level, prerequisite, course_lvlGroup) values (?, ?, ?, ?)",
        [
          req.body.course_name,
          req.body.course_level,
          req.body.prerequisite,
          req.body.course_lvlGroup,
        ],
        function (err, result) {
          if (err) {
            res.status(500).send({
              status:500,
              message:"Record not inserted: the course that you entered is already in the database.",
            });
          } else {
            res.status(200).send({
              status:200,
              message:"Course successfully inserted in the database."
            });
          }
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  });

  router.delete("/:level", (req, res) => {
    try {
      database.execute(
        "delete from courses where course_level=?",
        [req.params.level],
        function (err, result) {
          if (result.affectedRows == 0) {
            res.status(401).send("Record not deleted");
            console.log(error);
          } else {
            res.status(200).send("Record deleted successfully!");
          }
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  });

module.exports = router;