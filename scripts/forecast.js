const key = 'KsIRxudlHuWojXvryA3RM1k28sTyRYMS';

const getCity = async (city) => {
    const api = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(api + query);
    const data = await response.json();

    return data[0];
}


const getWeather = async (id) => {
    const api = `http://dataservice.accuweather.com/currentconditions/v1/${id}`;
    const query = `?apikey=${key}`;

    const response = await fetch(api + query);
    const data = response.json();
    return data;
}
