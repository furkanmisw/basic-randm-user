import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
const api = "https://randomuser.me/api/?results";
export default function App() {
  const [users, setUsers] = useState([]);
  const getRandomUser = () => {
    axios
      .get(api)
      .then((res) => {
        var _data = res.data.results[0];
        console.log(_data);
        var data = {
          name: _data.name.first,
          lastname: _data.name.last,
          pp: _data.picture.large,
        };
        setUsers([...users, data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const remove = (index) => {
    setUsers(users.filter((value, _index) => _index !== index));
  };
  useEffect(() => {
    getRandomUser();
  }, []);
  return (
    <div className="App">
      <div className="x">
        <button onClick={() => getRandomUser()}>Get Random User</button>
        <h1>{users.length.toString()}</h1>
      </div>
      <div className="items">
        {users.map((data, index) => {
          return (
            <div className="item" key={`item ${index}`}>
              <img src={data.pp} alt="pp" />
              <p className="name">{data.name}</p>
              <p className="lastname">{data.lastname}</p>{" "}
              <img
                src="/close.svg"
                alt="close icon"
                className="close"
                onClick={() => remove(index)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
