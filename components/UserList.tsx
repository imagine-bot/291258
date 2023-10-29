import React, { useState } from 'react';
import { PlusCircledIcon, MinusCircledIcon } from '@radix-ui/react-icons';
import { z } from 'zod';

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
  const [error, setError] = useState({ name: '', email: '', phone: '' });

  const addUser = (user: User) => {
    const userSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      phone: z.string().regex(/^\d{10}$/),
    });

    const result = userSchema.safeParse(user);

    if (result.success) {
      setUserList([...userList, user]);
      setError({ name: '', email: '', phone: '' });
    } else {
      setError({
        name: result.error.formErrors.fieldErrors.name ? result.error.formErrors.fieldErrors.name[0] : '',
        email: result.error.formErrors.fieldErrors.email ? result.error.formErrors.fieldErrors.email[0] : '',
        phone: result.error.formErrors.fieldErrors.phone ? result.error.formErrors.fieldErrors.phone[0] : '',
      });
    }
  };

  const deleteUser = (email: string) => {
    setUserList(userList.filter(user => user.email !== email));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'phone') {
      const formattedInput = e.target.value.replace(
        /^(\d{3})(\d{3})(\d{4})$/,
        '($1) $2-$3'
      );
      setNewUser({ ...newUser, [e.target.name]: formattedInput });
    } else {
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser(newUser);
    setNewUser({ name: '', email: '', phone: '' });
  };

  return (
    <div className="w-full max-w-full mx-auto overflow-auto">
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
            <tr className="border-b hover:bg-light-blue-100" key={index}>
              <td className="p-3 px-5">{user.name}</td>
              <td className="p-3 px-5">{user.email}</td>
              <td className="p-3 px-5">{user.phone}</td>
              <td className="p-3 px-5">
                <button onClick={() => deleteUser(user.email)}>
                  <MinusCircledIcon />
                </button>
              </td>
            </tr>
          ))}
          <tr className="border-b hover:bg-light-blue-100">
            <td className={`p-3 px-5 ${error.name && 'bg-red-200'}`}>
              <input
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
              />
              {error.name && <p className="text-red-500">{error.name}</p>}
            </td>
            <td className={`p-3 px-5 ${error.email && 'bg-red-200'}`}>
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
              {error.email && <p className="text-red-500">{error.email}</p>}
            </td>
            <td className={`p-3 px-5 ${error.phone && 'bg-red-200'}`}>
              <input
                type="tel"
                name="phone"
                value={newUser.phone}
                onChange={handleInputChange}
                placeholder="Phone (1234567890)"
                pattern="\d{10}"
                required
              />
              {error.phone && <p className="text-red-500">{error.phone}</p>}
            </td>
            <td className="p-3 px-5">
              <button type="submit" onClick={handleSubmit}>
                <PlusCircledIcon />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserList;