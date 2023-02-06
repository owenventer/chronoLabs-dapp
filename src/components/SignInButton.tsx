
import { verify } from '@noble/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { FC, useCallback } from 'react';
import { notify } from "../utils/notifications";

type Props = {
    setLogStatus: Function;
    logStatus:boolean;
  };

export const SignMessage: FC = (logStatus,setLogStatus) => {
    const { publicKey, signMessage } = useWallet();

    const onClick = useCallback(async () => {
        try {
            // `publicKey` will be null if the wallet isn't connected
            if (!publicKey) throw new Error('Wallet not connected!');
            // `signMessage` will be undefined if the wallet doesn't support it
            if (!signMessage) throw new Error('Wallet does not support message signing!');
            // Encode anything as bytes
            const message = new TextEncoder().encode('Hello, world!');
            // Sign the bytes using the wallet
            const signature = await signMessage(message);
            // Verify that the bytes were signed using the private key that matches the known public key
            if (!verify(signature, message, publicKey.toBytes())) throw new Error('Invalid signature!');
            notify({ type: 'success', message: 'Sign message successful!', txid: bs58.encode(signature) });
            setLogStatus(true);
        } catch (error: any) {
            notify({ type: 'error', message: `Sign Message failed!`, description: error?.message });
            console.log('error', `Sign Message failed! ${error?.message}`);
        }
    }, [publicKey, notify, signMessage]);

    return (
        <div className="flex flex-row justify-center">
            <div className="relative group items-center">
               
                <button
                    className="group btn bg-gradient-to-br from-[#14F195] to-[#14F195] text-black font-bold p-2 w-2/3 m-2 mx-10 rounded hover:scale-105"
                    onClick={onClick} disabled={!publicKey}
                >
                    <div className="hidden group-disabled:block  text-black">
                        Wallet not connected
                    </div>
                    <span className="block group-disabled:hidden " > 
                        Sign Message 
                    </span>
                </button>
            </div>
        </div>
    );
};
