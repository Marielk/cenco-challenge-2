import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './style/generalStyles.css';
import Dashboard from './pages/dashboard';
import FormDetail from './pages/formDetails';
import Forms from './pages/formsIndex';
import { paths } from './utils/constants';

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path={paths.index} element={ <Dashboard/> } />
        <Route path={paths.forms} element={ <Forms /> } />
        <Route path={paths.formDetails + '/:id'} element={ <FormDetail/> } />
      </Routes>
   </BrowserRouter>
  );
}

export default App;
