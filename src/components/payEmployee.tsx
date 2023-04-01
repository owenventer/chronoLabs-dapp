import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
    Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  TransactionMessage,
  TransactionSignature,
  VersionedTransaction,
} from "@solana/web3.js";
import { FC, useCallback } from "react";
import { notify } from "../utils/notifications";
import useUserSOLBalanceStore from "../stores/useUserSOLBalanceStore";
import { SignerWalletAdapterProps, WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { createAssociatedTokenAccountInstruction, createTransferInstruction, getAccount, getAssociatedTokenAddress } from "@solana/spl-token";

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

const configureAndSendCurrentTransaction = async (
    transaction: Transaction,
    connection: Connection,
    feePayer: PublicKey,
    signTransaction: SignerWalletAdapterProps['signTransaction']
  ) => {
    console.log("inside configure and send")
    const blockHash = await connection.getLatestBlockhash();
    transaction.feePayer = feePayer;
    transaction.recentBlockhash = blockHash.blockhash;
    const signed = await signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction({
      blockhash: blockHash.blockhash,
      lastValidBlockHeight: blockHash.lastValidBlockHeight,
      signature
    });
    return signature;
  };

export function PayEmployee(props) {

    const connection = new Connection(process.env.NEXT_PUBLIC_RPC);
    const { publicKey, sendTransaction,signTransaction } = useWallet();

  async function handlePayment(){
    console.log(props.nft.nftMint);
    //get receiver address
    const largestAccounts = await connection.getTokenLargestAccounts(
        new PublicKey(props.nft.nftMint)
      );
      const largestAccountInfo = await connection.getParsedAccountInfo(
        largestAccounts.value[0].address
      );
      console.log(
        "addy: " + largestAccountInfo.value.data["parsed"]["info"]["owner"]
      );
      const recipientAddress = new PublicKey(
        largestAccountInfo.value.data["parsed"]["info"]["owner"]
      );

    try {
      if (!publicKey) {
        throw new WalletNotConnectedError();
      }
      const mintToken = new PublicKey(
        'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
      ); // EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v is USDC token address on solana mainnet
      
        console.log("creating accounts")
      const transactionInstructions: TransactionInstruction[] = [];
      const associatedTokenFrom = await getAssociatedTokenAddress(
        mintToken,
        publicKey
      );
      if (!(await connection.getAccountInfo(associatedTokenFrom))) {
        console.log("inside if statement")
        transactionInstructions.push(
          createAssociatedTokenAccountInstruction(
            publicKey,
            associatedTokenFrom,
            recipientAddress,
            mintToken
          )
        );
      }
      const fromAccount = await getAccount(connection, associatedTokenFrom);
      const associatedTokenTo = await getAssociatedTokenAddress(
        mintToken,
        recipientAddress
      );
      console.log("just before if statement")
      if (!(await connection.getAccountInfo(associatedTokenTo))) {
        console.log("NO USDC")
        
      }
      console.log("pushing transfer instruction")
      transactionInstructions.push(
        createTransferInstruction(
          fromAccount.address, // source
          associatedTokenTo, // dest
          publicKey,
          1000000 // transfer 1 USDC, USDC on solana has 6 decimal
        )
      );
      const transaction = new Transaction().add(...transactionInstructions);
      const signature = await configureAndSendCurrentTransaction(
        transaction,
        connection,
        publicKey,
        signTransaction
      );
      // signature is transaction address, you can confirm your transaction on 'https://explorer.solana.com/?cluster=devnet'
    } catch (error) {}
  };
  

  return (
    <button
      className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-2/3  mx-5 rounded"
      onClick={() => handlePayment()}
    >
      Pay
    </button>
  );
};
