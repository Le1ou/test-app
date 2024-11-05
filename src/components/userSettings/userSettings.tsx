import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, ChangeEvent } from 'react';
import { UserApi } from '../../service/api';
import { User } from '../users/users';
import { UserUpdate } from '../../service/api';
import './userSettings.css';

const UserSettings: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserUpdate>({
    name: '',
    status: 'Inactive',
    role: 'Guest',
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
        console.error('Fetch user error:', error);
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
      }
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
    <div className="user-settings">
      <h2>User Settings</h2>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={editedUser.name}
        onChange={handleChange}
        readOnly={!isEditing}
        className={isEditing ? 'edit-mode' : ''}
      />
      <label>Status:</label>
      <div className="user-radios">
        <label>
          <input
            type="radio"
            name="status"
            value="Active"
            checked={editedUser.status === 'Active'}
            onChange={handleChange}
            disabled={!isEditing}
          />
          Active
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="Inactive"
            checked={editedUser.status === 'Inactive'}
            onChange={handleChange}
            disabled={!isEditing}
          />
          Inactive
        </label>
      </div>
      <label>Role:</label>
      <select name="role" value={editedUser.role} onChange={handleChange} disabled={!isEditing}>
        <option value="Admin">Admin</option>
        <option value="User">User</option>
        <option value="Guest">Guest</option>
      </select>
      <div className="buttons-container">
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
    </div>
  );
};

export default UserSettings;
