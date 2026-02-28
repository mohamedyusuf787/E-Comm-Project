import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import store from "./store"
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import Cartbtn from './components/cartbtn.jsx'

createRoot(document.getElementById('root')).render(

  <>
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Cartbtn />
        <App />
      </BrowserRouter>
    </Provider>  
    </>
)
