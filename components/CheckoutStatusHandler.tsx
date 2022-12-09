import { useRouter } from 'next/router';
import styles from '../styles/CheckoutStatusHandler.module.css';

export default function CheckoutStatusHandler() {
  const router = useRouter();
  const { success, canceled } = router.query;
  if (success && success === 'true') {
    return (
      <div className={styles.successContainer}>
        <div className={styles.text}>
          Payment successful! You will receive confirmation in your email
          address.
        </div>
      </div>
    );
  } else if (canceled && canceled === 'true') {
    return (
      <div className={styles.canceledContainer}>
        <div className={styles.text}>awwww u canceled ur order :(</div>
      </div>
    );
  } else {
    return <></>;
  }
}
