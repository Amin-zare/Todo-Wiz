import 'bootstrap/dist/css/bootstrap.css'
import Header from './components/layouts/Header'
import { Toaster } from 'sonner'
import Home from './routes/Home'
import { Route, Routes } from 'react-router-dom'
import About from './routes/About'
import Contact from './routes/Contact'
import NotFound from './routes/NotFound'

function App() {
  return (
    <>
      <Toaster richColors position='top-right' />
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App
