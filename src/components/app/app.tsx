import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Input from "../input/input";
import UsersList from "../usersList/usersList";
import UserSettings from '../userSettings/userSettings';
import { useState, useCallback } from "react";
import { debounce } from "lodash";

const App = () => {
    const [searchText, setSearchText] = useState("");

    const debouncedSearch = useCallback(
        debounce((text: string) => {
            setSearchText(text);
        }, 1000),
        []
    );

    return (
        <Router>
            <Routes>
                <Route path="/" 
                       element={
                        <>
                          <Input onSearch={debouncedSearch} />
                          <UsersList searchText={searchText} />
                        </>}
                />
                <Route path="/user/:id"
                       element={<UserSettings />} />
            </Routes>
        </Router>
    );
};

export default App;