import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import './App.scss';
import ChatPage from './pages/chat/ChatPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatPage />} />
    </Routes>
  );
}

export default App;
