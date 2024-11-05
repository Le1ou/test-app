import './users.css';

export type User = {
  id: string;
  name: string;
  status: 'Active' | 'Inactive';
  role: 'Admin' | 'User' | 'Guest';
};

const Users: React.FC<User> = ({ name, status, role }) => {
  return (
    <li>
      <div className="user">{name}</div>
      <div>{status}</div>
      <div>{role}</div>
    </li>
  );
};

export default Users;
