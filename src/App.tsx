import React, { useEffect, FC } from 'react';
require('@solana/wallet-adapter-react-ui/styles.css');

import './App.css';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Wallet } from '@project-serum/anchor';
import { PublicKey, Keypair } from '@solana/web3.js';
import BN from 'bn.js';
import { TokenSwap } from '@aldrin_exchange/sdk';


import { Context } from './components/WalletConnection/WalletConnection';
import {NavAppBar} from './components/Navbar/Navbar';

export const App: FC = () => {

    // Getting Error : Wallet.local not able to access.
    const wallet = Wallet.local() // Or any other solana wallet

    async function trade() {
        // return;
        const tokenSwap = await TokenSwap.initialize()
        console.log('tokenSwap',tokenSwap);

        const rin = new PublicKey('E5ndSkaB17Dm7CsD22dvcjfrYSDLCxFcMd6z8ddCk5wp')
        const wsol = new PublicKey('So11111111111111111111111111111111111111112')

        const rinPrice = await tokenSwap.getPrice({ mintFrom: rin, mintTo: wsol })
        const solRinPrice = await tokenSwap.getPrice({ mintFrom: wsol, mintTo: rin })

        console.log(`RIN/SOL price: ${rinPrice}`, `SOL/RIN price: ${solRinPrice}` )

        const transactionId = await tokenSwap.swap({
            wallet: Wallet,
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
                </div>
    
            </Context>
            <div className="base-app-text">
                <div className="card-wrapper">
                    <div className="card-fields">
                        <input type="number" className="input-text" name="sol" placeholder="Enter Sol" />
                        <input type="number" className="input-text" name="rin" placeholder="Enter Rin" />
                    </div>
                    <button type="button" className="swap-btn" onClick={() => trade()}>Swap</button>
                </div>
                
            </div>
        </div>
    );
};

