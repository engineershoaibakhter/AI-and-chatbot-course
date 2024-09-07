import educationSlice from "./educationSlice";

const { configureStore } = require("@reduxjs/toolkit");

export const store=configureStore({
    reducer:{
        education:educationSlice,
    }
})


