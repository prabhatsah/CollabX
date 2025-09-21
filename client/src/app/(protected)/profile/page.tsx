import { UserProfile } from './components/user-profile';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <UserProfile />
      </div>
    </main>
  );
}
