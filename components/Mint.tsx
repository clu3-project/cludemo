import { useEffect, useRef, useState } from "react";
import { useAccount } from 'wagmi'
import { default as Captcha } from '../utils/captcha';
import  clu3  from '../clu3';
import styles from '../styles/Mint.module.css';

const Mint = () => {
    const { address, isConnecting, isDisconnected } = useAccount()
    const [token, setToken] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [res, setRes] = useState('');
    const [error, setError] = useState('');
    
    const captchaRef = useRef<any>(null);

    const onLoad = () => {
        // @ts-ignore: Optional feature
        // captchaRef.current.execute();
    };

    useEffect(() => {
        if (token)
            console.log(`hCaptcha Token: ${token}`);
            setTimestamp(Date.now().toString());
    }, [token]);

    const useClu3 = async (e:any, token:any) => {
        // timestamp is generated on the client side each time a captcha is solved
        // address is the user's wallet address, which is gotten from the useAccount hook
        e.preventDefault();
        let url = "http://localhost:8080/verify";
        let response = await clu3(token, url, address, timestamp)
        console.log(response)
        if (response?.success) {
            setRes(response?.data);
        } else{
            setError(response.error)
        }
        
    }



    return (
        <div className={styles.mintContainer}>
            <div>
            <form id="captcha_form">
                {error && ("Error: " + error)}
                <Captcha
                    sitekey="e241fd32-39e6-44c4-91b2-a1dd28d04b00"
                    onLoad={onLoad}
                    onVerify={setToken}
                    ref={captchaRef}
                    onExpire={() => setToken('')}
                />
            </form>
            <button 
                form="captcha_form" 
                value="Submit" 
                onClick={async (e) => await useClu3(e, token)} 
                className={token ? styles.mint_btn : styles.mint_btn_disabled}
                disabled={!token}
                >
                Mint
            </button>
            <div>
            {res && (
                <p style={{"width":'100px', 'margin':'0px'}}>{JSON.stringify(res)}</p>
            )}
            </div>
            </div>
            
        </div>
    )
}

export default Mint;