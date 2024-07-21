import expect from "expect";
import sinon from "sinon";
import * as TaskModel from "../../model/taskModel";
import notFoundError from "../../error/notFoundError";
import {
  fetchTasks,
  fetchTaskById,
  createTask,
  modifyTask,
  deleteTask,
} from "../../service/taskService";
import { Task } from "../../interface/taskInterface";

describe("Task Service", () => {
  let taskModelStub: sinon.SinonStub;

  afterEach(() => {
    sinon.restore();
  });

  // Test cases for fetchTasks
  describe("fetchTasks", () => {
    it("should get all tasks", () => {
      const mockTasks: Task[] = [
        {
          id: 1,
          title: "Complete assignment",
          completed: false,
          userId: 1,
        },
      ];
      taskModelStub = sinon.stub(TaskModel, "getAllTasks").returns(mockTasks);

      const result = fetchTasks(1);
      expect(taskModelStub.calledOnce).toBe(true);
      expect(result).toStrictEqual(mockTasks);
    });
  });

  // Test cases for fetchTaskById
  describe("fetchTaskById", () => {
    it("should get task by ID and user ID", () => {
      const mockTask: Task = {
        id: 1,
        title: "Complete assignment",
        completed: false,
        userId: 1,
      };
      taskModelStub = sinon.stub(TaskModel, "getTaskById").returns(mockTask);

      const result = fetchTaskById(1, 1);
      expect(taskModelStub.calledOnce).toBe(true);
      expect(result).toStrictEqual(mockTask);
    });

    it("should throw notFoundError if task not found", () => {
      taskModelStub = sinon.stub(TaskModel, "getTaskById").returns(null);

      expect(() => fetchTaskById(1, 1)).toThrow(
        new notFoundError(`Task with ID 1 not found`)
      );
      expect(taskModelStub.calledOnce).toBe(true);
    });
  });

  // Test cases for createTask
  describe("createTask", () => {
    it("should create a task", () => {
      const newTask: Task = {
        id: 1,
        title: "New Task",
        completed: false,
        userId: 1,
      };
      taskModelStub = sinon.stub(TaskModel, "addTask").returns(newTask);
      sinon.stub(TaskModel, "generateNextId").returns(1);

      const result = createTask("New Task", false, 1);
      expect(taskModelStub.calledOnce).toBe(true);
      expect(result).toStrictEqual(newTask);
    });
  });

  // Test cases for modifyTask
  describe("modifyTask", () => {
    it("should update a task", () => {
      const existingTask: Task = {
        id: 1,
        title: "Complete assignment",
        completed: false,
        userId: 1,
      };
      const updatedTask: Task = {
        id: 1,
        title: "Updated Task",
        completed: true,
        userId: 1,
      };

      sinon.stub(TaskModel, "getTaskById").returns(existingTask);
      taskModelStub = sinon.stub(TaskModel, "updateTask").returns(updatedTask);

      const result = modifyTask(
        1,
        { title: "Updated Task", completed: true },
        1
      );
      expect(taskModelStub.calledOnce).toBe(true);
      expect(result).toStrictEqual(updatedTask);
    });

    it("should throw notFoundError if task not found", () => {
      taskModelStub = sinon.stub(TaskModel, "getTaskById").returns(null);

      expect(() =>
        modifyTask(1, { title: "Updated Task", completed: true }, 1)
      ).toThrow(new notFoundError(`Task with 1 not found`));
      expect(taskModelStub.calledOnce).toBe(true);
    });
  });

  // Test cases for deleteTask
  describe("deleteTask", () => {
    it("should delete a task", () => {
      const mockTask: Task = {
        id: 1,
        title: "Complete assignment",
        completed: false,
        userId: 1,
      };
      taskModelStub = sinon.stub(TaskModel, "removeTask").returns(mockTask);

      const result = deleteTask(1, 1);
      expect(taskModelStub.calledOnce).toBe(true);
      expect(result).toStrictEqual(mockTask);
    });

    it("should throw notFoundError if task not found", () => {
      taskModelStub = sinon.stub(TaskModel, "removeTask").returns(null);

      expect(() => deleteTask(1, 1)).toThrow(
        new notFoundError(`Task with ID 1 not found`)
      );
      expect(taskModelStub.calledOnce).toBe(true);
    });
  });
});
