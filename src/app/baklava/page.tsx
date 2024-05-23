import { Baklava } from '@/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Baklava',
};

export default function Page() {
  return <Baklava />;
}
