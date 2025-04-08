import { Contact } from '@/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
};

export default function Page() {
  return <Contact />;
}