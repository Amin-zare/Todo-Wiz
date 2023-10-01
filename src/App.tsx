import 'bootstrap/dist/css/bootstrap.css'
import Header from './components/layouts/Header'
import { Toaster } from 'sonner'
import Home from './routes/Home'
import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import './App.css'

const About = lazy(() => import('./routes/About'))
const Contact = lazy(() => import('./routes/Contact'))
const TodoPage = lazy(() => import('./routes/todo/TodoPage'))
const NotFound = lazy(() => import('./routes/NotFound'))

function App() {
  return (
    <>
      <Toaster richColors position='top-right' />
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/about'
            element={
              <Suspense fallback={<h2>Loading</h2>}>
                <About />
              </Suspense>
            }
          />
          <Route
            path='/Contact'
            element={
              <Suspense fallback={<h2>Loading</h2>}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path='*'
            element={
              <Suspense fallback={<h2>Loading</h2>}>
                <NotFound />
              </Suspense>
            }
          />
          <Route
            path='/todo/:id' // ':id' acts as a placeholder for a dynamic value. It matches any value at this segment of the URL and makes it available as a param.
            element={
              <Suspense fallback={<h2>Loading</h2>}>
                <TodoPage />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </>
  )
}

export default App
