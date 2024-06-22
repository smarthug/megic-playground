import { create } from "zustand";

export const useMegicStore = create((set) => ({
    //   sum: 2,
    //   setSum: (sum) => set({ sum }),
    //   isOdd: false,
    //   setIsOdd: (isOdd) => set({ isOdd }),
    //   isYourGuessOdd: false,
    //   setIsYourGuessOdd: (isYourGuessOdd) => set({ isYourGuessOdd }),
    //   betAmount: 100,
    //   setBetAmount: (betAmount) => set({ betAmount }),

    //   firstDice: 1,
    //   setFirstDice: (firstDice) => set({ firstDice }),
    //   isFirstDiceRolling: false,
    //   setIsFirstDiceRolling: (isFirstDiceRolling) => set({ isFirstDiceRolling }),
    //   secondDice: 1,
    //   setSecondDice: (secondDice) => set({ secondDice }),
    //   isSecondDiceRolling: false,
    //   setIsSecondDiceRolling: (isSecondDiceRolling) => set({ isSecondDiceRolling }),
    //   //   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    //   //   removeAllBears: () => set({ bears: 0 }),
    //   diceArray: [],
    //   setDiceArray: (diceArray) => set({ diceArray }),

    megicPoints: 1000,
    setMegicPoints: (megicPoints) => set({ megicPoints }),
    increaseMegicPoints: () => set((state) => ({ megicPoints: Number(state.megicPoints) + 10 })),
    // decreaseMegicPoints: (megicPoints) => set({ megicPoints: megicPoints - 1 }),

}));
