import { useEffect, useState } from "react";
import Users from "../users/users";

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("http://localhost:5000/api/users");
            const data = await response.json();
            setUsers(data);
        };

        fetchUsers();
    }, []);

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 308px)" }}>
            <span style={{ fontWeight: "bold" }}>Name</span>
            <span style={{ fontWeight: "bold" }}>Status</span>
            <span style={{ fontWeight: "bold" }}>Role</span>
            <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
                {users.map((user) => (
                    <Users key={user.id} id={user.id} name={user.name} status={user.status} role={user.role} />
                ))}
            </ul>
        </div>
    );
};

export default UsersList;