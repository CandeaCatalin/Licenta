import { Queue } from "./Queue";

export type PhysicalQueue = {
  name: string;
  description: string;
  queueId: number;
  id: number;
  estimatedTime: Date;
  createdTime: Date;
  queue: Queue;
};
