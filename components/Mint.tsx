import { useEffect, useRef, useState } from "react";
import {
    useAccount,
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction
}
    from 'wagmi'
import { ethers } from "ethers";
import { default as Captcha } from '../utils/captcha';
import { config } from '../constants/Constants';
import { abi } from '../abi';
import clu3 from '../clu3';
import styles from '../styles/Mint.module.css';
import useDebounce from '../hooks/useDebounce';

const Mint = () => {
    const { address, isConnecting, isDisconnected } = useAccount()
    const [token, setToken] = useState('');
    const [res, setRes] = useState('');
    const [args, setArgs] = useState<any[]>([]);
    const [error, setError] = useState('');
    // const debouncedArgs = useDebounce(args);

    const { config: configSmartContract } = usePrepareContractWrite({
        addressOrName: '0x636e161711d3949e31c82fd8235dad01e88b9c69',
        contractInterface: new ethers.utils.Interface(abi),
        functionName: 'cluPrototype',
        args: [
            "0xea4404dc56b83881b46b184a1160ece80d295dd241254a1134c8a01f3c19f47653ba665a36720f0eb0c72b32b3d346250cb3af28e5d75c96d96255a638641dee1b",
        1663989265928
    ]
        // enabled: Boolean(debouncedArgs)
    })

    const { data, write } = useContractWrite(configSmartContract)

    // console.log(contract)

    const captchaRef = useRef<any>(null);

    const onLoad = () => {
        // @ts-ignore: Optional feature
        // captchaRef.current.execute();
    };

    useEffect(() => {

        async function getClu3() {
            let url = config.url.API_URL + '/verify';
            let response = await clu3(token, url, address)
            if (response?.success) {
                setRes(response?.data);
                // setArgs([response?.data.timestamp, response?.data.messageSignature])
            } else {
                setError(response.error)
            }
        }

        if (token)
            console.log(`hCaptcha Token: ${token}`);
            getClu3();
    
    }, [token]);

    const onMint = () => {
        // address is the user's wallet address, which is gotten from the useAccount hook
        console.log(configSmartContract)
        write?.()
    }

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })


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
                    onClick={() => onMint()}
                    className={token ? styles.mint_btn : styles.mint_btn_disabled}
                    disabled={!token}
                >
                    Mint
                </button>
                <div>
                    {/* {res && (
                        <p style={{ "width": '100px', 'margin': '0px' }}>{JSON.stringify(res)}</p>
                    )} */}
                    {isSuccess && (
                        <div>
                            Successfully minted your NFT!
                            <div>
                                <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default Mint;