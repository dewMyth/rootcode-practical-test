// import { configureStore } from "@reduxjs/toolkit";

// import authReducer from "./authReducer";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import quizReducer from "./quizReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  quiz: persistReducer(persistConfig, quizReducer),
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export const persistor = persistStore(store);
