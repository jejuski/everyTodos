import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addComment } from "../../redux/modules/CommentSlice";

function CommentForm() {
  const paramsId = useParams().id;
  const dispatch = useDispatch();
  const [isshow, setIsShow] = useState(false);
  const [comments, setComments] = useState({
    name: "",
    comment: "",
    todoId: paramsId,
  });
  const AddCommentClick = (e) => {
    e.preventDefault();
    dispatch(
      addComment({ ...comments, todoId: parseInt(paramsId), editCheck: false })
    );
    setComments({
      name: "",
      comment: "",
    });
  };

  const onChangeInputHandler = (event) => {
    const { name, value } = event.target;
    setComments({
      ...comments,
      [name]: value,
    });
  };

  const ToggleClick = () => {
    setIsShow(!isshow);
    //  retun( !isShow?display:none:0)
  };

  return (
    <InputContainer>
      <InputStyle1
        onChange={onChangeInputHandler}
        name="name"
        placeholder="이름(5자 이내)"
      ></InputStyle1>
      <InputStyle2
        onChange={onChangeInputHandler}
        name="comment"
        placeholder="댓글을 추가하세요(100자 이내)"
      ></InputStyle2>
      <ButtonStyle onClick={AddCommentClick}>추가하기</ButtonStyle>
    </InputContainer>
  );
}

export default CommentForm;

const InputContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const InputStyle1 = styled.input`
  border: none ;
  border-radius: 10px;
  height: 40px;
  margin-right: 10px;
  width: 120px;
`;
const InputStyle2 = styled.input`
  border: none;
  border-radius: 10px;
  height: 40px;
  margin-right: 100px;
  width: 600px;
`;
const ButtonStyle = styled.button`
  border-radius: 10px;
  padding: 5px 15px;
  border: 0;
  background-color: #ce81a5;
  color: white;
  margin-right: 5px;
`;
