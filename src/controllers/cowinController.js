let axios = require("axios")


const getStates = async (req, res) => {
    try {
        const response = await axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states');
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json(error);
    }
}


const getDistricts = async (req, res) => {
    try {
        const { stateId } = req.params;
        const response = await axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json(error);
    }
}



const getVaccinationSessionsByDistrictId = async (req, res) => {
    try {
        const { districtId, date } = req.query;
        const response = await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${date}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    getVaccinationSessionsByDistrictId
}

module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getVaccinationSessionsByDistrictId = getVaccinationSessionsByDistrictId