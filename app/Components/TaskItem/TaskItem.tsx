"use client";
import { useGlobalState } from "@/app/Context/GlobalProvider";
import { edit, trash } from "@/app/Utils/Icons";
import React, { useState } from "react";
import styled from "styled-components";
import formatDate from "@/app/Utils/formatDate";
import Button from "../Button/Button";

interface Props {
  title: string;
  description: string;
  category: string;
  date: string;
  isCompleted: boolean;
  id: string;
}

function TaskItem({ title, description, date, isCompleted, id, category }: Props) {
  const { theme, deleteTask, updateTask } = useGlobalState();

  const [isEditing, setIsEditing] = useState(false); 
  const [newDate, setNewDate] = useState(date); 

  // Save the updated date
  const handleSaveDate = () => {
    const updatedTask = {
      id,
      date: newDate, 
    };

    updateTask(updatedTask); 
    setIsEditing(false);
  };

  return (
    <TaskItemStyled theme={theme}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{category}</p>

      
      {!isEditing ? (
        <p className="date">{formatDate(date)}</p>
      ) : (
        <div className="edit-date">
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <button className="save-date" onClick={handleSaveDate}>
            Save
          </button>
        </div>
      )}

      <div className="task-footer">
        {isCompleted ? (
          <button
            className="completed"
            onClick={() => {
              const task = { id, isCompleted: !isCompleted };
              updateTask(task);
            }}
          >
            Completed
          </button>
        ) : (
          <button
            className="incomplete"
            onClick={() => {
              const task = { id, isCompleted: !isCompleted };
              updateTask(task);
            }}
          >
            Incomplete
          </button>
        )}

        {!isEditing ? (
          <button className="edit" onClick={() => setIsEditing(true)}>
            {edit}
          </button>
        ) : (
          <button className="cancel-edit" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        )}

        
        <button
          className="delete"
          onClick={() => {
            deleteTask(id);
          }}
        >
          {trash}
        </button>
      </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};

  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    gap: 1.2rem;
    align-items: center;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .edit {
      margin-left: auto;
    }

    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 30px;
      background-color: ${(props) => props.theme.colorDanger};
    }

    .completed {
      background-color: ${(props) => props.theme.colorGreenDark};
    }
  }

  .edit-date {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;

    input {
      padding: 0.5rem;
      border: 1px solid ${(props) => props.theme.borderColor2};
      border-radius: 0.5rem;
    }

    .save-date {
      padding: 0.5rem 1rem;
      background-color: ${(props) => props.theme.colorGreenDark};
      border: none;
      border-radius: 0.5rem;
      color: ${(props) => props.theme.colorGrey0};
      cursor: pointer;
    }
  }
`;

export default TaskItem;
