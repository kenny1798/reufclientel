import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Reserve from './pages/Reserve';
import ReserveFinish from './pages/ReserveFinish';
import ReserveSuccess from './pages/ReserveSuccess';
import ReserveFailed from './pages/ReserveFailed';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Reserve />} />
        <Route path='/reserve-finish' element={<ReserveFinish />} />
        <Route path='/reserve-success' element={<ReserveSuccess />} />
        <Route path='/reserve-failed' element={<ReserveFailed />} />
      </Routes>
    </div>
  );
}

export default App;
