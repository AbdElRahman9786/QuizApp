import React, { useCallback, useEffect, useState } from "react";
import questions from "../questions.js";
import quizComplite from "../assets/quiz-complete.png";
import Progress from "./Progress.jsx";
const timer = 5000;
export const Quiz = () => {
  
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [isAnswerd,setIsAnswerd]=useState('')
  const currentQusetion =isAnswerd===''? userAnswers.length:userAnswers.length-1;
  let correctAnswer;
  useEffect(() => {
    if (currentQusetion <= 6) {
      correctAnswer = questions[currentQusetion].answers[0];
    }
  }, [currentQusetion]);


const handelUserAnswer= useCallback(function handelUserAnswer(ans) {
    setIsAnswerd('answered')
    setUserAnswers((prev) => {
      return [...prev, ans];
    });
    if (ans === correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
        if (ans === correctAnswer) {
            setIsAnswerd('correct')
            
        }else{
            setIsAnswerd('wrong')
        }
        setTimeout(() =>{
            setIsAnswerd('')
           
        },2000)
    },1000)
  },[currentQusetion])  
  const onTimeOut = useCallback(()=>handelUserAnswer(null),[])

  return (
    <section id="quiz">
      <div id="question">
        
        {currentQusetion <= 6 ? (
          <>
            <Progress key={currentQusetion} timer={10000} onTimeOut={onTimeOut}/>
            <h2>{questions[currentQusetion].text}</h2>
            <ul id="answers">
              {questions[currentQusetion].answers.map((ans, index) => {
                let cssClass=''
                const isSelected=userAnswers[userAnswers.length - 1]===ans;
                if(isAnswerd==='answered'&&isSelected){
                    cssClass='selected'
                }

                if((isAnswerd==='correct'||isAnswerd==='wrong')&&isSelected){
                    cssClass=isAnswerd
                }
            return    <li className="answer" key={index}>
                  <button disabled={isAnswerd} onClick={() => handelUserAnswer(ans)} className={cssClass}>{ans}</button>
                </li>
})}
            </ul>
          </>
        ) : (
          <div id="summary">
            <img src={quizComplite} alt="complite img" />
            <h2>quiz is over your score is {score} out of 7</h2>
          </div>
        )}
      </div>
    </section>
  );
};
