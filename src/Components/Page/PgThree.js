
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card} from 'semantic-ui-react';
import Swal from 'sweetalert2/dist/sweetalert2.js'


function PgThree() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [solution, setSolution] = useState('');
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds  ***
  const [questionCount, setQuestionCount] = useState(1);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(2);




  const navigate = useNavigate();

  useEffect(() => {
    getData();
    timeLefter();
  }, [questionCount]);

  const getData = () => {
    axios({
      method: 'get',
      url: 'https://marcconrad.com/uob/smile/api.php',
    })
      .then(function (response) {
        setData(response.data);
        setSolution(response.data.solution);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prevRemainingTime => prevRemainingTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // this is the function of timer reducing goes next question
  useEffect(() => {
    if (remainingTime === 0) {
      handleNextQuestion();
      setQuestionCount(questionCount + 1);
      if (questionCount === 20) {
          navigate('/page4');
          if (score >= 15) {
            Swal.fire({
              icon: 'success',
              title: 'Hey...',
              text: 'You passed with a score of ' + score + '/20.' + 'Congratulation, You are eligible for the SUPER CLASS!',
            })
            navigate('/page4');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Opps...',
              text: 'You failed with a score of ' + score + '/20.' + 'Sorry Dear, You are not eligible for the SUPER CLASS! Try Later!',
            })
            navigate('/page4');
          }
      }
    }
  }, [remainingTime]);

  // -------------------------------------
  // set timer to 180 seconds
  function handleNextQuestion() {
    setCurrentQuestionIndex(prevCurrentQuestionIndex => prevCurrentQuestionIndex + 1);
    setRemainingTime(2);
  }
  
  function handleAnswerSubmit() {
    handleNextQuestion();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const result = changeAnswer();
    if (result === 'correct') {
      setScore(score + 1);
    }
    if (questionCount === 20) {
      if (score >= 15) {
        // alert(' ');
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Hey...',
        //   text: 'You passed with a score of ' + score + '/20.' + 'Congratulation, You are eligible for the SUPER CLASS!',
        // })
        // navigate('/page4');
      } else {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Opps...',
        //   text: 'You failed with a score of ' + score + '/20.' + 'Sorry Dear, You are not eligible for the SUPER CLASS! Try Later!',
        // })
        // navigate('/page4');
      }
    } else {
      setQuestionCount(questionCount + 1);
    }
    setInputValue('');
  }
  
  function changeAnswer() {
    const userAnswerInt = parseInt(inputValue);
    const APIsolution = parseInt(solution);
    if (userAnswerInt === APIsolution) {
      return 'correct';
    } else {
      return 'wrong';
    }
  }

const timeLefter = () => {
  if (timeLeft === 120) {
    alert('2 minutes left!');
  }
}
  return (
    <div className="Main">
    <Card className="CardQuestion">
    
   
      <h1>Questions</h1>
      <div>
      <p>Question No: {questionCount}/20</p>
        <img src={data.question} alt={`Question ${questionCount}`} />
        <h3>{data.solution}</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your answer: &nbsp;
          <div class="ui error input"><input placeholder="Input Value" type="text" value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          required/></div>
        </label>
        <div>
      <p>Remaining time: {remainingTime} seconds</p>
    </div>
        <br/><br/>
       <Button color='grey' type="text" onClick={handleAnswerSubmit} >Submit/Next</Button>  
      </form>
      <div>
      </div>
    </Card>
    </div>
  );
}

export default PgThree;