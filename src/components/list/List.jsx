import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { __getTodosThunk } from "../../redux/modules/todoSlice";
import Layout from "../layout/Layout";
import Todo from "../todo/Todo";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./style.css";

function List() {
  const { todos } = useSelector((state) => state.todos);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getTodosThunk());
  }, [dispatch]);
  return (
    <div>
      <Layout>
        <Header />
        <button
          className="add-btn"
          onClick={() => {
            navigate(`/form`);
          }}
        >
          추가하기
        </button>
        <div className="list-container">
          <div className="list-wrapper ">
            {todos.map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default List;
