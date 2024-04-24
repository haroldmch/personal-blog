import { SiDungeonsanddragons } from 'react-icons/si';

import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.test}>
      Testing - {process.env.NEXT_TEST} <SiDungeonsanddragons />
    </main>
  );
}
