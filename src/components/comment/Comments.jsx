import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { __removeComment } from "../../redux/modules/CommentSlice";
import { __editComment } from "../../redux/modules/CommentSlice";
import { __saveComment } from "../../redux/modules/CommentSlice";

import { BsTrash, BsPencil } from "react-icons/bs";
import { useParams } from "react-router-dom";

import { __getCommentList } from "../../redux/modules/CommentSlice";

import CommentForm from "./CommentForm";

const Comment = () => {
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comment.comment);
  const paramsId = useParams().id;

  const [comments, setComments] = useState(commentList);

  useEffect(() => {
    dispatch(__getCommentList(paramsId));
  }, [dispatch]);

  const toggle_Comment = (comments, listIsdone) => {
    if (listIsdone == true) {
      dispatch(__editComment(comments));
    } else {
      dispatch(__editComment(comments));
    }
  };

  const save_Remove_Comment = (list, comments) => {
    if (list.editCheck == false) {
      if (window.confirm("정말로 삭제하시겠습니까?")) {
        dispatch(__removeComment(list));
      } else {
        return null;
      }
    } else {
      console.log(list);
      console.log(comments);
      dispatch(__saveComment(comments));
    }
  };

  return (
    <div>
      <CommentForm />
      <div>
        {commentList.map((comment) => {
          return (
            <div key={comment.id}>
              <CommentContainer>
                <CommentList>
                  <div>
                    <NameStyle>
                      {comment.editCheck ? null : comment.name}
                    </NameStyle>
                    <CommentStyle>
                      {comment.editCheck ? (
                        <input
                          type="text"
                          onChange={(ev) => {
                            setComments({
                              id: comment.id,
                              todoId: comment.todoId,
                              name: comment.name,
                              comment: ev.target.value,
                              editCheck: comment.editCheck,
                            });
                          }}
                        />
                      ) : (
                        comment.comment
                      )}
                    </CommentStyle>
                  </div>
                  <div>
                    <IconButton
                      onClick={() => toggle_Comment(comment, comment.editCheck)}
                    >
                      {comment.editCheck ? (
                        "취소"
                      ) : (
                        <BsPencil size="20" color="white" />
                      )}
                    </IconButton>
                    <IconButton
                      onClick={() => save_Remove_Comment(comment, comments)}
                    >
                      {comment.editCheck ? (
                        "저장"
                      ) : (
                        <BsTrash size="20" color="white" />
                      )}
                    </IconButton>
                  </div>
                </CommentList>
              </CommentContainer>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comment;

const CommentContainer = styled.div`
  justify-content: space-between;
`;
// const InputContainer = styled.div`
//   margin-top: 20px;
//   display: flex;
//   justify-content: space-between;
// `;

// const InputStyle = styled.input`
//   border-radius: 10px;
//   height: 40px;
//   border: solid 1px black;
//   margin-right: 10px;
//   width: 200px;
// `;
// const ButtonStyle = styled.button`
//   border-radius: 10px;
//   padding: 5px 15px;
//   border: 0;
//   background-color: skyblue;
//   margin-right: 5px;
// `;

const CommentList = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const NameStyle = styled.p`
  font-size: 10px;
  margin: 0;
`;
const CommentStyle = styled.p`
  margin: 0;
`;

const IconButton = styled.button`
  border-radius: 10px;
  padding: 5px 5px;
  border: 0;
  background-color: #ce81a5;
  margin-right: 5px;
`;
