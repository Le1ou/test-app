import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserApi } from "../../service/api";
import Users, { User } from "../users/users";

interface UsersListProps {
    searchText: string; // Добавляем свойство для текста поиска
}

const UsersList: React.FC<UsersListProps> = ({ searchText }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await UserApi.getUsers();
                setUsers(data);
                setFilteredUsers(data); // Изначально показываем всех пользователей
            } catch (error) {
                console.error("Fetch users error:", error);
            }
        };

        fetchUsers();
    }, []);

    // Фильтруем пользователей по тексту поиска
    useEffect(() => {
        if (searchText) {
            const filtered = users.filter(user =>
                user.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users); // Если нет текста поиска, показываем всех
        }
    }, [searchText, users]);

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 308px)" }}>
            <span style={{ fontWeight: "bold" }}>Name</span>
            <span style={{ fontWeight: "bold" }}>Status</span>
            <span style={{ fontWeight: "bold" }}>Role</span>
            <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
                {filteredUsers.map((user) => (
                    <Link key={user.id} to={`/user/${user.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <Users id={user.id} name={user.name} status={user.status} role={user.role} />
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;