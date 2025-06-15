import CurrentWeather from './pages/CurrentWeather';
import { createBrowserRouter,RouterProvider} from "react-router-dom"
import SearchPage from './pages/SearchPage'
function App() {
  const router = createBrowserRouter([
    { 
      path: '/',
      element: <SearchPage />,
    },
    {
      path: '/:location',
      element: <CurrentWeather/>,
    }
  ]);
  return (<RouterProvider router={router} />
  );
}

export default App;