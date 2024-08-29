import fs from 'fs';
import { VehicleData } from './server';

export interface criticalDataStore {
  critical_temperatures: VehicleData[],
  all_temperatures: VehicleData[]
}
const criticalDataFile = "./src/telemetry_data.json";


//use getData() to access data 
function getData(): criticalDataStore{
  const rawData = fs.readFileSync(criticalDataFile, { flag:'r', encoding: 'utf8'}).toString();
  return JSON.parse(rawData);
}

//use set(newData) to pass in the the entire data object, with modifications made
function setData(newData:criticalDataStore): void {
  fs.writeFileSync(criticalDataFile, JSON.stringify(newData, null, 2));
}

//use clear to clear the critical_data json file
export function clear(){
  const clearedData = {
    critical_temperatures: [],
    all_temperatures: []
  }
  setData(clearedData);
}

export{ getData, setData }