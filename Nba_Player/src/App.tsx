import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>加载中...</div>}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
