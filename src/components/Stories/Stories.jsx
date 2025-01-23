import React, { useEffect, useState } from "react";
import axios from "axios";

const Stories = () => {
  const [currentStory, setCurrentStory] = useState("");
  const [searching, setSearching] = useState("");
  const [searchedStory, setSearchedStory] = useState("");

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  console.log(day, "is the day");
  console.log(month, "is the month");

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
        setCurrentStory(
          "Failed to load today's story. Please try again later."
        );
      }
    };
    getStories();
  }, [day, month]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearching(""); //Clear input field

    // Validation
    if (!searching.match(/^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])$/)) {
      setSearchedStory(
        "Invalid date format. Please use MM/DD and ensure the date is valid"
      );
      return; 
    }

    try {
      const response = await axios.get(
        `http://numbersapi.com/${searching}/date`
      );
      setSearchedStory(response.data);
    } catch (error) {
      setSearchedStory("Failed to fetch story for the entered date.");
    }
    setSearching("");
  };

  return (
    <div className="bg-blue-700 flex flex-col items-center justify-start min-h-screen w-full gap-12">
      <div className="flex flex-col items-center  gap-8">
        <span className="text-4xl text-red-200 mt-8 uppercase">
          Today's story
        </span>
        <div className="w-4/5  items-center justify-center flex  ">
          <span className="text-xl md:text-2xl italic text-yellow-100 ">
            {" "}
            {currentStory || "Loading...."}{" "}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-8 w-full items-center justify-center">
        <span className="text-xl md:text-3xl text-gray-400 mt-8 uppercase">
          Search Another day's story
        </span>

        <form
          action=""
          onSubmit={handleSearch}
          className="flex gap-4  w-full items-center justify-center"
        >
          <input
            className="border border-gray-300 text-black rounded outline-none p-2 text-base"
            type="text"
            placeholder="Use MM/DD format"
            value={searching}
            onChange={(e) => {
              setSearching(e.target.value);
              console.log("typed value", e.target.value);
            }}
          />

          <button
            className="bg-blue-400 p-2 text-base text-white rounded"
            type="submit"
          >
            Submit
          </button>
        </form>

        <div className="w-4/5  items-center justify-center flex ">
          <span className="text-2xl text-red-200"> {searchedStory} </span>
        </div>
      </div>
    </div>
  );
};

export default Stories;
