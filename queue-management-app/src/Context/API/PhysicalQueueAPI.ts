export class PhysicalQueueAPI {
  baseUrl: string;
  _endpoints: Endpoints;
  constructor() {
    this._endpoints = {};
    this.baseUrl = "https://localhost:5001";
    this._endpoints = {
      getPhysicalQueue: "/api/PhysicalQueue/get?id=",
      addQueue: "/api/Queue/add",
      deleteQueue: "/api/Queue/delete",
    };
  }
  getPhysicalQueue = async (id: number) => {
    const response = await fetch(this._endpoints.getPhysicalQueue + id, {
      method: "get",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const content = await response.json();

    if (typeof content.id === "number") {
      return content;
    } else {
      throw "error";
    }
  };
}
