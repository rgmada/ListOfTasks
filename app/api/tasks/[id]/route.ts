import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../app/Utils/connect';
import { auth } from '@clerk/nextjs/server';

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  
  const { userId } = await auth() ?? {}; 

  
  if (!userId) {
    return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
  }

    try {
      
      const taskToDelete = await prisma.task.delete({
        where: {
          id: params.id,
        },
      });

      
      return NextResponse.json(taskToDelete, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      
      console.error('Error deleting task:', error.message || error); 
      console.error(error.stack); 

      
      return NextResponse.json({ message: 'Internal server error', error: error.message || 'Unknown error' }, { status: 500 });
    };
};
