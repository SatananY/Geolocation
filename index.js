const bodyParser = require('body-parser');
const express =require('express');
const { response } = require('express');
const https = require("https"); // ไม่ต้อง npm i https เพราะว่าเป็น native ของ nodejs
//const request = require('request');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get('/gettemp',(req,res)=>{
   const url = 'https://api.openweathermap.org/data/2.5/weather?q=ratchaburi&appid=52c9656753d0778389fdbbf7794de226&units=metric'
    https.get(url,(response)=>{
        console.log(response);
        console.log(response.statusCode);

        response.on("data", (data)=>{
            let weatherData = JSON.parse(data);
            console.log(weatherData.weather[0].icon);
            let imgURL = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon + "@2x.png"
            res.writeHead(200, {"Content-type":"text/html; charset=utf-8"});
            res.write("<p>ณ จังหวัด "+weatherData.name+"</p>");
            res.write("<p>มีอากาศ "+weatherData.main.temp+"</p>");
            res.write("<p>สภาพอากาศในตอนนี้ "+ weatherData.weather[0].description+"</p>");
            res.write("<img src = "+imgURL+" >");
            res.send();
        });


    });


//request('https://api.openweathermap.org/data/2.5/weather?q=ratchaburi&appid=52c9656753d0778389fdbbf7794de226&units=metric', (err,response,body) => {
  //  console.log(err);
 //   console.log("Status Code: " + response.statusCode);
 //   res.send(body); });
});

app.get("/displaytemp",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.post("/displaytemp",(req,res)=>{
    console.log(req.body.cityName);
    const city = req.body.cityName ;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=52c9656753d0778389fdbbf7794de226&units=metric&lang=TH"
    https.get(url,(response)=>{
        console.log(response);
        console.log(response.statusCode);

        response.on("data", (data)=>{
            let weatherData = JSON.parse(data);
            console.log(weatherData.weather[0].icon);
            let imgURL = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon + "@2x.png"
            res.writeHead(200, {"Content-type":"text/html; charset=utf-8"});
            res.write("<p>ณ จังหวัด "+weatherData.name+"</p>");
            res.write("<p>มีอากาศ "+weatherData.main.temp+"</p>");
            res.write("<p>สภาพอากาศในตอนนี้ "+ weatherData.weather[0].description+"</p>");
            res.write("<img src = "+imgURL+" >");
            res.send();
});
    });
});
      

app.listen(3000, ()=>{
    console.log("Severs complete in port 3000");
});