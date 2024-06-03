import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector((set) => {
    return {
        /**
         * Score
        */
        score: 1000,
        increment: () => set((state) => ({ score: state.score + 250 })),
        decrement: () => set((state) => ({ score: state.score - 100 })),

        /**
         * Controls
        */
        isControlAPushed: false,
        isControlBPushed: false,
    }
}))
