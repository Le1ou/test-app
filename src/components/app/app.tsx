import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Input from "../input/input";
import UsersList from "../usersList/usersList";
import UserSettings from '../userSettings/userSettings';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Input /> <UsersList /></>} />
        <Route path="/user/:id" element={<UserSettings />} />
      </Routes>
    </Router>
  );
};

export default App;