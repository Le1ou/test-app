import "./users.css"

export type User = {
    id: string;
    name: string;
    status: 'active' | 'inactive';
    role: 'admin' | 'user' | 'guest';
}

const Users: React.FC<User> = ({ name, status, role }) => {

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