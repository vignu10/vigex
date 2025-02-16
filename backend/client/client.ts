import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const packageDefinition = protoLoader.loadSync("./proto/task.proto", {});
const taskProto: any =
  grpc.loadPackageDefinition(packageDefinition).taskreminder;

const client = new taskProto.TaskService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.CreateUser(
  { name: "Vignu", email: "vignu@test.com", password: "123456" },
  (err: any, response: any) => {
    if (err) console.error(err);
    else console.log("User Created:", response);
  }
);
