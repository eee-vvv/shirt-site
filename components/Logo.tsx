import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/logo.gif';
import styles from '../styles/Logo.module.css';

export default function Logo() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a>
          <Image
            src={logo}
            alt="alt text TODO"
            width={'100px'}
            height={'100px'}
          />
        </a>
      </Link>
    </div>
  );
}
