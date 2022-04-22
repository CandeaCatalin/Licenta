import { getData, storeData } from "../../constants/Storage";
export class PhysicalQueueAPI {
  baseUrl: string;
  _endpoints: Endpoints;
  constructor() {
    this._endpoints = {};
    this.baseUrl = "http://192.168.1.4:5004";
    this._endpoints = {
      getPhysicalQueue: "/api/PhysicalQueue/getByUsersToQueues?id=",
      leavePhysicalQueue: "/api/PhysicalQueue/leavePhysicalQueue",
    };
  }
  getPhysicalQueue = async (usersToQueuesId: number | null) => {
    const response = await fetch(
      this.baseUrl + this._endpoints.getPhysicalQueue + usersToQueuesId,
      {
        method: "get",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await getData("jwt")),
        },
      }
    );
    const content = await response.json();
    if (typeof content.id === "number") {
      return content;
    } else {
      throw "error";
    }
  };
  leaveQueue = async (userId: number) => {
    await fetch(this.baseUrl + this._endpoints.leavePhysicalQueue, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await getData("jwt")),
      },
      body: JSON.stringify({
        userId: userId,
      }),
    });
    return true;
  };
}
