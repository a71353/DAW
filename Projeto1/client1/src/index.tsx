import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './css/index.css';
import 'normalize.css';
import Create from './components/CreateActivity';
import Reminder from './components/MyReminder';
import Activity from './components/Activity';
import Update from './components/UpdateActivity';
import Activities from "./components/Activities";
import Creators from "./components/creators";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <Router>
          <Routes>
              <Route path="/" element={<Activities />} />
              <Route path="/createActivity" element={<Create />} />
              <Route path="/myReminder" element={<Reminder />} />
              <Route path="/activity" element={<Activity />}/>
              <Route path="/update" element={<Update />}/>
              <Route path="/creators" element={<Creators />}/>
          </Routes>
      </Router>
  </React.StrictMode>
);
