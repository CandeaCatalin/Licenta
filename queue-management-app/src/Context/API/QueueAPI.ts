import { toast } from "react-hot-toast";
import { Queue } from "../../Models/Queue";
export class QueueAPI {
  baseUrl: string;
  _endpoints: Endpoints;
  constructor() {
    this._endpoints = {};
    this.baseUrl = "https://localhost:5001";
    this._endpoints = {
      getQueue: "/api/Queue/get",
      addQueue: "/api/Queue/add",
      deleteQueue: "/api/Queue/delete",
      editQueue: "api/Queue/edit",
      passUserInQueue: "/api/Queue/PassUserInQueue",
    };
  }
  addQueue = async (queue: Queue) => {
    const response = await fetch(this._endpoints.addQueue, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      credentials: "include",
      body: JSON.stringify(queue),
    }).then();
    const content = await response.json();
    if (response.statusText === "OK") {
      toast.success("Queue added successfully");
      return true;
    } else {
      toast.error(content.message);
      return false;
    }
  };
  getQueue = async () => {
    const response = await fetch(this._endpoints.getQueue, {
      method: "get",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    const content = await response.json();
    if (content.status === 401) {
      throw "Unauthorized";
    }
    return content;
  };
  deleteQueue = async (queueId: number) => {
    const response = await fetch(this._endpoints.deleteQueue, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      credentials: "include",
      body: JSON.stringify(queueId),
    }).then();
    const content = await response;
    if (content.statusText === "OK") {
      toast.success("Queue deleted!");
      return true;
    } else {
      toast.error("An error has acquired");
      return false;
    }
  };
  editQueue = async (queue: Queue) => {
    const response = await fetch(this._endpoints.editQueue, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      credentials: "include",
      body: JSON.stringify(queue),
    }).then();
    const content = await response;
    if (content.statusText === "OK") {
      toast.success("Queue edited!");
      return true;
    } else {
      toast.error("An error has acquired");
      return false;
    }
  };
  passUserInQueue = async (physicalQueueId: number) => {
    const response = await fetch(this._endpoints.passUserInQueue, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      credentials: "include",
      body: JSON.stringify({ physicalQueueId: physicalQueueId }),
    }).then();
    const content = await response;
    if (content.statusText === "OK") {
      toast.success("User passed!");
      return true;
    } else {
      toast.error("An error has acquired");
      return false;
    }
  };
}

export default QueueAPI;
