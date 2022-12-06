import Image from "next/image";
import logo from '../public/logo.gif'
import styles from '../styles/Logo.module.css'

export default function Logo() {
  return (
    <div className={styles.container}>
      <Image src={logo} alt="alt text TODO" width={'100px'} height={'100px'} />
    </div>
  )
}
