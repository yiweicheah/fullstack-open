import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <div>
      <h2>statistics</h2>
      {all === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} />
          </tbody>
        </table>
      )}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let all = good + bad + neutral;
  let average = (good - bad) / all;
  let positive = ((good + neutral - bad) / all) * 100 + "%";

  const handleClick = (value, set) => {
    set(value + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={() => handleClick(good, setGood)} text="good" />
        <Button
          handleClick={() => handleClick(neutral, setNeutral)}
          text="neutral"
        />
        <Button handleClick={() => handleClick(bad, setBad)} text="bad" />
      </div>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
