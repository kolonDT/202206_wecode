import React, { useEffect, useState } from "react";

const Admin = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("/Data/Hani/adminData.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
      });
  }, []);

  return <div></div>;
};

export default Admin;
