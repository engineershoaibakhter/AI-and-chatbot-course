"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import Education from "./Education";
import { FaArrowRight } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

const InputForm = () => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");

  const handleTodo = () => {
    e.preventDefault();
    if (todo === "") {
      toast.error("Please write your todo");
    } else {
      dispatch(
        addTodo({
          _id: Math.random().toString(),
          todo: todo,
        })
      );

      toast.success("Todo added");
      setTodo("");
    }
  };

  return (
    <>
    <div className="flex justify-between mb-10">
      <h1 className="text-3xl font-bold text-center text-green-400">Education Portal</h1>
      <h1 className="text-3xl font-bold text-center">
        
        <form className="flex items-center gap-4 h-10 md:h-12 relative">
          <input
          className="w-full h-full border-[1px] border-gray-600
          bg-transparent pl-4 pr-10 md:pr-12 placeholder:text-gray-400 text-base md:text-sm tracking-wide
          rounded-md outline-none hover:border-green-500
          focus-visible:border-gray-500 duration-200"
          type="text" id="classId" name="classId" placeholder="Enter Class ID" />
          <button
          type="submit"
          className="h-full flex justify-center items-center border-[1px] min-w-12 text-center bg-green-400 text-black border-gray-600 px-2 rounded-md uppercase duration-200 text-sm md:text-base"
        >
          <FaArrowRight />
        </button>
        </form>
      </h1>
    </div>
    <div>
      {/* Todo Form */}
      <h1 className="text-4xl font-bold text-center mb-10">Class ID: <span className="text-green-400">{}1253</span></h1>
      <form
        onSubmit={handleTodo}
        className="flex items-center gap-4 h-10 md:h-12 relative"
      >
        <div className="relative flex-1 h-full">
          <input
            type="text"
            className="w-full h-full border-[1px] border-gray-600
              bg-transparent pl-4 pr-10 md:pr-12 placeholder:text-gray-400 text-base md:text-sm tracking-wide
              rounded-md outline-none hover:border-green-500
              focus-visible:border-gray-500 duration-200"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          {todo && (
            <MdClose
              onClick={() => setTodo("")}
              className="absolute top-1/2 right-3 md:right-4 transform -translate-y-1/2 text-lg hover:text-red-600 cursor-pointer duration-200"
            />
          )}
        </div>
        <button
          type="submit"
          className="h-full flex justify-center items-center min-w-12 border-[1px] border-gray-600 px-2 rounded-md 
    bg-green-400 text-black font-bold uppercase duration-200 text-sm md:text-base"
        >
           <IoIosAddCircle className=" text-xl" />
        </button>
      </form>
      <Education />
      {/* TodoList */}
    </div>
    </>
  );
};

export default InputForm;
