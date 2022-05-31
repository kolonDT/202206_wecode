let PORT = process.env.REACT_APP_NODE_API_PORT;
let URL = process.env.REACT_APP_NODE_API_URL;

const getAlarm = async (setNew) => {
  await fetch(
    `${URL}:${PORT}/car/myCar?carNumber=${localStorage.getItem("carNumber")}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      setNew(data["registeredCarInfo"][0].is_new);
    });
};

const setAlarm = async (status) => {
  await fetch(
    `${URL}:${PORT}/history/notification?carNumber=${localStorage.getItem(
      "carNumber"
    )}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notificationStatus: status }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("set data", status, data);
    });
};

const getAlarmByCarNumber = async (setNew, carNumber) => {
  let ret = 0;
  await fetch(`${URL}:${PORT}/car/myCar?carNumber=${carNumber}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setNew(data["registeredCarInfo"][0].is_new);
      ret = data["registeredCarInfo"][0].is_new;
      console.log("getalarm ", data["registeredCarInfo"][0].is_new, carNumber);
    });
  return ret;
};

const setAlarmByCarNumber = async (status, carNumber) => {
  await fetch(`${URL}:${PORT}/history/notification?carNumber=${carNumber}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ notificationStatus: status }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("set data", status, carNumber, data);
    });
};

export { setAlarm, getAlarm, setAlarmByCarNumber, getAlarmByCarNumber };
