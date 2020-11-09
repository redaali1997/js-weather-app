const weatherForm = document.querySelector('form');
const weatherCard = document.querySelector('.weather');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUi = (data) => {
    const { cityDet, weatherDet } = data;
    weatherCard.innerHTML = `
        <h4 class="card-title">${cityDet.LocalizedName}</h4>
        <p class="card-text">${weatherDet.WeatherText}</p>
        <div class="display-4">
            <span>${weatherDet.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;
    weatherCard.parentElement.classList.remove('d-none');
}

const updateCard = async (city) => {
    const cityDet = await getCity(city);
    const weatherDet = await getWeather(cityDet.Key);
    return {
        cityDet,
        weatherDet: weatherDet[0]
    };
}

weatherForm.addEventListener('submit', e => {
    e.preventDefault();

    // update the ui
    const city = weatherForm.city.value;
    getCity(city).then(data => {
        getWeather(data.Key).then(weather => {
            console.log(weather);
            // update the card
            weatherCard.innerHTML = `
                <h4 class="card-title">${data.LocalizedName}</h4>
                <p class="card-text">${weather[0].WeatherText}</p>
                <div class="display-4">
                    <span>${weather[0].Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>
            `;
            weatherCard.parentElement.classList.remove('d-none');

            // update card img & icon
            const timeSrc = weather[0].IsDayTime ? 'img/day.svg' : 'img/night.svg';
            time.setAttribute('src', timeSrc);

            const iconSrc = `img/icons/${weather[0].WeatherIcon}.svg`;
            icon.setAttribute('src', iconSrc);
        })
    })
    weatherForm.reset();


    /*
    updateCard(weatherForm.city.value.trim())
        .then(data => {
            updateUi(data);
        }).catch(e => console.log(e));
    
    weatherForm.reset();
    */
    
});