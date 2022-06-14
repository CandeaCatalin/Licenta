export class PhysicalQueueAPI {
  baseUrl: string;
  _endpoints: Endpoints;
  constructor() {
    this._endpoints = {};
    this.baseUrl = "https://queue-management-system-api.azurewebsites.net";
    this._endpoints = {
      getPhysicalQueue: "/api/PhysicalQueue/get?id=",
      getNextUser: "/api/PhysicalQueue/getNextUser?id=",
    };
  }
  getPhysicalQueue = async (id: number) => {
    const response = await fetch(
      this.baseUrl + this._endpoints.getPhysicalQueue + id,
      {
        method: "get",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
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
  getNextUser = async (physicalQueueId: number) => {
    const response = await fetch(
      this.baseUrl + this._endpoints.getNextUser + physicalQueueId,
      {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );

    const content = await response.json();

    if (typeof content.userName === "string") {
      return content.userName;
    } else {
      throw "error";
    }
  };
}
