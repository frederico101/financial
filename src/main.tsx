import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'

import  EnterpriseCustomer  from './components/EnterpriseCustomer.tsx'
import  Post  from './Post/Post.tsx'
import MapContainer from './components/routeComponent/MapContainer.tsx'

const router = createBrowserRouter([ 
   {
      element: <App />,
      children: [
        {
          path: "/",
          element: <EnterpriseCustomer/>
      }, 
      {
        path: "/new",
        element: <Post/>
      },
      {
        path: "/MapContainer",
        element: <MapContainer/>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
