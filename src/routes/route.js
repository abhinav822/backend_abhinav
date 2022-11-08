const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const MemeController = require("../controllers/memeController")
const WeatherController = require("../controllers/weatherController")



router.get("/cowin/states", CowinController.getStates)

router.get("/cowin/districtinstate/:stateId", CowinController.getDistricts)

router.get("/cowin/getbydistrict", CowinController.getVaccinationSessionsByDistrictId);

router.get("/weather/getbycity", WeatherController.getWeatherDetails);

router.get("/weather/getonlytemp", WeatherController.getonlytemp);

router.get("/weather/sortbytemp", WeatherController.sortbytemp);

router.get("/meme/getmeme", MemeController.getmeme);


// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date



module.exports = router;