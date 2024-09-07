const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import { db } from "../Firebase/FirebaseConfig"; // Make sure you have Firebase initialized
import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, query, where, getDocs } from "firebase/firestore";

// Add project link
export const addProjectLink = createAsyncThunk('education/addProjectLink', async ({ uid, addData }, { rejectWithValue }) => {
    try {
      const projectDocRef = doc(db, 'projectLink', uid);
      
      // Get the existing data
      const projectDoc = await getDoc(projectDocRef);
      let existingLinks = [];
  
      if (projectDoc.exists()) {
        existingLinks = projectDoc.data().links || [];
      }
  
      // Add the new link to the existing links
      existingLinks.push(addData);
  
      // Update the document with the new links array
      await setDoc(projectDocRef, { links: existingLinks }, { merge: true }); // Use merge to keep existing data
      return existingLinks; // Return updated links array
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });


  export const fetchProjectLink = createAsyncThunk('education/fetchProjectLink', async (uid, { rejectWithValue }) => {
    try {
      const projectDocRef = doc(db, 'projectLink', uid);
      const projectDoc = await getDoc(projectDocRef);
  
      if (projectDoc.exists()) {
        return projectDoc.data(); // Return all data, including links
      } else {
        return { links: [] }; // Return an empty array if no data
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });



// Fetch class data
export const fetchClass = createAsyncThunk('education/fetchClass', async (uid, { rejectWithValue }) => {
  try {
    const projectDocRef = doc(db, 'classLink', uid);
    console.log(projectDocRef);
    const projectDoc = await getDoc(projectDocRef);
    if (projectDoc.exists()) {
      return projectDoc.data();
    } else {
      throw new Error('No data found');
    }
  } catch (error) {
    console.log(error.message);
    return rejectWithValue(error.message);
  }
});

// Add class data
export const addClass = createAsyncThunk('education/addClass', async ({ uid, addData }, { rejectWithValue }) => {
  try {
    const classDocRef = doc(db, 'classLink', uid);
    await setDoc(classDocRef, addData);
    return addData;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});



// Update project link
// Update project link
export const updateProjectLink = createAsyncThunk('education/updateProjectLink', async ({ uid, linkId, newLink }, { rejectWithValue }) => {
    try {
      const projectDocRef = doc(db, 'projectLink', uid);
      const projectDoc = await getDoc(projectDocRef);
  
      if (projectDoc.exists()) {
        const existingLinks = projectDoc.data().links || [];
        const index = existingLinks.findIndex(link => link.linkId === linkId);
  
        if (index !== -1) {
          existingLinks[index] = { ...existingLinks[index], link: newLink }; // Update the link
          await setDoc(projectDocRef, { links: existingLinks }, { merge: true }); // Merge the new links array
        }
      } else {
        throw new Error('Document does not exist');
      }
  
      return newLink; // Return the updated link
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });
  

// Remove project link
export const removeTodo = createAsyncThunk('education/removeTodo', async (linkId, { rejectWithValue }) => {
  try {
    const projectDocRef = doc(db, 'projectLink', linkId);
    await deleteDoc(projectDocRef);
    return linkId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Automatically delete documents after 24 hours
export const deleteOldDocs = createAsyncThunk('education/deleteOldDocs', async (_, { rejectWithValue }) => {
  try {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    const q = query(collection(db, 'projectLink'), where('createdAt', '<=', yesterday));
    const snapshot = await getDocs(q);
    
    const batch = db.batch();
    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const educationSlice = createSlice({
  name: "education",
  initialState: {
    classId: "",
    addLinkData: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchClass.fulfilled, (state, action) => {
      state.classId = action.payload?.classId || "";
    });
    builder.addCase(fetchProjectLink.fulfilled, (state, action) => {
      state.addLinkData = action.payload?.links || [];
    });
    builder.addCase(addProjectLink.fulfilled, (state, action) => {
      state.addLinkData.push(action.payload);
    });
    builder.addCase(updateProjectLink.fulfilled, (state, action) => {
      const index = state.addLinkData.findIndex((link) => link.linkId === action.payload.linkId);
      if (index !== -1) {
        state.addLinkData[index] = action.payload;
      }
    });
    builder.addCase(removeTodo.fulfilled, (state, action) => {
      state.addLinkData = state.addLinkData.filter((link) => link.linkId !== action.payload);
    });
  }
});

export const { } = educationSlice.actions;
export const selectClassId = (state) => state.education.classId;
export const selectAddLinkData = (state) => state.education.addLinkData;

export default educationSlice.reducer;
