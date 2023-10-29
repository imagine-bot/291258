import React from 'react';

type User = {
  name: string;
  email: string;
  phone: string;
};

type UserListProps = {
  users: User[];
};

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="w-full max-w-md mx-auto overflow-auto">
      <table className="w-full text-md bg-white shadow-md rounded mb-4">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3 px-5">Name</th>
            <th className="text-left p-3 px-5">Email</th>
            <th className="text-left p-3 px-5">Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr className="border-b hover:bg-orange-100" key={index}>
              <td className="p-3 px-5">{user.name}</td>
              <td className="p-3 px-5">{user.email}</td>
              <td className="p-3 px-5">{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;