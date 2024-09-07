"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { MdBrowserUpdated, MdDelete, MdEdit } from "react-icons/md";
import {
  fetchProjectLink,
  updateProjectLink,
  removeTodo,
  selectAddLinkData,
} from "@/redux/educationSlice";

const Education = ({ classId }) => {
  const dispatch = useDispatch();
  const addLink = useSelector(selectAddLinkData); // Fetching the links from the Redux store
  const [editMode, setEditMode] = useState(null); // Store the ID of the link in edit mode
  const [currentLink, setCurrentLink] = useState(""); // Store the currently edited link content

  useEffect(() => {
    // Fetch project links on component mount or classId change
    dispatch(fetchProjectLink(classId));
  }, [dispatch, classId]);

  const handleEditLink = (linkId, link) => {
    setEditMode(linkId); // Enable edit mode for the selected link
    setCurrentLink(link); // Set the current link value for editing
  };

  const handleUpdateLink = async (linkId) => {
    if (currentLink === "") {
      toast.error("Link cannot be empty");
      return;
    }

    try {
      await dispatch(updateProjectLink({ uid: classId, linkId, newLink: currentLink })).unwrap();
      toast.success("Link updated");
      setEditMode(null); // Exit edit mode after updating
      setCurrentLink("");

      // Refetch updated links after the update
      dispatch(fetchProjectLink(classId));
    } catch (error) {
      toast.error("Error updating link");
    }
  };

  const handleDeleteLink = async (linkId) => {
    try {
      await dispatch(removeTodo({ uid: classId, linkId })).unwrap();
      toast.success("Link deleted successfully");

      // Refetch updated links after deletion
      dispatch(fetchProjectLink(classId));
    } catch (error) {
      toast.error("Error deleting link");
      console.error("Error deleting link:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-2 p-4 border border-gray-600 rounded-md">
      {addLink?.length > 0 ? (
        addLink.map((item) => (
          <ul key={item?.linkId} className="border border-slate-500 p-2 shadow-lg flex flex-col gap-2 overflow-y-auto">
            <li className="border-l-green-500 border-green-900 w-full flex items-center justify-between">
              {/* If this item is in edit mode, show the input field */}
              {editMode === item?.linkId ? (
                <input
                  type="text"
                  className="flex-1 h-[3rem] mr-4 border-[1px] border-gray-600 bg-transparent pl-4 pr-10 placeholder:text-gray-400 text-base rounded-md"
                  value={currentLink}
                  onChange={(e) => setCurrentLink(e.target.value)}
                />
              ) : (
                <span>{item?.link}</span>
              )}
              <div className="flex items-center gap-2">
                {/* If in edit mode, show the update button */}
                {editMode === item?.linkId ? (
                  <button
                    onClick={() => handleUpdateLink(item?.linkId)}
                    className="h-[3rem] bg-green-400 font-bold text-black px-4 py-2 rounded-md"
                  >
                    
                    <MdBrowserUpdated className="text-2xl"/>
                  </button>
                ) : (
                  <>
                    <MdEdit
                      onClick={() => handleEditLink(item?.linkId, item?.link)}
                      className="text-lg cursor-pointer"
                    />
                    <MdDelete
                      onClick={() => handleDeleteLink(item?.linkId)}
                      className="text-lg cursor-pointer"
                    />
                  </>
                )}
              </div>
            </li>
          </ul>
        ))
      ) : (
        <p className="text-center text-base text-yellow-600">This class has no data!</p>
      )}
    </div>
  );
};

export default Education;
