import "./users.css"

interface UserProps {
    id: string;
    name: string;
    status: 'active' | 'inective';
    role: 'admin' | 'user' | 'guest';
}

const Users: React.FC<UserProps> = ({ name, status, role }) => {

    return (
        <li className="container">
            <div className="user">
                {name}
            </div>
            <div>{status}</div>
            <div>{role}</div>
        </li>
    );
};

export default Users;