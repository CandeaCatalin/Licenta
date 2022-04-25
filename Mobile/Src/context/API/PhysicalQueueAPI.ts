import { baseUrl } from "../../constants/APIUrls";
import { getData } from "../../constants/Storage";
export class PhysicalQueueAPI {
  baseUrl: string;
  _endpoints: Endpoints;
  constructor() {
    this._endpoints = {};
    this.baseUrl = baseUrl;
    this._endpoints = {
      getPhysicalQueue: "/api/PhysicalQueue/getByUsersId",
      leavePhysicalQueue: "/api/PhysicalQueue/leavePhysicalQueue",
      getEstimatedTime: "/api/PhysicalQueue/GetEstimatedTime?id=",
    };
  }
  getPhysicalQueue = async () => {
    try {
      const response = await fetch(
        this.baseUrl + this._endpoints.getPhysicalQueue,
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

      if (typeof content.physicalQueue.id === "number") {
        return content;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
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
