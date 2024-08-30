import { Home } from '@/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  description: 'Bosphorus Bakery Home Page',
};

export default function App() {
  return (
    <main>
      <div>
        <Home />
      </div>
    </main>
  );
}
