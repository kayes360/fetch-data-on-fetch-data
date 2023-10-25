const {createSlice, createAsyncThunk} = require("@reduxjs/toolkit")
const fetch = require("node-fetch")
//initialState 
const initialState = {
    loading: false,
    videos:[],
    error: ''
}

// create async thunk
const fetchRelatedVideo = createAsyncThunk("video/fetchRelatedVideo", async(generatedLink)=>{
    const response = await fetch(generatedLink)
    const video = await response.json();
   
    const sortedVideo = video.sort((a,b)=> parseFloat(b.views)-parseFloat(a.views))
    return sortedVideo
 
}); 


 const relatedVideoSlice = createSlice({
    name: 'relatedVideo',
     initialState,
     extraReducers: (builder)=>{
        builder.addCase(fetchRelatedVideo.pending, (state, action)=>{
            state.loading = true;
            state.error = "";
        })

        builder.addCase(fetchRelatedVideo.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = "";
            state.videos = action.payload.meta;
        })

        builder.addCase(fetchRelatedVideo.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message;
            state.videos = [];
        })

        
     }
 })

 module.exports = relatedVideoSlice.reducer;
 module.exports.fetchRelatedVideo = fetchRelatedVideo