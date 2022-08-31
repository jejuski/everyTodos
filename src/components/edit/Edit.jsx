import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
    <div>
      <p>{title}</p>
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
      <button onClick={saveButtonHandler}>수정하기</button>
      <button
        className="backBtn"
        onClick={() => {
          navigate(`/${id}`);
        }}
      >
        이전으로
      </button>
    </div>
  );
}

export default Edit;

const Textarea = styled.textarea`
  width: 500px;
  border: 1px solid #000000;
`;
