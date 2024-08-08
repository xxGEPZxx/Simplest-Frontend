import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "@mantine/core/styles.css";
import Home from "./page/Home/home";
import PostUser from "./page/Posts/postUser/postUser";
import UpdatePost from "./page/Posts/updatePost/update";
import CreatePost from "./page/Posts/create/create";
import Signing from "./page/Auth/Signing/signing";
import Signup from "./page/Auth/Signup/signup";
import Profile from "./page/Auth/Profile/profile";

function App() {
  return (
    <>
      <MantineProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/post/user" element={<PostUser />} />
            <Route path="/post/update/:id" element={<UpdatePost />} />
            <Route path="/post/create" element={<CreatePost />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </>
  );
}

export default App;
