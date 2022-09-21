import { useEffect, useRef, useState } from "react";
import { useAccount, useProvider, usePrepareContractWrite, useContractWrite, useContract } from 'wagmi'
import { ethers } from "ethers";
import { default as Captcha } from '../utils/captcha';
import {config} from '../constants/Constants';
import {abi} from '../abi';
import  clu3  from '../clu3';
import styles from '../styles/Mint.module.css';

const Mint = () => {
    const { address, isConnecting, isDisconnected } = useAccount()
    const provider = useProvider()
    const [token, setToken] = useState('');
    const [res, setRes] = useState('');
    const [args, setArgs] = useState<any[]>([]);
    const [error, setError] = useState('');
    const { config: configSmartContract } = usePrepareContractWrite({
        addressOrName: '0x6d01537F34983cBac0a7293345e598161a3db451',
        contractInterface: new ethers.utils.Interface(abi),
        functionName: 'functionName',
        args: args
      })
    const { data, isLoading, isSuccess, write } = useContractWrite(configSmartContract)

    const contract = useContract({
        addressOrName: '0x6d01537F34983cBac0a7293345e598161a3db451',
        contractInterface: new ethers.utils.Interface(abi),
        signerOrProvider:provider
      })

    // console.log(contract.functions.getOwner().then((res) => console.log(res)))

    const captchaRef = useRef<any>(null);

    const onLoad = () => {
        // @ts-ignore: Optional feature
        // captchaRef.current.execute();
    };

    useEffect(() => {
        if (token)
            console.log(`hCaptcha Token: ${token}`);
    }, [token]);

    const onMint = async (e:any, token:any) => {
        // address is the user's wallet address, which is gotten from the useAccount hook
        e.preventDefault();
        let url = config.url.API_URL + '/verify';
        let response = await clu3(token, url, address)
        console.log(response)
        if (response?.success) {
            setRes(response?.data);
            setArgs([response?.data.timestamp, response?.data.signedMessage]);
            // console.log(write)
            // write?.(); // uncomment this line to mint the NFT
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
                onClick={async (e) => await onMint(e, token)} 
                className={token ? styles.mint_btn : styles.mint_btn_disabled}
                disabled={!token}
                >
                Mint
            </button>
            <div>
            {res && (
                <p style={{"width":'100px', 'margin':'0px'}}>{JSON.stringify(res)}</p>
            )}
            {/* {data && (
                <p style={{"width":'100px', 'margin':'0px'}}>This is the data:{JSON.stringify(data)}</p>
            )} */}
            </div>
            </div>
            
        </div>
    )
}

export default Mint;