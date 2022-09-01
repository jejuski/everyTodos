import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import styled from "styled-components";
import { __editTodoThunk } from "../../redux/modules/todoSlice";

function Edit() {
  const { todos } = useSelector((state) => state.todos);
  const { id } = useParams();
  const { title, body } = todos.filter((todo) => todo.id == id)[0];
  const [editTodo, setEditTodo] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setEditTodo(body);
  }, []);

  const saveButtonHandler = () => {
    if (editTodo != "") {
      dispatch(
        __editTodoThunk({
          id,
          editTodo,
        })
      );
    } else {
      alert("수정할 내용을 입력해주세요!!!!");
    }
    navigate(`/${id}`);
  };

  return (
    <div className="editform">
      <TitleAmmend>{title}</TitleAmmend>
      <Textarea
        name="body"
        rows="10"
        maxLength={100}
        value={editTodo}
        onChange={(event) => {
          setEditTodo(event.target.value);
        }}
      />
      <p />
      <ButtonDiv>
      <button className="ammendButton" onClick={saveButtonHandler}>수정하기</button>
      <button
        className="backBtn"
        onClick={() => {
          navigate(`/${id}`);
        }}
      >
        이전으로
      </button>
      </ButtonDiv>
    </div>
  );
}

export default Edit;

const TitleAmmend =styled.p`
width: 120px;
height: 30px;
background-color: white;
text-align: center;
vertical-align: middle;
border-radius: 50px;

`;

const Textarea = styled.textarea`
  border-radius: 50px;
  text-align:center;
  justify-content: center;
  width: 500px;
  border: none;
`;

const ButtonDiv = styled.button`
border:0px;
width:500px;
flex-direction:row;
padding:0px;
background-color: rgb(243, 239, 219);
`;
