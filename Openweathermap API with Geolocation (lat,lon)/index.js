const express = require ("express");
// const request = require('request');
const https = require("https"); // ไม่ต้อง npm i https เพราะว่าเป็น native ของ nodejs
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res) =>{
    res.send("Hello World");
});

app.get("/gettemp", (req,res) =>{

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=rome&appid=52c9656753d0778389fdbbf7794de226&units=metric';
    https.get(url, (response)=>{
        console.log(response);
        console.log(response.statusCode);

        response.on("data", (data)=>{
            let weatherData = JSON.parse(data);
            const icon = weatherData.weather[0].icon;
            let imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.writeHead(200, {"Content-type":"text/html; charset=utf-8"});
            res.write("<p>ณ จังหวัด "+weatherData.name+"</p>");
            res.write("<p>มีอากาศ "+weatherData.main.temp+"</p>");
            res.write("<p>สภาพอากาศในตอนนี้ "+weatherData.weather[0].description+"</p>");
            res.write("<img src="+imgURL+" >");
            res.send();
        });

    });
});

app.get("/displaytemp", (req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.get("/displaytempbylatlon", (req,res)=>{
    res.sendFile(__dirname+"/TempLL.html");
});

app.post("/displaytempbylatlon", (req,res)=>{
  const lat = req.body.lat;
  const lon = req.body.lon;
  const url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=52c9656753d0778389fdbbf7794de226&units=metric";


   https.get(url, (response)=>{
    response.on("data", (data)=>{
        let weatherData = JSON.parse(data);
        console.log(weatherData)
        const icon = weatherData.weather[0].icon;
        let imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.writeHead(200, {"Content-type":"text/html; charset=utf-8"});
        res.write("<p>ณ จังหวัด "+weatherData.name+"</p>");
        res.write("<p>มีอากาศ "+weatherData.main.temp+"</p>");
        res.write("<p>สภาพอากาศในตอนนี้ "+weatherData.weather[0].description+"</p>");
        res.write("<img src="+imgURL+" >");
        res.send();
    });
   })



})

app.post("/displaytemp", (req,res)=>{

 


    console.log(req.body.cityName);
    const city = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=52c9656753d0778389fdbbf7794de226&units=metric&lang=TH";
    https.get(url, (response)=>{
        // console.log(response);
        // console.log(response.statusCode);

        response.on("data", (data)=>{
            let weatherData = JSON.parse(data);
            const icon = weatherData.weather[0].icon;
            let imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.writeHead(200, {"Content-type":"text/html; charset=utf-8"});
            res.write("<p>ณ จังหวัด "+weatherData.name+"</p>");
            res.write("<p>มีอากาศ "+weatherData.main.temp+"</p>");
            res.write("<p>สภาพอากาศในตอนนี้ "+weatherData.weather[0].description+"</p>");
            res.write("<img src="+imgURL+" >");
            res.send();
        });

    });
   
});

app.listen(3000, ()=>{
    console.log ("Server is running on port 3000");
});

