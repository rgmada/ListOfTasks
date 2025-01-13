import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/Utils/connect";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(req: NextRequest) {
  const { userId } = await auth();
  
  const id = req.nextUrl.searchParams.get("id");

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }

  try {
    const task = await prisma.task.delete({
      where: {
        id: id as string,
      },
    });

    console.log("TASK DELETED: ", task);
    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR DELETING TASK: ", error);
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
}
