import './App.css'
import Login from "./Login";
import {Route} from "react-router";
import {BrowserRouter, Routes} from "react-router-dom";
import Home from "./Home";
import {PrivateRoute} from "./Generic/PrivateRoute";
import EditProfile from "./EditProfile";
import Empresa from "./Empresa";
import Personal from "./Personal";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/home" element={
                  <PrivateRoute>
                      <Home/>
                  </PrivateRoute>
              }/>
              <Route path="/edit-profile" element={
                  <PrivateRoute>
                      <EditProfile />
                  </PrivateRoute>}/>
              <Route path="/empresa" element={
                  <PrivateRoute>
                      <Empresa />
                  </PrivateRoute>}/>
              <Route path="/personal" element={
                  <PrivateRoute>
                      <Personal />
                  </PrivateRoute>}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App;
