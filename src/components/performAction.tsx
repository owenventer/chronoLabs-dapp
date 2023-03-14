import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  TransactionSignature,
} from "@solana/web3.js";
import { FC, useCallback } from "react";
import { notify } from "../utils/notifications";

interface props {
  message: string;
}

export const PerformAction: FC<props> = ({ message }) => {
  const connection = new Connection(process.env.NEXT_PUBLIC_RPC);
  const { publicKey, sendTransaction } = useWallet();
  const wallet = useWallet();
  //adminWallet
  const CLPrivateKey = JSON.parse(
    process.env.NEXT_PUBLIC_ChronoPK ?? ""
  ) as number[];
  const CLPubKey = Keypair.fromSecretKey(
    Uint8Array.from(CLPrivateKey)
  ).publicKey;
  const adminKeypair = Keypair.fromSecretKey(
    new Uint8Array(Uint8Array.from(CLPrivateKey))
  );

  const onClick = useCallback(async () => {
    if (!publicKey) {
      notify({ type: "error", message: `Wallet not connected!` });
      console.log("error", `Send Transaction: Wallet not connected!`);
      return;
    }
    //useMemo
    //  Create Solana Transaction
    let tx = new Transaction();
    //Add Memo Instruction
    await tx.add(
      new TransactionInstruction({
        keys: [
          { pubkey: adminKeypair.publicKey, isSigner: true, isWritable: false }
        ],
        data: Buffer.from(message, "utf-8"),
        programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
      })
    );
    //Send Transaction
    // tx.feePayer = wallet.publicKey;
    let result = await sendAndConfirmTransaction(connection, tx, [adminKeypair]);
    // result = await wallet.sendTransaction(tx, connection);
    // Log Tx URL
    console.log(
      "complete: ",
      `https://explorer.solana.com/tx/${result}?cluster=devnet`
    );
    return result;

    let signature: TransactionSignature = "";
    try {
      // Create instructions to send, in this case a simple transfer
      const instructions = [
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: Keypair.generate().publicKey,
          lamports: 1_000_000,
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
      const transation = new VersionedTransaction(messageLegacy);

      // Send transaction and await for signature
      signature = await sendTransaction(transation, connection);

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
  }, [publicKey, notify, connection, sendTransaction]);

  return (
    <div className="">
      <button
        className=" bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-3/4 m-2 mx-10 rounded"
        onClick={onClick}
        disabled={!publicKey}
      >
        <div className="hidden group-disabled:block">Wallet not connected</div>
        <span className="block group-disabled:hidden">{message}</span>
      </button>
    </div>
  );
};
