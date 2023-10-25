const {createSlice, createAsyncThunk} = require("@reduxjs/toolkit")
const fetch = require("node-fetch")
//initialState 
const initialState = {
    loading: false,
    videos:[],
    error: ''
}

// create async thunk
const fetchVideo = createAsyncThunk("video/fetchVideo", async()=>{
    const response = await fetch("http://localhost:9000/videos")
    const video = await response.json();
    return video
}); 


 const videoSlice = createSlice({
    name: 'video',
     initialState,
     extraReducers: (builder)=>{
        builder.addCase(fetchVideo.pending, (state, action)=>{
            state.loading = true;
            state.error = "";
        })

        builder.addCase(fetchVideo.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = "";
            state.videos = action.payload;
        })

        builder.addCase(fetchVideo.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message;
            state.videos = [];
        })

        
     }
 })

 module.exports = videoSlice.reducer;
 module.exports.fetchVideo = fetchVideo