# Brainstorming

This file is used to document your thoughts, approaches and research conducted across all tasks in the Technical Assessment.

## Firmware

## Telemetry
1. 
Upon inspection of battery_emulator.ts we see that in the event that the error flag takes the value of 3, an extra brace is added to the json message, therefore disrupting the file's format.
Therefore within the server.ts file. At line 20 the message wont be able to be parsed into json due to this additional brace, which is why the app occasionally crashes. Therefore, when parsing,
this stringified text to send as a response to the webserver, we will delete the last parenthesis to make it a valid body to convert.

2.
A response the battery_emulator is sent every 0.5 seconds, therefore for every 10 responses (5 seconds worth of informatoin) we may check if any 3 of them exceed the boundaries and accordingly
return an error message. Instead of creating a global variable to store critical entries, a better practise may be to create a datastore linked to a database( in this case a dynamically changing
json file), may involve configuring nodemon as nodemon will keep restarting due to file changes within folders in src. Have not been able to figure out why nodemon keeps restarting, however operations of
clear getdata and set data are working properly as the json file is dynamically updated, however this update causes nodemon to think there has been a change made and it must restart the server as I do not 
think its appropriate to meddle with config files i shall discard thisapproach ( also made the mistake of doing this work on the wrong branch , telemetryq1).
I shall default to the global array variable method mentioned earlier. it keeps track of total number of messages, and critical messages, every 10 messages it will reset all information within the 
critical and total number array, if temperature is critical it will be pushed into the critical array if that number is out of bounds. Furthermore, if 3 temperatures caught then it resets the critical
array after logging the message.

3. For increaseing aesthetics, the purpose of this website is to display real time temperature data, therefore simplistic designs can be suited for this purpose,
the main focal point of the website is to be on the temperature portion of the screen hence elements involving logo and title can be positioned near the top.


## Cloud