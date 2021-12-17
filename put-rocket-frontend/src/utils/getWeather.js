const getPressureFromWeartherAPI = () => {
    navigator.geolocation.getCurrentPosition(
        (loc) => {
            console.log(loc);
            const lat = loc.coords.latitude;
            const lon = loc.coords.longitude;
            fetch(
                `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`
            )
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    const pressure = response.main.pressure;
                    console.log("Pressure is: ", pressure, response);
                    return pressure;
                });
        },
        () => {
            console.error("Sorry dude, BT not works!");
        }
    );
    return "No weather data available!";
};

export default getPressureFromWeartherAPI;
