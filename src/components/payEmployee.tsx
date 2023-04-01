import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
    Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  TransactionSignature,
  VersionedTransaction,
} from "@solana/web3.js";
import { FC, useCallback } from "react";
import { notify } from "../utils/notifications";
import useUserSOLBalanceStore from "../stores/useUserSOLBalanceStore";

type nftType = {
  companyName: string;
  logo: string;
  numTasks: number;
  tasks: string[];
  employeeName: string;
  employeeType: string;
  pay: string;
  ssNum: string;
  state: string;
  country: string;
  startDate: string;
  employeeStatus: string;
  isCollection: boolean;
  businessType: string;
  einNumber: string;
  collectionID: string;
  nftMint: string;
};

export function PayEmployee(nft) {
  const connection = new Connection(process.env.NEXT_PUBLIC_RPC);
  const { publicKey, sendTransaction } = useWallet();

  async function makePayment() {
    console.log(nft.nftMint);
    //USDC : https://stackoverflow.com/questions/70224185/how-to-transfer-custom-spl-token-by-solana-web3-js-and-solana-sol-wallet-ad

    const largestAccounts = await connection.getTokenLargestAccounts(
      new PublicKey(""+nft.nftMint)
    );
    const largestAccountInfo = await connection.getParsedAccountInfo(
      largestAccounts.value[0].address
    );
    console.log(
      "addy: " + largestAccountInfo.value.data["parsed"]["info"]["owner"]
    );
    const toWallet = new PublicKey(
      largestAccountInfo.value.data["parsed"]["info"]["owner"]
    );

    if (!publicKey) {
      notify({ type: "error", message: `Wallet not connected!` });
      console.log("error", `Send Transaction: Wallet not connected!`);
      return;
    }

    let signature: TransactionSignature = "";
    try {
      // Create instructions to send, in this case a simple transfer
      const instructions = [
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: toWallet,
          lamports: parseInt(nft.pay) ,
        }),
      ];

      // Get the lates block hash to use on our transaction and confirmation
      let latestBlockhash = await connection.getLatestBlockhash();

      // Create a new TransactionMessage with version and compile it to legacy
      const messageLegacy = new TransactionMessage({
        payerKey: publicKey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions,
      }).compileToLegacyMessage();

      // Create a new VersionedTransacction which supports legacy and v0
      const transaction = new VersionedTransaction(messageLegacy);

      // Send transaction and await for signature
      signature = await sendTransaction(transaction, connection);

      // Send transaction and await for signature
      await connection.confirmTransaction(
        { signature, ...latestBlockhash },
        "confirmed"
      );

      console.log(signature);
      notify({
        type: "success",
        message: "Transaction successful!",
        txid: signature,
      });
    } catch (error: any) {
      notify({
        type: "error",
        message: `Transaction failed!`,
        description: error?.message,
        txid: signature,
      });
      console.log("error", `Transaction failed! ${error?.message}`, signature);
      return;
    }
  }

  return (
    <button
      className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-2/3  mx-5 rounded"
      onClick={() => makePayment()}
    >
      Pay
    </button>
  );
};
