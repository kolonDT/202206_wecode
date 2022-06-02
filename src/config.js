//require("dotenv").config();

export const PORT = process.env.REACT_APP_NODE_API_PORT;
export const URL = process.env.REACT_APP_NODE_API_URL;
export const URI = `${URL}:${PORT}`;
console.log(URI);
export const CAR_API = `${URL}:${PORT}/car`;
export const MYCAR_API = `${URL}:${PORT}/car/myCar`;
export const MYCARS_API = `${URL}:${PORT}/car/myCars`;
export const HISTORY_API = `${URL}:${PORT}/history`;
export const ALARM_API = `${URL}:${PORT}/history/notification`;
export const GRAPH_API = `${URL}:${PORT}/car/priceByDistance`;
export const IMAGE_API = `${URL}:${PORT}/image`;
