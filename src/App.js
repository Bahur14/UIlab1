import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import About from './pages/About';
import TodoList from './pages/TodoList';

function App() {
  return (
    <Router>
      {/* Найвіддаленіший контейнер: примусово запобігаємо горизонтальному скролу */}
      <div className="min-h-screen bg-gray-100 overflow-x-hidden p-0">
        
        {/* Навігаційне меню: fix wrapping and padding for mobile */}
        <nav className="bg-blue-600 p-2 sm:p-4 text-white shadow-md w-full">
          {/* text-xs sm:text-base reduces font size on mobile, flex-wrap allows wrapping links */}
          <ul className="flex flex-wrap space-x-2 sm:space-x-6 justify-center items-center font-semibold text-xs sm:text-base">
            <li><Link to="/" className="hover:text-blue-200 py-1 block">Список справ</Link></li>
            <li><Link to="/login" className="hover:text-blue-200 py-1 block">Вхід</Link></li>
            <li><Link to="/register" className="hover:text-blue-200 py-1 block">Реєстрація</Link></li>
            <li><Link to="/profile" className="hover:text-blue-200 py-1 block">Профіль</Link></li>
            <li><Link to="/about" className="hover:text-blue-200 py-1 block">Про додаток</Link></li>
          </ul>
        </nav>

        {/* Роутинг Wrapper (Critical fix): ensure side buffer padding/margin */}
        <main className="w-full max-w-4xl mx-auto mt-4 sm:mt-8 px-2 sm:px-4 py-4">
          {/* rounded-lg shadow p-2 sm:p-4 reduces internal padding on mobile */}
          <div className="bg-white rounded-lg shadow p-2 sm:p-4">
            <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;