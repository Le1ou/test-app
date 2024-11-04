import { User } from "../components/users/users";
export type UserUpdate = Omit<User, 'id'>;

export class UserApi {
  static async getUsers(): Promise<User[]> {
      const response = await fetch("http://localhost:5000/api/users");
      if (!response.ok) {
          throw new Error("Failed to fetch users");
      }
      return await response.json() as User[];
  }

  static async getUser(id: string): Promise<User> {
    const response = await fetch(`http://localhost:5000/api/users/${id}`);
    if (!response.ok) {
        throw new Error(`User with ID ${id} not found`);
    }
    return await response.json() as User;
}

  static async updateUser(id: string, updatedData: UserUpdate) :Promise<User>{
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
          throw new Error("Failed to update user");
      }
      return await response.json() as User;
  }
}