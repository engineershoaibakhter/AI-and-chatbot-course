import { deleteTodo, removeTodo } from "@/redux/todoSlice";
import { State } from "@/type";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Education = () => {
  const dispatch = useDispatch();
  const [showRemove, setShowRemove] = useState(false);

  const { todoList } = useSelector((state) => state?.todo);
  return (
    <div className="flex flex-col gap-4 mt-2 p-4 border border-gray-600 rounded-md">
      {todoList?.length > 0 && (
        <>
          <ul
            className="max-h-[300px] border border-slate-500 p-2 shadow-lg
            shadow-gray-800 flex flex-col gap-2 overflow-y-auto"
          >
            {todoList?.map((item) => (
              <li
                className="border-l-green-500 border-green-900 w-full font-medium
                border-[1px] border-l-[6px] px-2 py-1 cursor-pointer flex items-center justify-between"
                key={item?._id}
              >
                {item?.todo}
                <MdDelete
                  onClick={() => {
                    dispatch(deleteTodo(item?._id));
                    toast.success("Todo Deleted Successfully!");
                  }}
                  className="text-lg hover:text-red-500 duration-200"
                />
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowRemove(true)}
            className="text-sm text-orange-500 text-center bg-transparent border-[1px]
            border-gray-600 rounded-md px-4 py-3 mt-2 hover:border-red-500 duration-200"
          >
            Remove Todo
          </button>
        </>
      )}
      {todoList?.length === 0 && (
        <p className="text-center text-base text-yellow-600 font-medium tracking-wide">
          Your Todo list is Empty!
        </p>
      )}
      {showRemove && (
        <div className="fixed inset-0 flex items-center justify-center bg-bodyColor bg-opacity-60 z-50">
          <div className="relative p-8 bg-black shadow-todoShadow rounded-md max-w-sm w-full mx-4">
            <p className="text-base lg:text-xl text-center font-medium text-red-500">
              Are you sure to{" "}
              <span className="font-semibold underline underline-offset-2 decoration-[1px]">
                remove
              </span>{" "}
              all the todos?
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                onClick={() => setShowRemove(false)}
                className="px-6 py-2 text-base font-semibold bg-transparent border-[1px]
                border-gray-500 hover:border-red-500 duration-300 rounded-md"
              >
                No
              </button>
              <button
                onClick={() => {
                  dispatch(removeTodo());
                  toast.success("All Todos Removed Successfully!");
                  setShowRemove(false);
                }}
                className="px-6 py-2 text-base font-semibold bg-transparent border-[1px]
                border-gray-500 hover:border-red-500 duration-300 rounded-md"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Education;
