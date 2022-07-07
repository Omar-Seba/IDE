import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const StopConfettis = () => {
    const { width, height } = useWindowSize()

    return (
        <Confetti
            width={width}
            height={height}
            numberOfPieces={0}
            run={false}
        />
    )
}

export default StopConfettis;