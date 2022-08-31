import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import Edit from "../edit/Edit";
import { __getTodosThunk } from "../../redux/modules/todoSlice";
import Comment from "../comment/Comments";
import styled from "styled-components";
import Layout from "../layout/Layout";
import Header from "../Header/Header";

function Detail() {
  const { todos } = useSelector((state) => state.todos);
  const { id } = useParams();
  const navigate = useNavigate();

  const { title, body, writer } = todos.filter((todo) => todo.id == id)[0];

  const dispatch = useDispatch();
  console.log(title, body, writer);

  useEffect(() => {
    dispatch(__getTodosThunk());
  }, []);
  return (
    <Layout>
      <Header />
      <MainContainer>
        <p>id: {id}</p>
        <p>{title}</p>
        <p>{writer}</p>
        <p>{body}</p>

        <Link to={`/edit/${id}`} element={<Edit />} key={id}>
          <ButtonStyle> 수정하기</ButtonStyle>
        </Link>
        <ButtonStyle
          className="backBtn"
          onClick={() => {
            navigate(`/`);
          }}
        >
          이전으로
        </ButtonStyle>
        <Comment />
      </MainContainer>
    </Layout>
  );
}

export default Detail;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: static;
`;

const ButtonStyle = styled.button`
  margin-top: 20px;
  background-color: #ce81a5;
  color: white;
  border: black;
  border-radius: 10px;
  height: 40px;
`;
