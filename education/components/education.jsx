"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  fetchProjectLink,
  updateProjectLink,
  removeTodo,
  selectAddLinkData,
} from "@/redux/educationSlice";

const Education = ({ classId }) => {
  const dispatch = useDispatch();
  const addLink = useSelector(selectAddLinkData);
  const [getData, setGetData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentLink, setCurrentLink] = useState("");
  const [editingLinkId, setEditingLinkId] = useState("");
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await dispatch(fetchProjectLink(classId)).unwrap();
        setGetData(response);
        console.log(response);
      } catch (err) {
        toast.error("Error fetching links");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchLinks();
  }, [dispatch, classId]);

  const handleEditLink = (linkId, link) => {
    setEditMode(true);
    setCurrentLink(link);
    setEditingLinkId(linkId);
  };

  const handleUpdateLink = async () => {
    if (currentLink === "") {
      toast.error("Link cannot be empty");
      return;
    }

    try {
      await dispatch(updateProjectLink({ uid: classId, linkId: editingLinkId, newLink: currentLink })).unwrap();
      toast.success("Link updated");
      setEditMode(false);
      setCurrentLink("");
      setEditingLinkId("");

      // Fetch updated links after updating
      const updatedLinks = await dispatch(fetchProjectLink(classId)).unwrap();
      setGetData(updatedLinks);
    } catch (error) {
      toast.error("Error updating link");
    }
  };

  const handleDeleteLink = async (linkId) => {
    try {
      // Pass both uid and linkId to removeTodo
      await dispatch(removeTodo({ uid: classId, linkId })).unwrap();
      toast.success("Link deleted successfully");
  
      // Fetch updated links after deleting
      const updatedLinks = await dispatch(fetchProjectLink(classId)).unwrap();
      setGetData(updatedLinks);
    } catch (error) {
      toast.error("Error deleting link");
      console.error("Error deleting link:", error); // Add console log to debug the error
    }
  };
  

  if (loading) {
    return <p className="text-center text-base text-yellow-600">Loading...</p>; // Loading message
  }

  return (
    <div className="flex flex-col gap-4 mt-2 p-4 border border-gray-600 rounded-md">
      {addLink?.length > 0 ? (
        <ul className="border border-slate-500 p-2 shadow-lg flex flex-col gap-2 overflow-y-auto">
          {addLink.map((item) => (
            <li key={item?.linkId} className="border-l-green-500 border-green-900 w-full flex items-center justify-between">
              <span>{item?.link}</span>
              <div className="flex items-center gap-2">
                <MdEdit onClick={() => handleEditLink(item.linkId, item.link)} className="text-lg cursor-pointer" />
                <MdDelete onClick={() => handleDeleteLink(item.linkId)} className="text-lg cursor-pointer" />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-base text-yellow-600">This class has no data!</p>
      )}
      {editMode && (
        <div className="flex flex-col gap-2">
          <input
            className="border border-gray-600 p-2"
            type="text"
            value={currentLink}
            onChange={(e) => setCurrentLink(e.target.value)}
          />
          <button onClick={handleUpdateLink} className="bg-green-400 text-black px-4 py-2 rounded-md">
            Update Link
          </button>
        </div>
      )}
    </div>
  );
};

export default Education;
