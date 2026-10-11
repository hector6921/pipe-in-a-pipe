import React from 'react';
import './App.css';

import SignIn from './components/signIn';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import CollapsibleTable from './pages/repoWorkStation';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="repo-work-station" element={<CollapsibleTable />} />
      </Routes>
    </div>
  );
}

export default App;
