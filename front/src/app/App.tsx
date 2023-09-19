import React, { Suspense } from 'react';
import './styles/App.scss';
import { PageLoader } from 'widgets/PageLoader/PageLoader';
import { AppRouter } from './router';

function App() {
  return (
    <div className="App">
    <Suspense fallback={<PageLoader />}>
      <AppRouter />
    </Suspense>
    </div>
  );
}

export default App;
