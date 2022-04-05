import { getData } from "../../constants/Storage";
import { Queue } from "../../Models/Queue";
export class QueueAPI {
  baseUrl: string;
  _endpoints: Endpoints;
  constructor() {
    this._endpoints = {};
    this.baseUrl = "http://192.168.0.133:5004";
    this._endpoints = {
      getQueue: "/api/Queue/get",
      addUserInQueue: "/api/Queue/AddUserToQueue",
    };
  }

  getQueue = async () => {
    const response = await fetch(this.baseUrl + this._endpoints.getQueue, {
      method: "get",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await getData("jwt")),
      },
    });
    const content = await response.json();
    if (content.status === 401) {
      throw "Unauthorized";
    }
    return content;
  };

  addUserInQueue = async (userId: number, queueId: number) => {
    console.log(userId, queueId);
    const response = await fetch(
      this.baseUrl + this._endpoints.addUserInQueue,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await getData("jwt")),
        },
        credentials: "include",
        body: JSON.stringify({ userId: userId, queueId: queueId }),
      }
    ).then();
    const content = await response;
    if (content.statusText === "OK") {
      return true;
    } else {
      return false;
    }
  };
}

export default QueueAPI;