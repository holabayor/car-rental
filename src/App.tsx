import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AdminDashboard } from './components/AdminDashboard'
import { AuthWrapper } from './components/AuthWrapper'
import { Home } from './components/Home'

function App() {
 
  return (
    <Router>
      <div className="container mx-auto py-8">
        
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/admin" element={
            <AuthWrapper>
              <AdminDashboard />
            </AuthWrapper>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App



