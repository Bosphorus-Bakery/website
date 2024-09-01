import { Locations } from '@/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Locations',
  description: '',
};

export default function Page() {
  return <Locations />;
}
