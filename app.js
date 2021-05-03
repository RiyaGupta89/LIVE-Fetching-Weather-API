const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { json } = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", (req, res) => {

  res.sendFile(__dirname+"/index.html");
       
})


app.post("/", (req, res) => {
    const city = req.body.city;
    console.log(city)

    const apikey = "a9f1a7176899184400cb7a7d65979fec"

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units=metric"

    https.get(url, (resp) => {
        resp.on("data", (data) => {
            const weatherData = JSON.parse(data);
            res.write("<h1>The weather in " +city+ " is " +weatherData.main.temp+ " degrees Celsius.</h1>");
            res.write("<p>The weather description is " +weatherData.weather[0].description + ".</p>" );
            res.send();
        });
    });
})



app.listen(3000, () => {
    console.log("Server started running on port 3000.");
})