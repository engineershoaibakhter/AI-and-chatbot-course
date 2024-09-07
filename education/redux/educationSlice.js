const { createSlice } = require("@reduxjs/toolkit");

const initialState={
    classId:null,
    addLink:null,
    loading: false,
    error: null,
}

export const educationSlice=createSlice({
    name:"education",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addProjectLink.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(addProjectLink.fulfilled,(state,action)=>{
            state.loading=false;
            state.addLink=action.payload;
        })
        .addCase(addProjectLink.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload || action.error.message;
        })

        .addCase(updateProjectLink.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(updateProjectLink.fulfilled,(state,action)=>{
            state.loading=false;
            state.addLink={...state.addLink, ...action.payload};
        })
        .addCase(updateProjectLink.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload || action.error.message;
        })

        .addCase(fetchProjectLink.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchProjectLink.fulfilled,(state,action)=>{
            state.loading=false;
            state.addLink=action.payload;
        })
        .addCase(fetchProjectLink.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload || action.error.message;
        })

        // class ID

        .addCase(addClass.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(addClass.fulfilled,(state,action)=>{
            state.loading=false;
            state.classId=action.payload;
        })
        .addCase(addClass.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload || action.error.message;
        })

        .addCase(fetchClass.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchClass.fulfilled,(state,action)=>{
            state.loading=false;
            state.classId=action.payload;
        })
        .addCase(fetchClass.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload || action.error.message;
        })
    }
})

export const selectAddLinkData=(state)=>state.education.addLink;
export const selectLoading=(state)=>state.education.loading;
export const selectError=(state)=>state.education.error;
export const selectClassId=(state)=>state.education.classId;

export default educationSlice.reducer;
