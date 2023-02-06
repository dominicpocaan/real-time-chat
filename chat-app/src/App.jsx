import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import './App.scss';
import { ChatProvider } from './contexts/ChatContext';
import ChatPage from './pages/chat/ChatPage';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ChatProvider>
            <ChatPage />
          </ChatProvider>
        }
      />
    </Routes>
  );
}

export default App;
