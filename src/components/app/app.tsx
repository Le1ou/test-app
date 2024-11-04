import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Input from "../input/input";
import UsersList from "../usersList/usersList";
import UserSettings from '../userSettings/userSettings';
import { useState } from "react";

const App = () => {
    const [searchText, setSearchText] = useState("");

    return (
        <Router>
            <Routes>
                <Route path="/" 
                       element={
                        <>
                          <Input onSearch={setSearchText} />
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