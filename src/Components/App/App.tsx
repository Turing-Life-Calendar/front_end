
import React from "react";
import { FormContainer } from "../FormContainer/FormContainer";
import { Route } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import CalendarComponent from "../CalendarComponent/CalendarComponent";
import RequiredForm from "../RequiredForm/RequiredForm";
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import './App.css';


export const App = () => {
  return (
    <section className='bg'>
      <Route exact path="/">
        <HeaderComponent />
        <RequiredForm />
      </Route>

      <Route
        path="/login"
        render={() => {
          return <LoginPage />;
        }}
      ></Route>
      <Route
        path="/form"
        render={() => {
          return <FormContainer />;
        }}
      ></Route>
      <Route
        path="/calendar"
        render={() => {
          return <CalendarComponent />;
        }}
      ></Route>
    </section>
  );
};
