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
    <div>
      <div>
        <div>Name</div>
        <div>Email</div>
        <div>Phone</div>
        <div>Actions</div>
      </div>
      <div>
        {userList.map((user, index) => (
          <div key={index}>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{user.phone}</div>
            <div>
              <button onClick={() => deleteUser(user.email)}>
                <MinusCircledIcon />
              </button>
            </div>
          </div>
        ))}
        <div>
          <div>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              placeholder="Name"
              required
            />
            {error.name && <p className="text-red-500">{error.name}</p>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
            {error.email && <p className="text-red-500">{error.email}</p>}
          </div>
          <div>
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
          </div>
          <div>
            <button type="submit" onClick={handleSubmit}>
              <PlusCircledIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;