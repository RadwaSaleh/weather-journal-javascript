/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = '30fd98504d8ea71fb87b1d8eaa71c55a';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//GET request to the OpenWeatherMap API
const getWeather = async (url) => {
    const response = await fetch(url);
    try{
        const weatherData = await response.json();
        return weatherData;
    }catch (error) {
        console.log('error', error);
    }
};

//POST request to add the API data + user data to Weather Journal app
const postWeather = async (url, weatherObject) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(weatherObject)
    });

    try {
        const recentEntry = await response.json();
        return recentEntry;
    }catch(error) {
        console.log("error", error);
    }
};

//Update UI with Most Recent Entry Saved on server
const updateUI = async (url) => {
    const response = await fetch(url);
    try{
        const weatherJournal = await response.json();
        document.getElementById('date').innerText = weatherJournal.date;
        document.getElementById('temp').innerText = weatherJournal.temperature;
        document.getElementById('content').innerText = weatherJournal.userInput;
    }catch (error) {
        console.log("error", error);
    }

};


function performAction(){
    //Get entered zip code
    const zipCode = document.getElementById('zip').value;
    //Get user input
    const userInput = document.getElementById('feelings').value;
    //Compose url
    const url = `${baseURL}zip=${zipCode}&appid=${apiKey}`;
    //Function Call
    getWeather(url)
        .then(function (result) {
            postWeather('/addWeatherWithUserInput', {temperature: result.main.temp, date: newDate, userInput: userInput});
        })
        .then(function (result) {
            updateUI('/getRecentEntry');
        })
}

//Event Listener on button 'Generate' when clicked
document.getElementById('generate').addEventListener('click', performAction);







