import React from "react";
import { Web3Provider } from "@ethersproject/providers";

type Web3Type = {
	account: string;
	setAccount: React.Dispatch<React.SetStateAction<string>>;
	provider: Web3Provider | undefined;
	setProvider: React.Dispatch<React.SetStateAction<Web3Provider | undefined>>;
};

const initial: Web3Type = {
	account: "",
	setAccount: () => {},
	provider: undefined,
	setProvider: () => {},
};

export const Web3Context = React.createContext(initial);
