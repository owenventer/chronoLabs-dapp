// Next, React
import { FC, useEffect, useState,useCallback } from 'react';
import Link from 'next/link';
import { SignMessage } from './SignMessage';
import { verify } from '@noble/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { notify } from "../utils/notifications";
import Image from 'next/image';


export function SignInPage(){

    //Signing to prove wallet ownership
    const { publicKey, signMessage } = useWallet();


    // const onClick = useCallback(async () => {
    //     try {
    //         // `publicKey` will be null if the wallet isn't connected
    //         if (!publicKey) throw new Error('Wallet not connected!');
    //         // `signMessage` will be undefined if the wallet doesn't support it
    //         if (!signMessage) throw new Error('Wallet does not support message signing!');
    //         // Encode anything as bytes
    //         const message = new TextEncoder().encode('Hello, world!');
    //         // Sign the bytes using the wallet
    //         const signature = await signMessage(message);
    //         // Verify that the bytes were signed using the private key that matches the known public key
    //         if (!verify(signature, message, publicKey.toBytes())) throw new Error('Invalid signature!');
    //         notify({ type: 'success', message: 'Sign message successful!', txid: bs58.encode(signature) });
    //         setLogStatus(true);

    //     } catch (error: any) {
    //         notify({ type: 'error', message: `Sign Message failed!`, description: error?.message });
    //         console.log('error', `Sign Message failed! ${error?.message}`);

    //     }
    // }, [publicKey, signMessage,setLogStatus]);

  return (

    <div className="md:hero mx-auto p-5 m-10">
      
      <div className="md:hero-content flex flex-col  items-center shadow-lg bg-black text-neutral-content bg-opacity-50 rounded mt-6">
        <Image src='/fullLogo.png' alt='chronoLabsMainLogo' width={250} height={250}/>
          
        
        <div className="grid sm:grid-cols-1 m-1">
            <p className="block m-2 text-2xl font-la text-gray-900 dark:text-white">Please connect your wallet to sign in.</p>
            <div className="flex flex-row justify-center">
            <div className="relative group items-center">
               
                {/* <button
                    className="group btn bg-gradient-to-br from-[#14F195] to-[#14F195] text-black font-bold p-2 w-2/3 m-2 mx-10 rounded hover:scale-105"
                    onClick={onClick} disabled={!publicKey}
                >
                    <div className="hidden group-disabled:block  text-black">
                        Wallet not connected
                    </div>
                    <span className="block group-disabled:hidden " > 
                        Sign Message 
                    </span>
                </button> */}
            </div>
        </div>
        </div>
        
       
      </div>
    </div>
  );
};
export default SignInPage;
