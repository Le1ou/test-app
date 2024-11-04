import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const UserSettings = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({ name: "", status: "", role: "" });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${id}`);
                if (!response.ok) throw new Error(`User with ID ${id} not found`);
                const data = await response.json();
                setUser(data);
                setEditedUser({
                    name: data.name,
                    status: data.status,
                    role: data.role,
                });
            } catch (error) {
                console.error("Fetch user error:", error);
            }
        };

        fetchUser();
    }, [id]);

    const handleEdit = () => setIsEditing(true);

    const handleSave = async () => {
        try {
            console.log("Sending update for User ID:", id);
            const response = await fetch(`http://localhost:5000/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedUser),
            });

            if (!response.ok) throw new Error('Failed to update user');

            const updatedUser = await response.json();
            setUser(updatedUser);
            setIsEditing(false);
            navigate("/");
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        if (user) {
            setEditedUser({
                name: user.name,
                status: user.status,
                role: user.role,
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Settings</h2>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={editedUser.name}
                    onChange={handleChange}
                    readOnly={!isEditing}
                />
            </div>
            <div>
                <label>Status:</label>
                <select
                    name="status"
                    value={editedUser.status}
                    onChange={handleChange}
                    readOnly={!isEditing}
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            <div>
                <label>Role:</label>
                <select
                    name="role"
                    value={editedUser.role}
                    onChange={handleChange}
                    readOnly={!isEditing}
                >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="guest">Guest</option>
                </select>
            </div>
            {isEditing ? (
                <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={() => navigate(-1)}>Cancel</button>
                </>
            )}
        </div>
    );
};

export default UserSettings;