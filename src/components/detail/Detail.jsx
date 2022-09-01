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
        <Contents>
        <p>{title}</p>
        <p>{writer}</p>
        <p>{body}</p>

        <Link to={`/edit/${id}`} element={<Edit />} key={id}>
          <ButtonStyle> 수정하기</ButtonStyle>
        </Link>
        <ButtonStyle
          onClick={() => {
            navigate(`/`);
          }}
        >
          이전으로
        </ButtonStyle>
        </Contents>
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
  margin-top: 5px;
  background-color: #ce81a5;
  color: white;
  border: black;
  border-radius: 10px;
  height: 40px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: rgb(243, 239, 219);
  padding: 20px;
  height:280px
  margin-top: 10px;
`;