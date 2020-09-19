import got from 'got';

const openWeatherApiKey = '3442bc148b46b294a5ce5abf9240896d';

const weather = (cityName) => {
    return got(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${openWeatherApiKey}`);
};

export default weather;
