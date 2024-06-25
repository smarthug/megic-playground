import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector((set) => {
    return {
        /**
         * Score
        */
        score: 0,
        increment: () => set((state) => ({ score: state.score + 1 })),
        // decrement: () => set((state) => ({ score: state.score - 100 })),

        /**
         * Controls
        */
        isControlAPushed: false,
        isControlBPushed: false,
    }
}))
