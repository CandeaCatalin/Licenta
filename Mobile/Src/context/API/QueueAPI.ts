import { baseUrl } from "../../constants/APIUrls";
import { getData } from "../../constants/Storage";
export class QueueAPI {
  baseUrl: string;
  _endpoints: Endpoints;
  constructor() {
    this._endpoints = {};
    this.baseUrl = baseUrl;
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
    );
    const content = await response.json();
    if (content.status === 1) {
      return content.id;
    } else {
      return 0;
    }
  };
}

export default QueueAPI;
