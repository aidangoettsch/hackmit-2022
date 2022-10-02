// @ts-nocheck

import {Button} from "@mantine/core";
import React from "react";
import {Web3Context} from "../hooks/useWeb3Context";
import useWeb3Modal from "../hooks/useWeb3Modal";

export const WalletButton = () => {
	const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
	const {account, setAccount, setProvider} = React.useContext(Web3Context);
	const [rendered, setRendered] = React.useState("");

	React.useEffect(() => {
		async function fetchAccount() {
			try {
				if (!provider) {
					return;
				}
				setProvider(provider);

				// Load the user's accounts.
				const accounts = await provider.listAccounts();
				// setAccount("0x28C38a654937d88A23c57e25327Ae592E251E70F");
				setAccount(accounts[0]);

				setRendered(account.substring(0, 6) + "..." + account.substring(36));
			} catch (err) {
				setAccount("");
				setRendered("");
				console.log("mm error");
				console.error(err);
			}
		}

		fetchAccount();
	}, [account, provider, setAccount, setRendered, setProvider]);

	return (
		<Button
			radius="xl"
			variant="light"
			size="xl"
			sx={{height: 30}}
			onClick={() => {
				if (!provider) {
					loadWeb3Modal();
				} else {
					logoutOfWeb3Modal();
				}
			}}
		>
			{rendered === "" && "Connect Wallet"}
			{rendered !== "" && rendered}
		</Button>
	);
};
