import { createRoot } from 'react-dom/client' 
import App from './App.jsx'
import './App.css'
import {createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider} from 'react-router-dom'
import Writing from './components/Writing'
import Card from './components/Card'
import Home from './components/Home'
import Read from './components/Read'
import Header from './components/Header'
import Draw from './components/Drawer/Draw.jsx'
import { NoteProvider } from './components/Notes.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
    <Route index element={<Home/>}/>
    <Route path='write' element={<Writing/>}/>
    <Route path='read/:id' element={<Read/>}/>
    <Route path="draw" element={<Draw/>}/>
    <Route
        path="read" element={
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <img
              src="/error.jpg"
              alt="404 Not Found"
              style={{ maxWidth: "1200px", width: "1000px", height:"100vh", marginLeft:"80px"}}
            />
            <h2>404 - Page Not Found</h2>
          </div>
        }
      />
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <NoteProvider>
    <RouterProvider router={router} />
  </NoteProvider>
);