import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Input from '../input/input';
import UsersList from '../usersList/usersList';
import UserSettings from '../userSettings/userSettings';
import { useState, useMemo } from 'react';
import { debounce } from 'lodash';
import SearchResetter from '../searchResetter/searchResetter';

const App = () => {
  const [searchText, setSearchText] = useState<string>('');

  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        setSearchText(text);
      }, 1000),
    []
  );

  return (
    <Router>
      <SearchResetter setSearchText={setSearchText} />
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ padding: '30px 140px' }}>
              <Input onSearch={debouncedSearch} />
              <UsersList searchText={searchText} />
            </div>
          }
        />
        <Route path="/user/:id" element={<UserSettings />} />
      </Routes>
    </Router>
  );
};

export default App;
