"use client";
import { addTodo } from "@/redux/todoSlice";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import Education from "./Education";

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
      <h1 className="text-3xl font-bold text-center">Todo Application with</h1>
      <h1 className="text-3xl font-bold text-center"><span className="text-green-400">Next JS</span>, <span className="text-red-600">Redux Toolkit</span> & <span className="text-yellow-600">Tailwind CSS</span></h1>
    <div>
      {/* Todo Form */}
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
          className="h-full border-[1px] border-gray-600 px-2 rounded-md 
          hover:text-orange-600 uppercase duration-200 text-sm md:text-base"
        >
          Add todo
        </button>
      </form>
      <Education />
      {/* TodoList */}
    </div>
    </>
  );
};

export default InputForm;
