class Forecast {
    constructor() {
        this.key = 'KsIRxudlHuWojXvryA3RM1k28sTyRYMS';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
    }

    async updateCard(city) {
        const cityDet = await this.getCity(city);
        const weatherDet = await this.getWeather(cityDet.Key);
        return {
            cityDet,
            weatherDet: weatherDet[0]
        };
    }

    async getCity(city) {
        const query = `?apikey=${this.key}&q=${city}`;

        const response = await fetch(this.cityURI + query);
        const data = await response.json();

        return data[0];
    }

    async getWeather(id) {
        const query = `${id}?apikey=${this.key}`;

        const response = await fetch(this.weatherURI + query);
        const data = response.json();
        return data;
    }
}
