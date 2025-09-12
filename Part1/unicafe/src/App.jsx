import { useState } from 'react'
const Header =(props) => {
  return(
    <h1>
      {props.text}
    </h1>
  )
}
const Button =(props) => {
    const {onClick, text} = props
    return(
    <button onClick={props.onClick}>
    {props.text}
    </button>
    )
}
const StatisticLine = ({text, value}) => {
  if (text === "positive") {
    return (<tr><td>{text} {value}%</td></tr>)
  }
  return (<tr><td>{text} {value}</td></tr>)
}
const Statistics = (props) => {
  const all=props.good+props.neutral+props.bad
  const average= (props.good - props.bad)/all
  const positive= 100*props.good/all

  if (all===0) {
    return(
      <div>
        No feedback given
      </div>
    )
  }

  return(
    <table>
      <tbody>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value ={all} />
      <StatisticLine text="positive" value ={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback"/>
      <Button onClick={() => setGood(good+1)} text="good" />
      <Button onClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button onClick={() => setBad(bad+1)} text="bad" />
      <Header text="Statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App