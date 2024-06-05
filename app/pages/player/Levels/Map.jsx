import Blocks from './Blocks.jsx'
import Floor from './Floor.jsx'
import FloorText from './FloorText.jsx'
import useGame from '../stores/useGame.jsx'
import { RigidBody } from '@react-three/rapier'
import { FrontSide } from 'three'

export default function Map()
{
    return <>
        <FloorText
            index="1"
            instructions="Walk on the blue square"
        />
        <Floor size={ 10 } />
        {/* <Blocks
            goods={ [
                [ 0, 0.05, - 2 ],
            ] }
        /> */}
    </>
}