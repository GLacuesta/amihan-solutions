import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Loading from './components/Loading';
import RoutesHOC from './routes';

function App() {
  return (
    <div className="mx-auto justify-center">

        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <RoutesHOC />
          </Suspense>
        </BrowserRouter>

    </div>
  )
}

export default App;
