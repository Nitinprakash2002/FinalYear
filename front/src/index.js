import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Second from './DataFetching/second.js';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Budget from './DataFetching/Budget.js'
import Front from './BusinessLogic/FrontPage.js';
import App from './App';
import Visit from './BusinessLogic/Visit.js'
import Results from './BusinessLogic/Results.js'
import reportWebVitals from './reportWebVitals';
import Describe from './BusinessLogic/Describe.js';
import Data from "./DataFetching/Data.js"
import NewD from "./DataFetching/NewD.js"
import LandingPage from './LoginForm/LandingPage.js';
import AddRent from './BusinessLogic/AddRent.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/SelectOptions/settleInput/chooseOptions/getRecommendations" element={<Second></Second>}></Route>
        <Route path="/SelectOptions/settleInput" element ={<App/>}></Route>
        <Route path="/SelectOptions/visitInput" element ={<Visit/>}></Route>
        <Route path="/DataFetch" element={<App></App>}></Route>
        <Route path="/SelectOptions/settleInput/chooseOptions" element={<Budget/>}></Route>
        <Route path="/SelectOptions/visitInput/Results" element={<Results/>}></Route>
        <Route path="/SelectOptions/visitInput/Results/Description" element={<Describe/>}></Route>
        <Route path="/SelectOptions" element={<Front></Front>}></Route>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/SelectOptions/dineInput" element={<Data/>}></Route>
        <Route path="/values" element={<NewD/>}></Route>
        <Route path="/SelectOptions/addRentals" element={<AddRent/>}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
