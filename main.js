import { ethers } from 'ethers';
import dotenv from 'dotenv';
import fs from 'fs';
import chalk from 'chalk';

dotenv.config();

const clearScreen = () => {
    process.stdout.write('\x1Bc');
};

const printBanner = () => {
    console.log(chalk.cyan('=============================================='));
    console.log(chalk.cyan('            ONE-FINITY | AIRDROP ASC            '));
    console.log(chalk.cyan('=============================================='));
    console.log(chalk.cyan('Credit By        : Airdrop ASC               '));
    console.log(chalk.cyan('Telegram Channel : @airdropasc               '));
    console.log(chalk.cyan('Telegram Group   : @autosultan_group         '));
    console.log(chalk.cyan('==============================================\n'));
};

printBanner();

if (!process.env.PRIVATE_KEY_1 || !process.env.PRIVATE_KEY_2) {
    console.error(chalk.red('Error: PRIVATE_KEY_1 or PRIVATE_KEY_2 is not defined in the .env file'));
    process.exit(1);
}

const rpcURL = 'https://testnet-rpc.onefinity.network';

const provider = new ethers.providers.JsonRpcProvider(rpcURL);

const privateKey1 = process.env.PRIVATE_KEY_1;
const privateKey2 = process.env.PRIVATE_KEY_2;

const wallet1 = new ethers.Wallet(privateKey1, provider);
const wallet2 = new ethers.Wallet(privateKey2, provider);

const toAddress1 = process.env.TO_ADDRESS_1;
const toAddress2 = process.env.TO_ADDRESS_2;
const amount1Str = process.env.AMOUNT_1;
const amount2Str = process.env.AMOUNT_2;

if (!ethers.utils.isAddress(toAddress1) || !ethers.utils.isAddress(toAddress2)) {
    console.error(chalk.red('Error: Salah satu atau kedua alamat penerima tidak valid'));
    process.exit(1);
}

if (!amount1Str || !amount2Str) {
    console.error(chalk.red('Error: AMOUNT_1 atau AMOUNT_2 tidak didefinisikan dalam file .env'));
    process.exit(1);
}

const amount1 = ethers.utils.parseUnits(amount1Str, 18);
const amount2 = ethers.utils.parseUnits(amount2Str, 18);

let wallet1Count = 0;
let wallet2Count = 0;

async function sendONE(wallet, toAddress, amount, walletNumber) {
    try {
        console.log(chalk.blue(`Mengirim transaksi dari Wallet ${walletNumber}...`));
        
        const transaction = await wallet.sendTransaction({
            to: toAddress,
            value: amount,
        });

        console.log(chalk.blue(`Transaksi dari Wallet ${walletNumber} terkirim. Menunggu konfirmasi...`));

        const receipt = await transaction.wait();

        if (receipt && receipt.status === 1) {
            console.log(chalk.green(`Transaksi Wallet ${walletNumber} berhasil.`));
            // Tingkatkan penghitung transaksi setelah transaksi sukses
            if (walletNumber === 1) {
                wallet1Count++;  // Tambah jika transaksi wallet 1 berhasil
            } else if (walletNumber === 2) {
                wallet2Count++;  // Tambah jika transaksi wallet 2 berhasil
            }
        } else {
            console.log(chalk.red(`Transaksi Wallet ${walletNumber} gagal.`));
        }

        console.log(chalk.green(`Tx Hash : ${transaction.hash}`));
        console.log(`| Wallet ${walletNumber} | Send ${ethers.utils.formatUnits(amount, 18)} ONE -> ${toAddress} |\n`);

        fs.appendFileSync('Tx.txt', `Wallet ${walletNumber} - Transaction hash: ${transaction.hash}\n`, 'utf8');
    } catch (error) {
        if (error.transactionHash) {
            console.log(chalk.green(`Tx Hash : ${error.transactionHash}`));
            console.log(`| Wallet ${walletNumber} | Send ${ethers.utils.formatUnits(amount, 18)} ONE -> ${toAddress} |\n`);

            fs.appendFileSync('Tx.txt', `Wallet ${walletNumber} - Transaction hash: ${error.transactionHash}\n`, 'utf8');
        } else {
            console.error(`\nTerjadi kesalahan saat mengirim transaksi dari Wallet ${walletNumber}:`, error.message);
        }
    }
}

async function main() {
    while (true) {

        await sendONE(wallet1, toAddress1, amount1, 1);

        await new Promise((resolve) => setTimeout(resolve, 3000));

        await sendONE(wallet2, toAddress2, amount2, 2);

        await new Promise((resolve) => setTimeout(resolve, 3000));

        clearScreen();
        printBanner();

        await new Promise((resolve) => setTimeout(resolve, 3000));
    }
}

main();
