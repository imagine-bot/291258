import React, { useState } from 'react';

type User = {
  name: string;
  email: string;
  phone: string;
};

type UserListProps = {
  users: User[];
};

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [userList, setUserList] = useState(users);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '' });

  const addUser = (user: User) => {
    setUserList([...userList, user]);
  };

  const deleteUser = (email: string) => {
    setUserList(userList.filter(user => user.email !== email));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser(newUser);
    setNewUser({ name: '', email: '', phone: '' });
  };

  return (
    <div className="w-full max-w-md mx-auto overflow-auto">
      <table className="w-full text-md bg-white shadow-md rounded mb-4">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3 px-5">Name</th>
            <th className="text-left p-3 px-5">Email</th>
            <th className="text-left p-3 px-5">Phone</th>
            <th className="text-left p-3 px-5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <tr className="border-b hover:bg-orange-100" key={index}>
              <td className="p-3 px-5">{user.name}</td>
              <td className="p-3 px-5">{user.email}</td>
              <td className="p-3 px-5">{user.phone}</td>
              <td className="p-3 px-5">
                <button onClick={() => deleteUser(user.email)}>
                  <img src="/delete-icon.png" alt="Delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="tel"
          name="phone"
          value={newUser.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          required
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default UserList;