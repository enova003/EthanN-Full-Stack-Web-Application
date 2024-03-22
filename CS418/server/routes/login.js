const express = require("express");
const router = express.Router();
const database = require("../database");
const { comparePassword, verifyTOken } = require("../utils/helper");
const jwt = require("jsonwebtoken");
const {sendEmail} = require("../utils/sendmail");

function generateRandomFiveDigitNumber() {
  return Math.floor(10000 + Math.random() * 90000);
}

router.post("/", (req, res) => {
  try {
    database.execute(
      "select * from user where u_email=?",
      [req.body.u_email],
      function (err, result) {
        //console.log("result[0].is_approved: ", result[0].is_approved);
        if (err || result.length == 0) {
          res
            .status(401)
            .send({
              status:401,
              message:"Invalid email and password. Please try again with valid credentials"
            }
            );
        } else {
          if (comparePassword(req.body.u_password, result[0].u_password)) {
            //console.log("result[0].is_approved: ", result[0].is_approved);
            if(result[0].is_approved == 1){
                const token = jwt.sign(
                  {
                    userId: result[0].u_id,
                    email: req.body.u_email,
                  },
                  process.env.TOKEN_SECRET_KEY,
                  { expiresIn: "1h" }
                );

                const oneTimePassword = generateRandomFiveDigitNumber();

                res.status(200).send({
                  data: {
                    toke: token,
                    email: req.body.u_email,
                    userId: result[0].u_id,
                    verify: oneTimePassword,
                    admin: result[0].is_admin,
                  },
                }); 

                sendEmail(result[0].u_email,`Login Verification`,`Your one time password is ${oneTimePassword}`);

              } else {
              res
                .status(401)
                .send({
                  status:401,
                  message:"Your email and password are correct, but you have not been approved by the admin yet. Please try again later."
                }
                );
            }
          } else {
            res
              .status(401)
              .send({
                status:401,
                message:"Invalid email and password. Please try again with valid credentials"
              }
              );
          }
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;