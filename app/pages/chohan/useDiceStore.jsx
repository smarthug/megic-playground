import { create } from "zustand";
import { useMegicStore } from "../../utils/useMegicStore";

export const useDiceStore = create((set) => ({
  //   sum: 2,
  //   setSum: (sum) => set({ sum }),
  //   isOdd: false,
  //   setIsOdd: (isOdd) => set({ isOdd }),
  isYourGuessOdd: false,
  setIsYourGuessOdd: (isYourGuessOdd) => set({ isYourGuessOdd }),
  betAmount: 0,
  // setBetAmount: (betAmount) => set({ betAmount }),
  setBetAmount: (betAmount) => {
    if (betAmount < 0) betAmount = 0;
    const megicPoints = useMegicStore.getState().megicPoints;
    if (betAmount > megicPoints) {
    } else {
      set((state) => {
        // console.log(megicPoints);
        return { betAmount };
      });
    }
  },

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
  diceArray: [],
  setDiceArray: (diceArray) => set({ diceArray }),
}));
