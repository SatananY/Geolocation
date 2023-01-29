const express = require ('express');
const https = require ('http');
const app = express();
const port = 3000;

app.get('/getTempLatLong', (req, res) => {
    res.sendFile(__dirname + "/TempLL.html");
        
});


const openweatherApi = {
    key: 'f52c9656753d0778389fdbbf7794de226',
}


app.post('/getTempLatLong', (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openweatherApi.key}&units=metric&lang=th`;
    https.get(url, (response) => {
        console.log(response);
        console.log(response.statusCode);

        response.on('data', (data) => {
            let weatherData = JSON.parse(data);
            console.log(weatherData.weather[0].icon);
            let imgURL = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon + "@2x.png"
            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            res.write("<p>สภาพอากาศในตอนนี้ "+ weatherData.weather[0].description+"</p>");
            res.write("<p>ณ จังหวัด "+weatherData.name+"</p>");
            res.write("<p>มีอากาศ "+weatherData.main.temp+"</p>");
            res.write("<img src = "+imgURL+" >");
            res.send();
        });
    });
});



app.listen(3000, ()=>{
    console.log("Severs complete in port 3000");
});