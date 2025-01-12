"use client";
import React from "react";
import { useGlobalState } from "../Context/GlobalProvider";
import Tasks from "../Components/Tasks/Tasks";

function page() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {completedTasks} = useGlobalState();

    return <Tasks title="Completed Tasks" tasks={completedTasks} />;
}

export default page;