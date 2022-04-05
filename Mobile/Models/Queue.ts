import { PhysicalQueue } from "./PhysicalQueue";

export type Queue = {
  name: string;
  description: string;
  createdTime: Date;
  id: number;
  physicalQueues: PhysicalQueue[];
};
