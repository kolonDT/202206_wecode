const getAlarm = async (setNew) => {
  await fetch(`/car/myCar?carNumber=${localStorage.getItem("carNumber")}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setNew(data["registeredCarInfo"][0].is_new);
    });
};

const setAlarm = async (status) => {
  await fetch(
    `/history/notification?carNumber=${localStorage.getItem("carNumber")}`,
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
  await fetch(`/car/myCar?carNumber=${carNumber}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("getalarm ", data["registeredCarInfo"][0].is_new);
      setNew(data["registeredCarInfo"][0].is_new);
    });
};

const setAlarmByCarNumber = async (status, carNumber) => {
  await fetch(`/history/notification?carNumber=${carNumber}`, {
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
