import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserApi } from '../../service/api';
import Users, { User } from '../users/users';
import OnSpinner from '../spinner/spinner';
import './userList.css';

interface UsersListProps {
  searchText: string;
}

const UsersList: React.FC<UsersListProps> = ({ searchText }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await UserApi.getUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Fetch users error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchText) {
      const filtered = users.filter((user) => user.name.toLowerCase().includes(searchText.toLowerCase()));
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchText, users]);

  if (loading) {
    return <OnSpinner />;
  }

  return (
    <div className="container">
      <span className="header">Name</span>
      <span className="header">Status</span>
      <span className="header">Role</span>
      <ul className="user-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Link key={user.id} to={`/user/${user.id}`} className="user-link">
              <Users id={user.id} name={user.name} status={user.status} role={user.role} />
            </Link>
          ))
        ) : (
          <li className="no-user-message">Пользователь не найден</li>
        )}
      </ul>
    </div>
  );
};

export default UsersList;
