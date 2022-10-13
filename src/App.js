import React, {useState, useEffect} from "react"
import {nanoid} from "nanoid"
import Die from "./Die"
import Game from "./Game"

function App() {

    const [diceState, setDiceState] = useState(() => allNewDice())
    const [tenzies, setTenzies] = useState(false)

    useEffect(() => {
        const allHeld = diceState.every(diceState => diceState.isHeld)
        const firstValue = diceState[0].value
        const allSame = diceState.every(diceState => diceState.value === firstValue)

        if(allHeld && allSame) {
            setTenzies(true)
            console.log("game won")
        }
    }, [diceState])

    function handleRoll(id) {
        setDiceState(prevState => prevState.map(dice => {
            return dice.isHeld === true? dice : generateNewDice() 
        }))
    }
    function handleClick() {
        setDiceState(() => {
            return allNewDice()
        })
        setTenzies(() => {
            return false
        })
    }

    function holdDice(id) {
        setDiceState(prevState => prevState.map(dice => {
            return dice.id === id? {...dice, isHeld: !dice.isHeld} : dice
        }))
    }




    const die = diceState.map(dice => {
        return(
            <Die 
                onClick={() => holdDice(dice.id)} 
                className= {dice.isHeld === true ? "held-dice": "unheld-dice"} 
                key={dice.id} 
                value={dice.value} 
            />
        )
    })

    function allNewDice(){

        var newDice = []
        for(let i=0; i < 10; i++){
            newDice.push(generateNewDice())
        }        
        return newDice
    }

    function generateNewDice() {
        return {
            value: Math.ceil(Math.random()* 6), 
            isHeld:false ,
            id: nanoid()
        }
    }


    return (
        <div className="container">
            <main className="main-container">
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same, click each die to freeze it at its current
                    value between rolls.
                </p>

                <div className="dice-container">
                  {tenzies? <Game /> : die}
                </div>
                <button className="roll-btn" onClick={tenzies? handleClick : handleRoll} >{tenzies? "New Game": "Roll"} </button>
            </main>
        </div>
    )
}


export default App