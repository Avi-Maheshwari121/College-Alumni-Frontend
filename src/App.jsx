import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EventList from './pages/Events/EventList';
import JobList from './pages/Jobs/JobList';
import MentorshipList from './pages/Mentorship/MentorshipList';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import CreateJob from './pages/Jobs/CreateJob';
import CreateEvent from './pages/Events/CreateEvent';
import BecomeMentor from './pages/Mentorship/BecomeMentor';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/mentorship" element={<MentorshipList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs/create" element={<CreateJob />} />
            <Route path="/events/create" element={<CreateEvent />} />
<Route path="/mentorship/create" element={<BecomeMentor />} />
          </Routes>
        </main>
        
        {/* Simple Footer */}
        <footer className="bg-white border-t border-gray-200 py-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} AlumniConnect. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;