import { describe, it } from 'node:test';
import { expect } from '@jest/globals';
import { jest } from '@jest/globals';
import { DELETE } from '../../../../app/api/tasks/[id]/route';
import prisma from '../../../../app/Utils/connect'; 
import { auth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import { Category } from '@prisma/client';


jest.mock('../../../../app/Utils/connect', () => ({
  task: {
    delete: jest.fn(), 
  },
}));

jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn(),
}));

describe('DELETE /api/tasks/[id]', () => {
  it('should delete a task and return the deleted task', async () => {
    
    (auth as unknown as jest.Mock).mockReturnValue({ userId: 'user-123' });

    
    const mockDeletedTask = {
      id: 'task-123',
      title: 'Sample Task',
      description: 'Sample Description',
      date: new Date().toISOString(),
      isCompleted: false,
      isImportant: false,
      category: Category.WORK, 
      createdAt: new Date(), 
      updatedAt: new Date(), 
      userId: 'user-123',
    };

    
    (prisma.task.delete as jest.MockedFunction<typeof prisma.task.delete>).mockResolvedValue(mockDeletedTask);

    
    const mockParams = { params: { id: 'task-123' } };
    const mockRequest = {
      method: 'DELETE',
      url: 'http://localhost:3000/api/tasks/task-123',
      headers: new Headers(),
    } as unknown as NextRequest;

    
    const response = await DELETE(mockRequest, mockParams);
    const json = await response.json();

    
    const normalizedResponse = {
      ...json,
      createdAt: new Date(json.createdAt).toISOString(),
      updatedAt: new Date(json.updatedAt).toISOString(),
    };

    const normalizedExpected = {
      ...mockDeletedTask,
      createdAt: mockDeletedTask.createdAt.toISOString(),
      updatedAt: mockDeletedTask.updatedAt.toISOString(),
    };

    
    expect(response.status).toBe(200);
    expect(normalizedResponse).toEqual(normalizedExpected);
    expect(prisma.task.delete).toHaveBeenCalledWith({
      where: { id: 'task-123' },
    });
  });

  it('should return 401 if the user is not authenticated', async () => {
    
    (auth as unknown as jest.Mock).mockReturnValue(null);

    
    const mockParams = { params: { id: 'task-123' } };
    const mockRequest = {
      method: 'DELETE',
      url: 'http://localhost:3000/api/tasks/task-123',
      headers: new Headers(),
    } as unknown as NextRequest;

    
    const response = await DELETE(mockRequest, mockParams);
    const json = await response.json();

    
    expect(response.status).toBe(401);
    expect(json.message).toBe('Authentication required');
  });

  it('should return 500 if there is an error deleting the task', async () => {
    
    (auth as unknown as jest.Mock).mockReturnValue({ userId: 'user-123' });

    
    (prisma.task.delete as jest.MockedFunction<typeof prisma.task.delete>).mockRejectedValue(new Error('Database error'));

    
    const mockParams = { params: { id: 'task-123' } };
    const mockRequest = {
      method: 'DELETE',
      url: 'http://localhost:3000/api/tasks/task-123',
      headers: new Headers(),
    } as unknown as NextRequest;

    
    const response = await DELETE(mockRequest, mockParams);
    const json = await response.json();

    
    expect(response.status).toBe(500);
    expect(json.message).toBe('Internal server error');
  });
});
