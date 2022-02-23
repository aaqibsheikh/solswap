import React, { useEffect, FC } from 'react';
require('@solana/wallet-adapter-react-ui/styles.css');

import './App.css';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
// import { Wallet } from '@project-serum/anchor';
import { PublicKey, Keypair } from '@solana/web3.js';
import BN from 'bn.js';
import { TokenSwap } from '@aldrin_exchange/sdk';


import { Context } from './components/WalletConnection/WalletConnection';
import {NavAppBar} from './components/Navbar/Navbar';

export const App: FC = () => {

        // const wallet = Wallet.local() // Or any other solana wallet
// let providerUrl = 'https://www.sollet.io';
// let wallet = new Wallet(providerUrl);
        // console.log('trade',wallet);
    // const { publicKey } = useWallet();

    async function trade() {
        // return;
        const tokenSwap = await TokenSwap.initialize()
        console.log('tokenSwap',tokenSwap);

        const rin = new PublicKey('E5ndSkaB17Dm7CsD22dvcjfrYSDLCxFcMd6z8ddCk5wp')
        const usdc = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')

        const rinPrice = await tokenSwap.getPrice({ mintFrom: rin, mintTo: usdc })
        const usdRinPrice = await tokenSwap.getPrice({ mintFrom: usdc, mintTo: rin })

        console.log(`RIN/USDC price: ${rinPrice}`, `USDC/RIN price: ${usdRinPrice}` )

        const transactionId = await tokenSwap.swap({
            wallet: Keypair,
            // A least 1 of parameters minIncomeAmount/outcomeAmount is required
            minIncomeAmount: new BN(1_000_000_000), // 1 RIN
            // outcomeAmount: new BN(5_000_000) // 5 USDC
            mintFrom: usdc,
            mintTo: rin,
        })
        console.log('transactionId',transactionId);
    } 
    // trade()


    return (
        <div>
            <Context>
                <div className='navbar-position'>
                    <NavAppBar  />
                <button type="button" onClick={() => trade()}>Swap</button>
                </div>
    
            </Context>
            <div className="base-app-text">
                <h1>Swap Sol-Rin </h1>
            </div>
        </div>
    );
};

