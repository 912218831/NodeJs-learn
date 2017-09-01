var path = require('path'),
    express = require('express'),
    zipdb = require('zippity-do-dah'),
    Forecast = require('forecast'),
    app = express();
 var weather = new Forecast({
    service: 'darksky',
    key: 'aa2169108417b38f0406ec4b94ecc92e',
    units: 'celcius',
    cache: true,      // Cache API requests
    ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
      minutes: 27,
      seconds: 45
    }
  });
app.use(express.static(path.resolve(__dirname,"public")));
app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");
app.get("/",function(req,res){
    res.render("index");
});
app.get(/^\/(\d{5})$/,function(req,res,next){
    var zipcode = req.params[0];
    var location = zipdb.zipcode(zipcode);
    if(!location.zipcode){
        next();
        return;
    }
    var latitude = location.latitude;
    var longitude = location.longitude;
    weather.get([latitude,longitude],function(err,data){
        if(err){
            next();
            return;
        }
        res.json({
            zipcode:zipcode,
            temperature:data.currently.temperature
        });
    });
});

app.use(function(req,res){
    res.status(404).render("404");
});

app.listen(1337,function(){
    console.log("app running at prot 1337");
})