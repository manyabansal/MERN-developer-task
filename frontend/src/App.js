import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import PageRenderer from "./page-renderer";
import SignUp from "./pages/sign-up";
import Navbar from "./components/navbar";
import { UserContextProvider } from "./user-context";
import Chat from "./pages/chat";
function App() {
  return (
    <UserContextProvider>
    <Router>
    <div className="App">
      <Navbar/>
      <Routes>
      <Route path="/:page" element={<PageRenderer />} />
        <Route path="/" element={<SignUp />} />
        {/* <Route path="/post/:id" element={<PostPage />}/>
        <Route path="/posts/:id" element={<UserPosts />}/>
        <Route path="/edit/:id" element={<EditPost />} /> */}
        <Route component={()=>404}/>
      </Routes>
    </div>
    </Router>
    </UserContextProvider>
  );
}

export default App;