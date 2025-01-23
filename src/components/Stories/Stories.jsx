import React, { useEffect, useState } from "react";
import axios from "axios";

const Stories = () => {
   const [story,setStory]=useState("")


    const date= new Date();
    const day=date.getDate();
    const month=date.getMonth()+1;
    console.log(day,"hi day");
    console.log(month,"hi month");
    
  useEffect(() => {
    const getStories = async () => {
      try {
        const response = await axios.get(`http://numbersapi.com/${month}/${day}/date`);
        console.log(response.data,"this");
        setStory(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    getStories();
  }, []);

  return(
  <div className="bg-blue-600 flex flex-col items-center justify-center gap-12 min-h-screen w-full">
    <span className='text-5xl text-red-300'>
        Date Stories
      </span>
  <span className="text-3xl text-yellow-100 ">   {story || "loading"} </span>
  </div>
  )
};

export default Stories;
