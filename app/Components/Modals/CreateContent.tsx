"use client";
import { useGlobalState } from "@/app/Context/GlobalProvider";
import axios from "axios";
import React, {useState} from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import Button from "../Button/Button";
import { plus } from "@/app/Utils/Icons";

export enum Category {
    WORK = "WORK",
    PERSONAL = "PERSONAL",
    SHOPPING = "SHOPPING",
  }

function CreateContent() {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [date, setDate] = useState("");
const [completed, setCompleted] = useState(false);
const [important, setImportant] = useState(false);
const [category, setCategory] = useState<Category | undefined>(Category.WORK);

const {theme, allTasks, closeModal} = useGlobalState();

const handleChange = (name: string) => (e:any) => {
    switch (name) {
        case "title":
            setTitle(e.target.value);
            break;
        case "description":
            setDescription(e.target.value);
            break;
        case "date":
            setDate(e.target.value);
            break;
        case "completed":
            setCompleted(e.target.checked);
            break;
        case "important":
            setImportant(e.target.checked);
            break;
        case "category":
            setCategory(e.target.value);
            break;
        default:
            break;
    }
};

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const task = {
            title,
            description,
            date,
            completed,
            important,
            category,
        };

        try {
            const res = await axios.post("/api/tasks", task);

            if(res.data.error){
                toast.error(res.data.error);
            }
            
            if (!res.data.error) {
                toast.success("Task created successfully.");
                allTasks();
                closeModal();
            }

        } catch (error) {
            toast.error("Something went wrong.");
            console.log(error);
        }
    };


    return (
      <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
        <h1>Create a task</h1>
        <div className="input-control">
            <label htmlFor="title">Title</label>
            <input 
                type="text"
                id="title"
                value={title}
                name="title" 
                onChange={handleChange("title")}
                placeholder="e.g, Whatch a video from Friends."
            />
        </div>

        <div className="input-control">
            <label htmlFor="description">Description</label>
            <textarea 
                id="description"
                value={description}
                name="description" 
                onChange={handleChange("description")}
                rows={4}
                placeholder="e.g, Whatch a video about Next.js Auth."
            ></textarea>
        </div>

        <div className="input-control">
            <label htmlFor="date">Date</label>
            <input
                type="date"
                id="date"
                value={date}
                name="date" 
                onChange={handleChange("date")}
            />
        </div>

        <div className="input-control toggler">
            <label htmlFor="completed">Completed</label>
            <input
                type="checkbox"
                id="completed"
                value={completed.toString()}
                name="completed" 
                onChange={handleChange("completed")}
            />
        </div>

        <div className="input-control toggler">
            <label htmlFor="important">Important</label>
            <input
                type="checkbox"
                id="important"
                value={important.toString()}
                name="important" 
                onChange={handleChange("important")}
            />
        </div>

        <div className="input-control">
            <label htmlFor="category">Category</label>
            <select
                id="category"
                value={category}
                name="category"
                onChange={handleChange("category")}
            >
                <option value="" disabled>
                Select a category
                </option>
                <option value="WORK">Work</option>
                <option value="PERSONAL">Personal</option>
                <option value="SHOPPING">Shopping</option>
            </select>
        </div>

        <div className="submit-btn flex justify-end">
            <Button type="submit" 
                name="Create Task"
                icon={plus}
                padding={"0.8rem 2rem"}
                borderRad={"0.8rem"}
                fw={"500"}
                fs={"1.2rem"}
                background={"rgb(0, 163, 255)"}
            />
        </div>

    </CreateContentStyled>
    );
}

const CreateContentStyled = styled.form`
    >h1{
        font-size: clamp(1.2rem, 5vw, 1.6rem);
        font-weight: 600;
   }

    
    color: ${(props) => props.theme.colorGrey1};

    .input-control{
        position: relative;
        margin: 1.6rem 0;
        font-weight: 500;

        input, textarea, select {
            width: 100%;
            padding: 1rem;

            resize: none;
            background-color: ${(props) => props.theme.colorGreyDark};
            color: ${(props) => props.theme.colorGrey2};
            border-radius: 0.5rem;
        }
        
        label{
            margin-bottom: 0.5rem;
            display: inline-block;
            font-size: clamp(0.9rem, 5vw, 1.2rem);

            span{
                color: ${(props) => props.theme.colorGrey3};
            }
        }
    }

    .submit-btn button{

        transition: all 0.35s ease-in-out;

        i{
            color: ${(props) => props.theme.colorGrey0};
        }
        
        &:hover{
            background: ${(props) => props.theme.colorPrimaryGreen} !important;
            color: ${(props) => props.theme.colorWhite} !important;
        }
    }

    .toggler{
        display: flex;
        justify-content: space-between;
        align-items: center;

        cursor: pointer;

        label{
            flex: 1;
        }

        input {
            width: initial;
        }
    }

    
   
`;

export default CreateContent;