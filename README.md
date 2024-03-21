# membrane-frontend-cc

## Prerequisites

node: v20.11.0
pnpm: 8.15.1

## Getting Started

pnpm install 

pnpm run dev

Open [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

.env file is needed

## Env file configuration 
VITE_QUIZ_CONTRACT_ADDRESS="0x437eF217203452317C3C955Cf282b1eE5F6aaF72" 

## Improvements

- Move from Goerli to Sepolia to try the entire flow
- Display trivia success component after submit event is successful 
- Handle unanswered values properly 
- .env file must not be part of the project.