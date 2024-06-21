// App.js

import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
const App = () => {
  return (
   <>
 
 <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
   <Toaster/> 
 
   </>
   


 
  );
};

export default App;
