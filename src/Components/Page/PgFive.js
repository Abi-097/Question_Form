import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import Swal from "sweetalert2/dist/sweetalert2.js";

// (This is the code for 60mins for all 20 questions)

function PgFive() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [solution, setSolution] = useState("");
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds  ***
  const [questionCount, setQuestionCount] = useState(1);
  const [score, setScore] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
    timeLefter();
  }, [questionCount]);

  const getData = () => {
    axios({
      method: "get",
      url: "https://marcconrad.com/uob/smile/api.php",
    })
      .then(function (response) {
        setData(response.data);
        setSolution(response.data.solution);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function handleSubmit(event) {
    event.preventDefault();
    const result = changeAnswer();
    if (result === "correct") {
      setScore(score + 1);
    }
    if (questionCount === 20) {
      if (score >= 15) {
        Swal.fire({
          icon: "success",
          title: "Hey...",
          text:
            "You passed with a score of " +
            score +
            "/20." +
            "Congratulation, You are eligible for the SUPER CLASS!",
        });
        navigate("/page4");
      } else {
        Swal.fire({
          icon: "error",
          title: "Opps...",
          text:
            "You failed with a score of " +
            score +
            "/20." +
            "Sorry Dear, You are not eligible for the SUPER CLASS! Try Later!",
        });
        navigate("/page4");
      }
    } else {
      setQuestionCount(questionCount + 1);
    }
    setInputValue("");
  }

  function changeAnswer() {
    const userAnswerInt = parseInt(inputValue);
    const APIsolution = parseInt(solution);
    if (userAnswerInt === APIsolution) {
      return "correct";
    } else {
      return "wrong";
    }
  }

  const nextPage = setTimeout(() => {
    //timer
    if (timeLeft === 0) {
      navigate.navigate("/page4"); // navigate to the next page
    } else {
      setTimeLeft(timeLeft - 1);
    }
    return () => clearTimeout(nextPage); //
  }, 1000);

  const timeLefter = () => {
    if (timeLeft === 120) {
      alert("2 minutes left!");
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return (
    <div className="Main">
      <Card className="CardQuestion">
        <h1>Questions</h1>
        <div>
          <p>Question No: {questionCount}/20</p>
          <p>
            Time left: {minutes}m {seconds}s
          </p>
          <img src={data.question} alt={`Question ${questionCount}`} />
          <h3>{data.solution}</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Enter your answer: &nbsp;
            <div class="ui error input">
              <input
                placeholder="Input Value"
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                required
              />
            </div>
          </label>
          <br />
          <br />
          <Button color="grey" type="submit">
            Submit/Next
          </Button>
        </form>
        <div>{/* <p>Score: {score}</p> */}</div>
      </Card>
    </div>
  );
}

export default PgFive;
