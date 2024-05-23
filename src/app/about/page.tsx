import { About } from '@/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
};

export default function Page() {
  return <About />;
}
