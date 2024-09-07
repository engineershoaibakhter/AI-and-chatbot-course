"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import Education from "./Education";
import {
  addClass,
  fetchClass,
  addProjectLink,
  selectClassId,
  selectAddLinkData,
  fetchProjectLink
} from "@/redux/educationSlice";

const InputForm = () => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");
  const [classIdInput, setClassIdInput] = useState("");
  const [previousProjectLinks, setPreviousProjectLinks] = useState([]);
  const classId = useSelector(selectClassId);
  const addLink = useSelector(selectAddLinkData);

  const handleClassIdSubmit = async(e) => {
    e.preventDefault();
    if (classIdInput === "") {
      toast.error("Please enter a Class ID");
      return;
    }

    try {
      const response = await dispatch(addClass({ uid: classIdInput, addData: { classId: classIdInput } }) ).unwrap();
  
      // If the class exists, display it
      if (response) {
        await dispatch(fetchClass(classIdInput)).unwrap();
        const links = await dispatch(fetchProjectLink(classIdInput)).unwrap(); // Fetch previous project links
        setPreviousProjectLinks(links); // Store them in state
        console.log(links);
        toast.success(`New Class ID ${classIdInput} added!`);
      } else {
        // If class doesn't exist, add it and then display it
        
      }
    } catch (err) {
      toast.error("Error fetching or adding Class ID");
    }
  };

  const handleTodoSubmit = (e) => {
    e.preventDefault();
    if (todo === "") {
      toast.error("Please write your link");
      return;
    }

    dispatch(
      addProjectLink({
        uid: classId,
        addData: { linkId: Math.random().toString(), link: todo },
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Link added");
        setTodo("");
      })
      .catch((err) => {
        toast.error("Error adding link");
      });
  };

  return (
    <>
      <div className="flex justify-between mb-10">
        <h1 className="text-3xl font-bold text-center text-green-400">Education Portal</h1>
        <form onSubmit={handleClassIdSubmit} className="flex items-center gap-4 h-10 md:h-12 relative">
          <input
            className="w-full h-full border-[1px] border-gray-600 bg-transparent pl-4 pr-10 placeholder:text-gray-400 text-base rounded-md outline-none"
            type="text"
            value={classIdInput}
            onChange={(e) => setClassIdInput(e.target.value)}
            placeholder="Enter Class ID"
          />
          <button
            type="submit"
            className="h-full flex justify-center items-center border-[1px] text-center bg-green-400 text-black px-2 rounded-md uppercase"
          >
            <FaArrowRight />
          </button>
        </form>
      </div>
      <div>
        {classId && (
          <>
            <h1 className="text-4xl font-bold text-center mb-10">
              Class ID: <span className="text-green-400">{classId}</span>
            </h1>
            <form onSubmit={handleTodoSubmit} className="flex items-center gap-4 h-10 md:h-12 relative">
              <div className="relative flex-1 h-full">
                <input
                  type="text"
                  className="w-full h-full border-[1px] border-gray-600 bg-transparent pl-4 pr-10 placeholder:text-gray-400 text-base rounded-md"
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                  placeholder="Enter link"
                />
                {todo && <MdClose onClick={() => setTodo("")} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-lg cursor-pointer" />}
              </div>
              <button
                type="submit"
                className="h-full flex justify-center items-center border-[1px] bg-green-400 text-black px-2 rounded-md"
              >
                <IoIosAddCircle className="text-xl" />
              </button>
            </form>
          </>
        )}
        {classId && <Education classId={classId}/>}
      </div>
    </>
  );
};

export default InputForm;
