const store = require("./app/store")

const { fetchVideo } = require("./features/videoSlice")
const { fetchRelatedVideo } = require("./features/relatedVideoSlice")

store.subscribe(() =>{ 

})


let videoTags;
const fetchVideoData = async () => {
    // Dispatch the fetchVideo action
    await store.dispatch(fetchVideo());
  
    // Get the updated state after the action has been fulfilled
    videoTags = store.getState().video.videos.tags; 
};

// Call the asynchronous function to fetch and log the video data
fetchVideoData().then(()=>{  

    const generatedLink = `http://localhost:9000/videos?${videoTags.map(tag => `tags_like=${tag}`).join('&')}` 



    console.log( "generatedLink", generatedLink); 
    store.dispatch(fetchRelatedVideo(generatedLink)).then(() => {
        const relatedVideoState = store.getState().relatedVideo; // Get the state of the related video action
        console.log("relatedVideoState", relatedVideoState);
      }); 
     
})  

// sample link -- http://localhost:9000/videos?tags_like=javascript&tags_like=react

// http://localhost:9000/videos?tags_like=tailwind?tags_like=css