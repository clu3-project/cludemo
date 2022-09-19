import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import FadeIn from 'react-fade-in';
import styles from '../styles/Home.module.css';

const Header = () => {

  const { address, isConnected } = useAccount()

  return (
    <>
      <main className={styles.main}>
        <div className={styles.logo} >
          <img src="./logo.png" alt="Clu3 Logo" width={70} height={70} />
          <h1 className={styles.title}>clu3</h1>
        </div>
        <ConnectButton />
      </main>
      <FadeIn>
        {!isConnected && (
          <div>
            <h2 className={styles.description}>
              Say goodbye to undesired bots on your&nbsp; <br></br><mark className={styles.enfasis}> Smart Contracts</mark>
            </h2>
          </div>
        )
        }
      </FadeIn>
    </>
  );
}
export default Header;