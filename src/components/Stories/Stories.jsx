import React, { useEffect, useState } from "react";
import axios from "axios";

const Stories = () => {
  const [currentStory, setCurrentStory] = useState("");
  const [searching, setsearching] = useState("");
  const [searchedStory, setSearchedstory] = useState("");


  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  console.log(day, "hi day");
  console.log(month, "hi month");

  useEffect(() => {
    const getStories = async () => {
      try {
        const response = await axios.get(
          `http://numbersapi.com/${month}/${day}/date`
        );
        console.log(response.data, "the response");
        setCurrentStory(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStories();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://numbersapi.com/${searching}/date`
      );
      setSearchedstory(response.data);
    } catch (error) {
        setSearchedstory("wrong input")
    }
  };

  return (
    <div className="bg-blue-600 flex flex-col items-center justify-start min-h-screen w-full gap-12">
      <div className="flex flex-col items-center  gap-8">
        <span className="text-5xl text-red-300">Date Stories</span>
        <span className="text-3xl text-yellow-100 ">
          {" "}
          {currentStory || "loading"}{" "}
        </span>
      </div>

      <div>
        <form action="" onSubmit={handleSearch} className="flex gap-4 flex-col">
          <input
            type="text"
            value={searching}
            onChange={(e) => {
              setsearching(e.target.value);
              console.log("typed value", e.target.value);
            }}
          />

          <button className="bg-blue-400" type="submit">
            Submit
          </button>
        </form>
      </div>

      <div>{searchedStory}</div>
    </div>
  );
};

export default Stories;
