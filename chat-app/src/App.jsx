import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import './App.scss';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import LoginPage from './pages/auth/login/LoginPage';
import RegisterPage from './pages/auth/register/RegisterPage';
import ChatPage from './pages/chat/ChatPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<ProtectedRoute />}>
          <Route
            path=""
            element={
              <ChatProvider>
                <ChatPage />
              </ChatProvider>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
