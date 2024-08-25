# Brainstorming

This file is used to document your thoughts, approaches and research conducted across all tasks in the Technical Assessment.

## Firmware

## Telemetry
1. 
Upon inspection of battery_emulator.ts we see that in the event that the error flag takes the value of 3, an extra brace is added to the json message, therefore disrupting the file's format.
Therefore within the server.ts file. At line 20 the message wont be able to be parsed into json due to this additional brace, which is why the app occasionally crashes. Therefore, when parsing,
this stringified text to send as a response to the webserver, we will delete the last parenthesis to make it a valid body to convert.

## Cloud