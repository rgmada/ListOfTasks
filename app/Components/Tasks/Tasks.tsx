"use client";
import { useGlobalState } from "@/app/Context/GlobalProvider";
import React, { useState } from "react";
import styled from "styled-components";
import CreateContent from "../Modals/CreateContent";
import TaskItem from "../TaskItem/TaskItem";
import { plus } from "@/app/Utils/Icons";
import Modal from "../Modals/Modal";
import Button from "../Button/Button";

interface Props {
  title: string;
  tasks: any[];
}

function Tasks({ title, tasks }: Props) {
  const { theme, isLoading, openModal, modal, updateTask } = useGlobalState();
  const [sortOption, setSortOption] = useState("date");

  
  const downloadTasksAsJSON = () => {
    const taskData = tasks.map((task) => ({
      Title: task.title,
      Description: task.description,
      Category: task.category,
      Date: task.date,
      Completed: task.isCompleted ? "Yes" : "No",
    }));

    const json = JSON.stringify(taskData, null, 2); 

    const blob = new Blob([json], { type: "application/json" }); 
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); 
    a.href = url;
    a.download = "tasks.json"; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  
  const downloadTasksAsCSV = () => {
    const headers = "Title,Description,Category,Date,Completed\n";
    const taskData = tasks
      .map((task) => {
        
        return `"${task.title}","${task.description}","${task.category}","${task.date}","${task.isCompleted ? "Yes" : "No"}`;
      })
      .join("\n"); 

    const csv = headers + taskData; 

    const blob = new Blob([csv], { type: "text/csv" }); 
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); 
    a.href = url;
    a.download = "tasks.csv"; 
    document.body.appendChild(a);
    a.click(); 
    document.body.removeChild(a); 
    URL.revokeObjectURL(url);
  };

  
  const sortTasks = (tasks: any[]) => {
    switch (sortOption) {
      case "date":
        return tasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case "category":
        return tasks.sort((a, b) => a.category.localeCompare(b.category));
      case "name":
        return tasks.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return tasks;
    }
  };

  const sortedTasks = sortTasks(tasks);

  return (
    <TaskStyled theme={theme}>
      {modal && <Modal content={<CreateContent />} />}
      <h1>{title}</h1>

      <div className="top-actions">
        <div className="sort-options">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-select"
          >
            <option value="date">Sort by Date</option>
            <option value="category">Sort by Category</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        <div className="download-buttons">
          <Button
            name="Download as JSON"
            background={theme.colorPrimaryGreen}
            click={downloadTasksAsJSON}
          />
          <Button
            name="Download as CSV"
            background={theme.colorPrimaryGreen}
            click={downloadTasksAsCSV}
          />
        </div>
      </div>

      {!isLoading ? (
        <div className="tasks grid">
          {sortedTasks.map((task) => (
            <TaskItem
              key={task.id}
              title={task.title}
              description={task.description}
              category={task.category}
              date={task.date}
              isCompleted={task.isCompleted}
              id={task.id}
            />
          ))}
          <button className="create-task" onClick={openModal}>
            {plus}
            Add New Task
          </button>
        </div>
      ) : (
        <div className="tasks-loader w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      )}
    </TaskStyled>
  );
}

const TaskStyled = styled.main`
  position: relative;
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  height: 100%;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .tasks {
    margin: 2rem 0;
  }

  .top-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .sort-options {
    margin-right: 1rem;
  }

  .sort-select {
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: ${(props) => props.theme.colorGrey5};
    color: ${(props) => props.theme.colorGrey0};
    width: auto;
  }

  .download-buttons {
    display: flex;
    gap: 1rem;
    z-index: 10;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Tasks;
