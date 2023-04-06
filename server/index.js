const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "myprojectlibrary",
  database: "customer",
});
// myprojectlibrary

app.get("/customer", (req, res) => {
  db.query("SELECT * FROM customer ORDER BY date,timeFrom", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create", (req, res) => {
  const collectday = req.body.collectday;
  const getDay = req.body.getDay;
  const name = req.body.name;
  const email = req.body.email;
  const roomName = req.body.roomName;
  const roomType = req.body.roomType;
  const roomNumber = req.body.roomNumber;
  const getTimeFrom = req.body.getTimeFrom;
  const getTimeTo = req.body.getTimeTo;

  db.query(
    "INSERT INTO customer (date, day, name, email, roomName, roomType, roomNumber, timeFrom, timeTo) VALUES (?,?,?,?,?,?,?,?,?)",
    [
      collectday,
      getDay,
      name,
      email,
      roomName,
      roomType,
      roomNumber,
      getTimeFrom,
      getTimeTo,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM customer WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/adminlist", (req, res) => {
    db.query("SELECT * FROM adminlist", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

app.listen("3001", () => {
  console.log("Server running at 3001");
});
