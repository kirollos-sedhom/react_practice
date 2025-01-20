// import data from "./data.js";
import React, { useEffect, useState } from "react";
import "./style.css";
export default function Accordion() {
  const [selected, setSelected] = React.useState(null);
  const [enabledMultiSelect, setEnabledMultiselect] = React.useState(false);
  const [multiSelectArray, setMultiSelectArray] = React.useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleSelect(id) {
    if (enabledMultiSelect) {
      let copyMultiSelect = [...multiSelectArray];
      if (copyMultiSelect.includes(id)) {
        copyMultiSelect = copyMultiSelect.filter((item) => item !== id);
      } else {
        copyMultiSelect.push(id);
      }
      console.log(copyMultiSelect);
      setMultiSelectArray(copyMultiSelect);
    } else {
      if (selected === id) {
        setSelected(null);
      } else {
        setSelected(id);
      }
    }
  }

  function handleVisibility(id) {
    if (enabledMultiSelect) {
      return multiSelectArray.includes(id);
    } else {
      return selected === id;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://v2.jokeapi.dev/joke/Misc,Pun,Spooky?format=json&blacklistFlags=nsfw,sexist,religious,racist,explicit&type=twopart&lang=en&amount=3"
        );
        const jsonData = await response.json();

        if (!jsonData.error) {
          setData(Array.isArray(jsonData.jokes) ? jsonData.jokes : [jsonData]);
        } else {
          throw new Error("Error fetching jokes");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      setMultiSelectArray([]);
    };
  }, []);
  // console.log(data);
  return isLoading ? (
    <p>loading</p>
  ) : (
    <div className="accordion">
      <button onClick={() => setEnabledMultiselect((state) => !state)}>
        {enabledMultiSelect ? "disable multi-select" : "enable multi-select"}
      </button>
      {data.map((item) => {
        return (
          <div className="wrapper" key={item.id}>
            <span onClick={() => handleSelect(item.id)}>
              <div className="question">{item.setup}</div>
              <div className="plus">
                {handleVisibility(item.id) ? "-" : "+"}{" "}
              </div>
            </span>
            {handleVisibility(item.id) && (
              <div className="answer">{item.delivery}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
