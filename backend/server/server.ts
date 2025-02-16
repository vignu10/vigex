import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { PrismaClient } from ".prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

// Load gRPC Proto
const packageDefinition = protoLoader.loadSync("./proto/task.proto", {});
const taskProto: any =
  grpc.loadPackageDefinition(packageDefinition).taskreminder;

// gRPC Service Implementation
const server = new grpc.Server();

server.addService(taskProto.TaskService.service, {
  async CreateUser(call: any, callback: any) {
    const { name, email, password } = call.request;
    const passwordHash = await bcrypt.hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: { name, email, passwordHash },
      });
      callback(null, { id: user.id, name: user.name, email: user.email });
    } catch (error) {
      callback({ code: grpc.status.ALREADY_EXISTS, message: "User exists" });
    }
  },

  async LoginUser(call: any, callback: any) {
    const { email, password } = call.request;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return callback({
        code: grpc.status.UNAUTHENTICATED,
        message: "Invalid credentials",
      });
    }
    callback(null, { id: user.id, name: user.name, email: user.email });
  },

  async CreateTask(call: any, callback: any) {
    const {
      userId,
      title,
      description,
      priority,
      dueDate,
      isRecurring,
      recurrencePattern,
    } = call.request;

    try {
      const task = await prisma.task.create({
        data: {
          userId,
          title,
          description,
          priority,
          dueDate,
          isRecurring,
          recurrencePattern,
        },
      });
      callback(null, {
        id: task.id,
        title: task.title,
        priority: task.priority,
        isCompleted: task.isCompleted,
      });
    } catch (error) {
      callback({ code: grpc.status.INTERNAL, message: "Task creation failed" });
    }
  },

  async GetTasks(call: any, callback: any) {
    const { userId } = call.request;
    const tasks = await prisma.task.findMany({ where: { userId } });
    callback(null, { tasks });
  },

  async CreateReminder(call: any, callback: any) {
    const { userId, taskId, remindAt } = call.request;

    try {
      const reminder = await prisma.reminder.create({
        data: { userId, taskId, remindAt, status: "pending" },
      });
      callback(null, {
        id: reminder.id,
        taskId: reminder.taskId,
        remindAt: reminder.remindAt,
      });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: "Reminder creation failed",
      });
    }
  },

  async GetReminder(call: any, callback: any) {
    const { userId, reminderId } = call.request;

    try {
      const reminder = await prisma.reminder.findUnique({
        where: { id: reminderId, userId },
      });

      if (!reminder) {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: "Reminder not found",
        });
      }

      callback(null, {
        id: reminder.id,
        taskId: reminder.taskId,
        remindAt: reminder.remindAt,
        status: reminder.status,
      });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: "Failed to retrieve reminder",
      });
    }
  },
});

// Start gRPC Server
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("gRPC Server running on port 50051");
    server.start();
  }
);
