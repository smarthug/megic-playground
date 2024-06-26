import { create } from "zustand";

export const useDiceStore = create((set) => ({
  //   sum: 2,
  //   setSum: (sum) => set({ sum }),
//   isOdd: false,
//   setIsOdd: (isOdd) => set({ isOdd }),
  isYourGuessOdd: false,
  setIsYourGuessOdd: (isYourGuessOdd) => set({ isYourGuessOdd }),
  betAmount: 100,
  setBetAmount: (betAmount) => set({ betAmount }),

  firstDice: 1,
  setFirstDice: (firstDice) => set({ firstDice }),
  isFirstDiceRolling: false,
  setIsFirstDiceRolling: (isFirstDiceRolling) => set({ isFirstDiceRolling }),
  secondDice: 1,
  setSecondDice: (secondDice) => set({ secondDice }),
  isSecondDiceRolling: false,
  setIsSecondDiceRolling: (isSecondDiceRolling) => set({ isSecondDiceRolling }),
  //   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  //   removeAllBears: () => set({ bears: 0 }),
}));
