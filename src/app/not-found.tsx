'use client';

import { useEffect } from 'react';
import Link from 'next/link';
export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div>
      <Link href="/">Back to Homepage</Link>
    </div>
  );
}
