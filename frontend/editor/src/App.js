import React, { useState, useEffect } from "react";
 
function App() {
    const [data, setdata] = useState({
        name: "",
        age: 0,
        date: "",
        programming: "",
    });
 
    useEffect(() => {
        fetch("/data").then((res) =>
            res.json().then((data) => {
                setdata({
                    name: data.Name,
                    age: data.Age,
                    date: data.Date,
                    programming: data.programming,
                });
            })
        );
    }, []);
 
    return (
        <div className="App">
            <header className="App-header">
                <h1>React and flask</h1>
                <p>{data.name}</p>
                <p>{data.age}</p>
                <p>{data.date}</p>
                <p>{data.programming}</p>
 
            </header>
        </div>
    );
}
 
export default App;
