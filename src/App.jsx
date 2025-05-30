import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ResumeUpload from './components/ResumeUpload';
import JobListings from './components/JobListings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<ResumeUpload />} />
            <Route path="/jobs" element={<JobListings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
