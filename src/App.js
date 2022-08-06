import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import SingleItem from "./pages/singleItem/SingleItem";
import New from "./pages/new/New";
import { bookingInputs, userInputs } from "./formSource";
import "./styles/dark.scss";

function App() {
  return (
    <div className="app dark">
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<SingleItem />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="bookings">
              <Route index element={<List />} />
              <Route path=":bookingId" element={<SingleItem />} />
              <Route
                path="new"
                element={<New inputs={bookingInputs} title="Add New Booking" />}
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
