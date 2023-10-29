import Image from 'next/image'
import UserList from '../components/UserList';

const users = [
  { name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
  { name: 'Jane Doe', email: 'jane.doe@example.com', phone: '098-765-4321' },
  // Add more users here
];

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <UserList users={users} />
    </main>
  )
}