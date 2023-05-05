import React, { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  Flex,
  CardBody,
  CardFooter,
  Heading,
  Divider,
  Button,
  Center,
  Spacer,
  Icon,
  Spinner
} from "@chakra-ui/react";
// imported icons from react-icon
import { AAbi } from "../../artifacts/tokenAbis/tokens";
import { BsArrowDownShort } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";
import { FaExchangeAlt } from "react-icons/fa";
import { HiOutlineRefresh } from "react-icons/hi";
// chakra ui icons
import {
  QuestionOutlineIcon,
  SettingsIcon,
  RepeatIcon,
  RepeatClockIcon,
  EmailIcon,
  InfoOutlineIcon,
  SearchIcon,
} from "@chakra-ui/icons";
// pop-up model of currencies
import InputComp from "./InputComp";
// redux
// import { useSelector, useDispatch } from "react-redux";
//
// Connect to MetaMask provider
const Web3 = require("web3");
const provider = window.ethereum;
const web3 = new Web3(provider);
const pancakeSwapContractAddress = "0x0FA8ba82332C5D42fF58f809e46b727C07357B10";
const pancakeSwapAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_factory",
        type: "address",
      },
      {
        internalType: "address",
        name: "_WETH",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "WETH",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountADesired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountBDesired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountAMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountBMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "addLiquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountTokenDesired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETHMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "addLiquidityETH",
    outputs: [
      {
        internalType: "uint256",
        name: "amountToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETH",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveOut",
        type: "uint256",
      },
    ],
    name: "getAmountIn",
    outputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveOut",
        type: "uint256",
      },
    ],
    name: "getAmountOut",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
    ],
    name: "getAmountsIn",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
    ],
    name: "getAmountsOut",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveB",
        type: "uint256",
      },
    ],
    name: "quote",
    outputs: [
      {
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountAMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountBMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "removeLiquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETHMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "removeLiquidityETH",
    outputs: [
      {
        internalType: "uint256",
        name: "amountToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETH",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETHMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "removeLiquidityETHSupportingFeeOnTransferTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "amountETH",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETHMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "approveMax",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "removeLiquidityETHWithPermit",
    outputs: [
      {
        internalType: "uint256",
        name: "amountToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETH",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETHMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "approveMax",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "amountETH",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountAMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountBMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "approveMax",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "removeLiquidityWithPermit",
    outputs: [
      {
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapETHForExactTokens",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapExactETHForTokens",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapExactTokensForETH",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapExactTokensForTokens",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountInMax",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapTokensForExactETH",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountInMax",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapTokensForExactTokens",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const pancakeSwapContract = new web3.eth.Contract(
  pancakeSwapAbi,
  pancakeSwapContractAddress
);

function Swap() {
  const [input, setinput] = useState("");
  const [value, setCurrentValue] = useState(0);
  const [tokenOne, setTokenOne] = useState({
        name: "MTK1",
        address: "0xd0B60b057fc29287E036122e8Fca4065c97eDEae",
        balance:'40000'
    },);
  const [tokenTwo, setTokenTwo] = useState( {
        name: "MTK2",
        address: "0x01635a5f7C2b8d28eA4fBcDEE1Bc667E415Bb035",
        balance:'85044'
    });
    const [loader , setLoader] = useState(null)

   const swapFunc = async () => {
     // Check if MetaMask is installed
     if (typeof window.ethereum !== "undefined") {
       console.log("MetaMask is installed!");
     }

     
     setLoader(true)
     if(!value){
        setLoader("error")
     }
     console.log(tokenOne.address, tokenTwo.address)
     provider
     .window.ethereum
       .request({ method: "eth_requestAccounts" })
       .then((accounts) => {
         const account = accounts[0]; // Set up swap parameters
         console.log("Account Address ", account);
         const fromToken = tokenOne.address; // BNB token address
         const toToken = tokenTwo.address; // BUSD token address
         const fromAmount = web3.utils.toWei(value, "ether"); // 1 BNB
         // const minToAmount = web3.utils.toWei("2", "ether"); // Minimum 100 BUSD to receive
         const amountOut = web3.utils.fromWei(fromAmount, "ether");
         const deadline = Math.floor(Date.now() / 1000) + 300; // Deadline in 5 minutes // Call swap function
const tokenAContract = new web3.eth.Contract(AAbi, '0xd0B60b057fc29287E036122e8Fca4065c97eDEae');
         tokenAContract.methods

          .approve("0x123F0f0d7bD9379cdC6E714891eD82Ca8bB61B63", '1000')

          .send({ from: '0x123F0f0d7bD9379cdC6E714891eD82Ca8bB61B63', gasLimit: 300000 })

          .then((item) => console.log("approved A"));


        const tokenBContract = new web3.eth.Contract(AAbi, '0x01635a5f7C2b8d28eA4fBcDEE1Bc667E415Bb035');


        tokenBContract.methods

          .approve('0x123F0f0d7bD9379cdC6E714891eD82Ca8bB61B63', '1000')

          .send({ from: '0x123F0f0d7bD9379cdC6E714891eD82Ca8bB61B63', gasLimit: 300000 }).then(()=>{
            pancakeSwapContract.methods
           .swapExactTokensForTokens(
             fromAmount,
             amountOut,
             //  minToAmount,
             [fromToken, toToken],
             '0x123F0f0d7bD9379cdC6E714891eD82Ca8bB61B63',
             deadline
           )
           .send({ from: '0x123F0f0d7bD9379cdC6E714891eD82Ca8bB61B63', gasLimit: 3000000 })
           .then((receipt) => {
            setLoader(false)
             console.log("Transaction receipt:", receipt);
           })
           .catch((error) => {
            setLoader("error")
             console.error("Error:", error);
           });
       })
       .catch((error) => {
         console.error("Error:", error);
       });
})


         
   };
  //
const getValue = async (value) => {
//   console.log("value ", value);
  if (!value || value === 0) {
    setinput(0);
    return;
  }

  provider
    .request({ method: "eth_requestAccounts" })
    .then((accounts) => {
    //   const account = accounts[0]; // Set up path of tokens and input amount

      const path = [
        "0xDfB727357dD519513b83B22639fFD8B9e6dFDc58",
        "0xB076E8a4A40f99b48d88c2F332fD7AD7d89e0796",
      ]; // BNB to BUSD token path
      const amountIn = web3.utils.toWei(value, "ether"); // Input amount of token A // Call getAmountsOut function

      pancakeSwapContract.methods
        .getAmountsOut(amountIn, path)
        .call()
        .then((amounts) => {
          const amountOut = web3.utils.fromWei(amounts[1], "ether"); // Output amount of token B
          console.log("Estimated output amount:", amountOut);
          setinput(amountOut);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
  // Take input from
  const handleinput = (e) => {
    let val = e.target.value
    setCurrentValue(val);
    getValue(val);
    if(val >0 ){
        setLoader(null)
    }
  };
//
  const setTokenFirst = (token) => {
    if (token.name === tokenTwo.name) {
      setTokenTwo(tokenOne);
    }
    setTokenOne(token);
  };
  //
  const setTokenSecond = (token) => {
    if (token.name === tokenOne.name) {
      setTokenOne(tokenTwo);
    }
    setTokenTwo(token);
  };
  // swap arrow handler.
  const swapToken = () => {
    setTokenOne(tokenTwo);
    setTokenTwo(tokenOne);
  };
  return (
    <Box w="100%" bg="#e8faff" p={{ base: 2, md: 3 }}>
      {/* <Modelview isOpen={isOpen} onClose={onClose} /> */}

      <Center>
        <Card maxW="sm" w="100%" mt={8} borderRadius="30px">
          {/* card header contains heading, icons */}
          <CardHeader mb={-5}>
            <Heading as="h5" size="md" color="#280d5f">
              Swap
            </Heading>
            <Heading as="h8" size="xs" fontSize="11px" color="#7a74b1" mt={3}>
              Trade tokens in an instant
            </Heading>
            <Box align="right" color="#7a6eaa">
              <SettingsIcon ml={2} w={5} h={5} cursor="pointer" />
              <EmailIcon ml={2} w={5} h={5} cursor="pointer" />{" "}
              <RepeatClockIcon w={5} h={5} ml={2} cursor="pointer" />
              <RepeatIcon
                ml={2}
                w={5}
                h={5}
                color="#d7caec"
                cursor="pointer"
              />{" "}
            </Box>
          </CardHeader>
          <Divider color={"#d7caec"} mt={4} />
          <CardBody>
            {/* First input component */}
            <InputComp
              handleinput={handleinput}
              setToken={setTokenFirst}
              token={tokenOne}
            />
            <Box p={1}>
              <Center onClick={swapToken}>
                <Box
                  cursor={"pointer"}
                  bg="#eeeaf4"
                  p={2}
                  borderRadius={"50%"}
                  mt={2}
                >
                  <BsArrowDownShort color="#46cdda" size={"1.5em"} />
                </Box>
              </Center>
            </Box>
            {/* First input component */}
            <InputComp
              setTokenTwo={setTokenTwo}
              setToken={setTokenSecond}
              token={tokenTwo}
              input={input}
            />
            <Box align="right">
              <Heading
                as="h6"
                size="xs"
                color="white"
                bg="#1fc7d4"
                maxW={"100px"}
                minW={"90px"}
                borderRadius="16px"
                pt={1}
                pb={1}
                pl={2}
                pr={2}
                mt={2}
              >
                Low Risk
                <QuestionOutlineIcon ml={2} mb={1} />
              </Heading>
            </Box>
          </CardBody>
          {/* card footer contanis slippage, price, buttom, below button values */}
          <CardFooter>
            <Box Box w="100%" mt={-5}>
              {/* price */}
              <Flex fontSize="xs" gap={14}>
                <Heading as="h8" size="xs" fontSize="11px" color="#7645d9">
                  Price
                </Heading>
                <Heading
                  as="h8"
                  size="xs"
                  fontSize="14px"
                  textAlign="right"
                  mr={15}
                  fontWeight="600"
                  color="#000"
                >
                  1 CAKE{" "}
                  <Icon as={FaExchangeAlt} mr={2} ml={1} color="#8277af" />
                  0.01174 BNB
                  <Icon as={HiOutlineRefresh} ml={2} mr={2} />
                </Heading>
              </Flex>
              {/* slippage tolerance */}
              <Flex fontSize="xs" mt={3} mb={3}>
                <Heading
                  as="h8"
                  size="xs"
                  fontSize="11px"
                  color="#7645d9"
                  mt={3}
                  display={"inline-block"}
                >
                  Slippage Tolerance
                  <Heading
                    display={"inline-block"}
                    as="h8"
                    size="xs"
                    fontSize="11px"
                    color="#1fc7d4"
                    ml={2}
                    mb={-0.5}
                  >
                    <RiPencilFill />
                  </Heading>
                </Heading>
                <Spacer />
                <Heading
                  as="h8"
                  size="xs"
                  fontSize="15px"
                  color={input ? "#31d3c0" : "#8277af"}
                  mt={3}
                  textAlign="right"
                >
                  {input ? (
                    "1%"
                  ) : (
                    <Box>
                      {" "}
                      --
                      <Icon as={InfoOutlineIcon} color="#280d5f" ml={1} />
                    </Box>
                  )}
                </Heading>
              </Flex>
              {/* connect wallet button */}
              <Box mb={12}>
                <Button
                  onClick={swapFunc}
                  w={"100%"}
                  bg="#1fc7d4"
                  size="md"
                  borderRadius={"12px"}
                  color={"white"}
                  boxShadow="lg"
                >
                  <Heading as="h6" size="sm">
                    {/* Connect Wallet */}
                    {loader ===null && "Swap"}
                    {loader === 'error'?<Heading as="h6" size="sm">Try Again !!</Heading>:
                    loader===true&&<Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='lg'
                    />}
                       
                
                  </Heading>
                </Button>
              </Box>
              {/* card footer boxes */}
              <Box>
                <Flex mb={1}>
                  <Heading
                    as="h6"
                    color="#907bab"
                    size="xs"
                    fontSize={"13px"}
                    fontWeight="500 "
                  >
                    Maximum sold
                    <QuestionOutlineIcon ml={1} />
                  </Heading>
                  <Spacer />
                  <Heading
                    as="h6"
                    color="#28166b"
                    size="xs"
                    fontSize={"14px"}
                    fontWeight="500 "
                  >
                    0.1422 BNB
                  </Heading>
                </Flex>
                <Flex mb={1}>
                  <Heading
                    as="h6"
                    color="#907bab"
                    size="xs"
                    fontSize={"13px"}
                    fontWeight="500 "
                  >
                    Price Impact
                    <QuestionOutlineIcon ml={1} />
                  </Heading>
                  <Spacer />
                  <Heading
                    as="h6"
                    color="#31d3c0"
                    size="xs"
                    fontSize={"14px"}
                    fontWeight="500 "
                  >
                    {"<"}0.01 %{" "}
                  </Heading>
                </Flex>{" "}
                <Flex mb={1}>
                  <Heading
                    as="h6"
                    color="#907bab"
                    size="xs"
                    fontSize={"13px"}
                    fontWeight="500 "
                  >
                    Liquidity Provider Fee
                    <QuestionOutlineIcon ml={1} />
                  </Heading>
                  <Spacer />
                  <Heading
                    as="h6"
                    color="#28166b"
                    size="xs"
                    fontSize={"14px"}
                    fontWeight="500 "
                  >
                    0.0003521 BNB{" "}
                  </Heading>
                </Flex>
                <Flex mb={1}>
                  <Heading
                    as="h6"
                    color="#907bab"
                    size="xs"
                    fontSize={"13px"}
                    fontWeight="500 "
                  >
                    Route
                    <QuestionOutlineIcon ml={1} />
                  </Heading>
                  <Spacer />
                  <Heading
                    as="h6"
                    color="#28166b"
                    size="xs"
                    fontSize={"14px"}
                    fontWeight="500 "
                  >
                    BNB {">"} CAKE <SearchIcon mt={-1} cursor="pointer" />
                  </Heading>
                </Flex>
              </Box>
            </Box>
          </CardFooter>
        </Card>
      </Center>
    </Box>
  );
}

export default Swap;
