'use strict';

const apiKey = '3442bc148b46b294a5ce5abf9240896d';

export const getWeatherUrl = (city, units = 'imperial') => {
    const url = `http://api.openweathermap.org/data/2.5/weather?` + 
        `q=${city}&appid=${apiKey}&&&units=${units}`;
    return url;
};
