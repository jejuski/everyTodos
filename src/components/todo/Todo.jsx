import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __deleteTodoThunk } from "../../redux/modules/todoSlice";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Todo({ todo }) {
  const dispatch = useDispatch();

  return (
    <Card style={{ minHeight: "150px" }}>
      <div className="card-body">
        <button className="btn-close" style={{ marginLeft: "14em" }} onClick={() => dispatch(__deleteTodoThunk(todo.id))} />
        <Link to={`/${todo.id}`} key={todo.id} style={{ color: "black", textDecoration: "none" }}>
          <h4 className="card-title">{todo.title}</h4>
          <div className="card-text">{todo.writer}</div>
        </Link>
      </div>
    </Card>
  );
}

export default Todo;
