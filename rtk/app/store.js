const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit");
const videoReducer = require("../features/videoSlice");
const relatedVideoSlice = require("../features/relatedVideoSlice");
const { createLogger } = require("redux-logger");

const logger = createLogger();

//configure store
const store = configureStore({
  reducer: {
    video: videoReducer,
    relatedVideo: relatedVideoSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

module.exports = store;
