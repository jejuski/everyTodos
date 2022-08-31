import axios from "axios";
import React, { useState } from "react";
import Layout from "../layout/Layout";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";

function Form() {
  const [inputs, setInputs] = useState({
    writer: "",
    title: "",
    body: "",
  });

  /*create users*/
  const createUsers = () => {
    return axios.post("http://localhost:3001/todos", {
      title: inputs.title,
      writer: inputs.writer,
      body: inputs.body,
    });
  };
  const handleOnSubmit = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  let navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }
  return (
    <>
      <Layout>
        <Header />
        <div onChange={handleOnSubmit} className="ml-4 flex flex-col w-2/12 form_container">
          <label className="form-label">닉네임</label>
          <input className="form-control form-control-lg" type="text" name="writer" />
          <label className="form-label">제목</label>
          <input className="form-control form-control-lg" type="text" name="title" />
          <label className="form-label">내용</label>
          <input className="form-control form-control-lg" type="text" name="body" />
          <button
            className="inputButton mb-2"
            onClick={() => {
              createUsers();
              handleClick();
            }}
          >
            저장
          </button>
        </div>
      </Layout>
    </>
  );
}
export default Form;
