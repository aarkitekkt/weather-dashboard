# weather-dashboard

Repository: https://github.com/aarkitekkt/DayPlanner

URL:  https://aarkitekkt.github.io/weather-dashboard/
​
## Overview
​
The purpose of this application is to provide the user current weather information as well as a 5 day forecast of a given city.  The list of searched cities is stored and weather data can be recalled when clicked on. 
​
### Gallery
​
Home:
![Home Page](./relativeLinkToImage.png "Main Page")
​
Responsive Design:
![Medium Screen](./relativeLinkToImage.png "Medium Screen")
​
![Phone](./relativeLinkToImage.png "Phone")
​
### Problem
​
The biggest challenge faced in building this application was managing the data returned from the API and turning it into clean and simple information for the user.  
​
### Solution
​
By using a variety of string methods, I was able to take the data returned from the API and reformat it into more easily understandable dates, times, and values.  Examples of this include removing decimal points on values (24°F rather than 24.36°F), and reformatting date and time formats to much simpler and easier to read formats(Tue Jan 07 2020 rather than 2020-01-07 18:00:00).
​
## Tech and Features Used
​
* Bootstrap
* Javascript
* jQuery
* OpenWeather API
​
## How to use
​
Enter a city name into the input field to search weather for that city.  Click on city name from list to view weather from previously searched cities.
​
## Technical Overview
​
1. When a city in entered, the name is used to generate an API call to retreive a JSON object containing weather information.
2. The entered city name is also saved into an array conataining the search history and saved to local storage.
3. The city name is dynamically added to a 'search history' list that remains until the 'clear search history' button is clicked.
4. The temperature, humidity, windspeed and coordinates are pulled from the JSON data and saved as variables.
5. The coordinates are used to make an additional API call which retreives the UV Index data.
6. These variables are used to dynamically create a list of weather data that is rendered in the 'current weather' card html.
7. Icon data is used to image reference an icon provided by OpenWeather and is then added to the html next to the weather data.
8. The entered city is also used to generate a third API call returning a JSON object giving 5 day forecast information. This data is also dynamically added to the html.
 
