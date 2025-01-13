/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/app/Utils/connect";

export async function POST(req: Request){
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const {title, description, date, completed, important, category} = await req.json();

        if (!title || !description || !date) {
            return NextResponse.json({
                error: "Missing required fields", 
                status: 400,
            });
        }

        if (title.length < 3) {
            return NextResponse.json({
              error: "Title must be at least 3 characters long",
              status: 400,
            });
        }

        if (description.length > 100) {
            return NextResponse.json({
              error: "Description exceeding character limit",
              status: 400,
            });
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                date,
                isCompleted: completed,
                isImportant: important,
                category,
                userId,
            },
        });

        console.log("TASK CREATED: ", task);

        return NextResponse.json(task);

    } catch (error) {
        console.log("ERROR CREATING TASK: ", error);
        return NextResponse.json ({error: "Error creating task", status: 500});
    }
}

export async function GET(req: Request){
    try {
        console.log("HERE")
        const {userId} = await auth();
        if (!userId) {
            return NextResponse.json({error: "Unauthorized", status: 401});
        }

        const tasks = await prisma.task.findMany ({
            where: {
                userId, 
            },
        });

        console.log("TASKS: ", tasks);

        return NextResponse.json(tasks);
        
    } catch (error) {
        console.log("ERROR GETTING TASKS: ", error);
        return NextResponse.json ({error: "Error creating tasks", status: 500});
    }
}

export async function PUT(req: Request){
    try {
    const {userId} = await auth();
    const {isCompleted, id} = await req.json();

    if (!userId) {
        return NextResponse.json({error: "Unauthorized", status: 401});
    }

    const task = await prisma.task.update({

        where: {
            id,
        },
        data: {
            isCompleted,
        },
    });

    return NextResponse.json(task);

    } catch (error) {
        console.log("ERROR UPDATING TASKS: ", error);
        return NextResponse.json ({error: "Error deleting tasks", status: 500});
    }
}

