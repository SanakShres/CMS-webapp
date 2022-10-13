import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import SingleItem from "./pages/singleItem/SingleItem";
import New from "./pages/new/New";
import NewVenue from "./pages/newVenue/NewVenue";
import "./styles/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import TestBlock from "./pages/test/TestBlock";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className={darkMode ? "app dark" : "app"}>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List title="users" />
                  </RequireAuth>
                }
              />
              <Route
                path=":id"
                element={
                  <RequireAuth>
                    <SingleItem />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New title="Add New User" />
                  </RequireAuth>
                }
              />
              <Route
                path="update/:id"
                element={
                  <RequireAuth>
                    <New title="Update User" />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="venues">
              <Route
                index
                element={
                  <RequireAuth>
                    <List title="venues" />
                  </RequireAuth>
                }
              />
              <Route
                path=":venueId"
                element={
                  <RequireAuth>
                    <SingleItem />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewVenue />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="bookings">
              <Route
                index
                element={
                  <RequireAuth>
                    <List title="bookings" />
                  </RequireAuth>
                }
              />
              <Route
                path=":bookingId"
                element={
                  <RequireAuth>
                    <SingleItem />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New title="Add New Booking" />
                  </RequireAuth>
                }
              />
              <Route
                path="update/:id"
                element={
                  <RequireAuth>
                    <New title="Update Booking" />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="/test" element={<TestBlock />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
