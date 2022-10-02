// @ts-nocheck
import {Button, createStyles, Group, Image} from "@mantine/core";
import {WalletButton} from "../components/WalletButton";
import React, {useEffect, useState} from "react";
import useWeb3Modal from "../hooks/useWeb3Modal";
import {Web3Context} from "../hooks/useWeb3Context";
import {ethers} from "ethers";

const useStyles = createStyles((theme) => ({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		m: "auto"
	},
	image: {
		width: "100px",
		height: "100px",
	}
}));

export default () => {
	const {classes} = useStyles();
	const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
	const {account, setAccount, setProvider} = React.useContext(Web3Context);
	const [minted, setMinted] = useState(false)
	const [txCount, setTxCount] = useState(0)

	const onClick = async () => {
		if (provider) {
			const signer = provider.getSigner();
			const abi = ["function mint(address to) public"]
			const contractAddress = "0x70021D56727e589AaBd4C6FDE51951340E85448e";
			const contract = new ethers.Contract(contractAddress, abi, signer);
			await contract.mint(account);
			setMinted(true);
			setTxCount(txCount + 1);
		}
	}

	useEffect(() => {
		if (provider) {
			const f = async () => {
				const count = await provider.getTransactionCount(account)
				setTxCount(count)
			}
			f()
		}
	})

	return (
		<Group className={classes.container}>
			<WalletButton/>
			{
				account !== "" && !minted ? (
					<Button
						radius="xl"
						variant="light"
						size="xl"
						sx={{height: 30}}
						onClick={onClick}
					>
						Mint New NFT
					</Button>) : <></>
			}
			<Group>
				{
					[...Array(txCount)].map((_, i) => (
						<div className={classes.image}>
							<Image src="/tree.png" className={classes.image} key={i}/>
						</div>
					))
				}
			</Group>
		</Group>
	)
}
