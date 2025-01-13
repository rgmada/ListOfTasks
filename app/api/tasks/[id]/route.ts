import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/Utils/connect";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { [key: string]: string | string[] } } // Updated type
) {
  try {
    const { userId } = await auth();

    const id = params.id as string; // Safely cast to string

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const task = await prisma.task.delete({
      where: {
        id,
      },
    });

    console.log("TASK DELETED: ", task);
    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR DELETING TASK: ", error);
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
}
