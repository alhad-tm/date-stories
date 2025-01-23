import React, { useEffect } from "react";
import axios from "axios";

const Stories = () => {
  useEffect(() => {
    const getStories = async () => {
      try {
        const response = await axios.get("http://numbersapi.com/2/2/date");
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStories();
  }, []);

  return;
  <div></div>;
};

export default Stories;
