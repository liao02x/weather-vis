1. User can select a location and time range for which they want to view the weather data
->
  location selectable. a bunch of locations to pick? or searching for a location?
  time range selectable. datetime picker.
    timezone? local time? UTC? the location timezone?
  search bar. or search status bar. or search button. or search sidebar.
2. User can select which weather parameters they want to view (temperature, precipitation,
wind speed, etc.)
->
  predefined? or come with data?
  addable or fixed on the screen?
3. The app displays the selected weather data in a visually appealing format (e.g. line graphs,
bar charts, heat maps, etc.)
->
  line graph. bar chart. heat map. or other?
  simple or group data?
4. The app updates the data in real-time as new data becomes available from the
Meteomatics API.
->
  external API. fetch periodically. what else?

packages needed:
ui: antd
graph: ant charts
fetch: axios
state management: redux
no router needed
qs
map drawing
google map api for geocoding
date processing: dayjs

feature supports:
1. search location or use my location
2. select time range and timezone and group by day/hour
3. select weather parameters
4. switch unit
