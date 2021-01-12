
import React, { useState } from 'react';
import './Question.css';
import { DocumentNode, gql, useMutation } from "@apollo/client";
type ChangeQuestion = (index: number) => void;

type SetAnswer = (answer: string[]) => void;

type QuestionProps = {
  questionType: string;
  changeQuestion: ChangeQuestion;
  currentQuestionIndex: number;
  currentQuestion: string;
  setAnswer: SetAnswer;
  answers: string[];
  userId: number;
};

export const figureMutation = (questionType: string):DocumentNode => {
  let mutation:DocumentNode;
    if (questionType === "event") {
      mutation = gql`
        mutation createEvent($userId: ID!, $name: String!, $date: String!) {
          createEvent(input: { userId: $userId, name: $name, date: $date }){
            userId
          }
        }
      `;
    }
    if (questionType === "era") {
      mutation = gql`
        mutation createEra($userId :ID!, $name:String!, $startDate:String!, $endDate:String!, $color:String!){
        createEra(input :{
          userId: $userId,
          name: $name,
          startDate:$startDate,
          endDate:$endDate,
          color:$color,
        }){
          userId
          }
      }`
;
  }
  // @ts-ignore
  return mutation
}

export const Question = (props: QuestionProps) => {
  const [date, updateDate] = useState("");
  const [endDate, updateEndDate] = useState("");
  const [answer, saveAnswer] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateDate(event.target.value);
    saveAnswer(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    updateEndDate(event.target.value)
  }

  const [makeMutation, { data }] = useMutation(figureMutation(props.questionType));

  return (
    <>
      <p className='question'>{props.currentQuestion}</p>
      <input
        className='calendar-input'
        data-testid="date"
        type="date"
        onChange={handleChange}
        value={date}
      ></input>
      {props.questionType === "era" && (
        <input
          className='calendar-input'
          data-testid="date"
          type="date"
          onChange={handleEndDateChange}
          value={endDate}
        ></input>
      )}
      <div className='question-buttons'>
      <button
        className='skip-button'
        type="button"
        onClick={() => {
          props.changeQuestion(props.currentQuestionIndex + 1);
          props.setAnswer([...props.answers, ""]);
          updateDate("");
        }}
      >
        Skip
      </button>
      <button
        className='next-button'
        disabled={!answer ? true: false}
        type='button'
        onClick={() => {
          if (props.questionType === "event") {
            makeMutation({
              variables: {
                userId: props.userId,
                name: props.currentQuestion,
                date: date.split("-").reverse().join("-"),
              },
            });
          }
          if (props.questionType === "era") {
            makeMutation({
              variables: {
                userId: props.userId,
                name: props.currentQuestion,
                startDate: date.split("-").reverse().join("-"),
                endDate: endDate.split("-").reverse().join("-"),
                color: "purple",
              },
            });
            updateEndDate("");
          }
          props.changeQuestion(props.currentQuestionIndex + 1);
          props.setAnswer([...props.answers, answer]);
          saveAnswer('')
          updateDate('')
        }}>
        Next
      </button>
      </div>
    </>
  );
};
