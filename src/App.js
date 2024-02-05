import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import Homepage from "./pages/Homepage";
import SingleBlog from "./pages/SingleBlog";
import AppLayout from "./ui/AppLayout";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Dashboard from "./pages/dashboard/Dashboard";
import Register from "./pages/authentication/Register";
import Login from "./pages/authentication/Login";
import AddPost from "./pages/dashboard/AddPost";
import ManagePost from "./pages/dashboard/ManagePost";

// import AddCategory from "./pages/dashboard/AddCategory";
// import ManageCategory from "./pages/dashboard/ManageCategory";
// import EditCategory from "./pages/dashboard/EditCategory";

import ManageUsers from "./pages/dashboard/ManageUsers";
import EditPost from "./pages/dashboard/EditPost";
import EditUsers from "./pages/dashboard/EditUsers";
import ProtectedRoute from "./ui/ProtectedRoute";
import Profile from "./pages/dashboard/Profile";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Homepage />} />

            <Route path="singleblog/:id" element={<SingleBlog />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="about" element={<About />} />
            <Route path="dashboard" element={<Dashboard />}>
              {/* Automatically navigate to "dashboard/addpost" */}
              <Route index element={<Navigate replace to="addpost" />} />
              <Route path="addpost" element={<AddPost />} />
              <Route path="managepost" element={<ManagePost />}>
                <Route path="editpost/:userId" element={<EditPost />} />
              </Route>
              <Route path="manageuser" element={<ManageUsers />}>
                <Route path="edituser/:userId" element={<EditUsers />} />
              </Route>
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            background: "#210c41",
            color: "#a77ee8",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
