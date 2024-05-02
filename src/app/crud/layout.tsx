import type { Metadata } from 'next';
import Link from 'next/link';

import styles from '../global.module.scss';

export const metadata: Metadata = {
  title: 'CRUD',
  description: 'CRUD example',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main lang="en">
      <h2>Server Actions + Mongoose</h2>
      <hr />
      <nav>
        <ul className={styles.nav}>
          <li>
            <Link href={`/crud/create`}>Create</Link>
          </li>
          <li>
            <Link href={`/crud/read`}>All Users</Link>
          </li>
        </ul>
      </nav>
      <hr />
      {children}
    </main>
  );
}
