import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, ChangeEvent } from "react";
import { UserApi } from "../../service/api";
import { User } from "../users/users";
import { UserUpdate } from "../../service/api";

const UserSettings: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState<UserUpdate>({
        name: "",
        status: "inactive",
        role: "guest",
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (id) {
                    const data = await UserApi.getUser(id);
                    setUser(data);
                    setEditedUser({
                        name: data.name,
                        status: data.status,
                        role: data.role,
                    });
                }
            } catch (error) {
                console.error("Fetch user error:", error);
            }
        };

        fetchUser();
    }, [id]);

    const handleEdit = () => setIsEditing(true);

    const handleSave = async () => {
        try {
            if (id) {
                const updatedUser = await UserApi.updateUser(id, editedUser);
                setUser(updatedUser);
                setIsEditing(false);
                navigate("/");
            }
        } catch (error) {
            console.error("Error updating user:", error);
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

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                    style={{
                        backgroundColor: isEditing ? "white" : "lightgray",
                        cursor: isEditing ? "text" : "not-allowed"
                    }}
                />
            </div>
            <div>
                <label>Status:</label>
                <select
                    name="status"
                    value={editedUser.status}
                    onChange={handleChange}
                    disabled={!isEditing}
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
                    disabled={!isEditing}
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