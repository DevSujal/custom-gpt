import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createHashRouter, createRoutesFromChildren } from 'react-router-dom'
import {Form, Home, Login, Signup} from './pages'


const router = createHashRouter(
  createRoutesFromChildren(
    <Route path = "/" element = {<App />}>
      <Route path = "" element = {<Home />} />
      <Route path = "register" element = {<Signup/>} />
      <Route path = "login" element = {<Login />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <RouterProvider router={router}/>
  </>,
)
