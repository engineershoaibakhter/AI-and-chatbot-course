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

const Education = () => {
  const dispatch = useDispatch();
  const addLink = useSelector(selectAddLinkData);
  const [editMode, setEditMode] = useState(false);
  const [currentLink, setCurrentLink] = useState("");
  const [editingLinkId, setEditingLinkId] = useState("");

  const handleEditLink = (linkId, link) => {
    setEditMode(true);
    setCurrentLink(link);
    setEditingLinkId(linkId);
  };

  const handleUpdateLink = () => {
    if (currentLink === "") {
      toast.error("Link cannot be empty");
      return;
    }

    dispatch(updateProjectLink({ uid: editingLinkId, link: currentLink }))
      .unwrap()
      .then(() => {
        toast.success("Link updated");
        setEditMode(false);
        setCurrentLink("");
        setEditingLinkId("");
      })
      .catch((err) => {
        toast.error("Error updating link");
      });
  };

  const handleDeleteLink = (linkId) => {
    dispatch(removeTodo(linkId))
      .unwrap()
      .then(() => {
        toast.success("Link deleted successfully");
      })
      .catch((err) => {
        toast.error("Error deleting link");
      });
  };

  return (
    <div className="flex flex-col gap-4 mt-2 p-4 border border-gray-600 rounded-md">
      {addLink?.length > 0 ? (
        <ul className="border border-slate-500 p-2 shadow-lg flex flex-col gap-2 overflow-y-auto">
          {addLink?.map((item) => (
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
        <p className="text-center text-base text-yellow-600">Your Todo list is empty!</p>
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
