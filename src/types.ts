import { Action, Computed } from "easy-peasy";

export interface AuthModel {}

export interface Resource {
  id: string
}

export type Status = 'pending' | 'succeeded' | 'failed' | 'idle';

export interface ResourceRequest {
  status: Status
}

export type ResourceStore<R extends Resource> = {
  [key: string]: R
};

export type ResourceRequests = { [key: string]: ResourceRequest };

export type ResourceLists = { [key: string]: string[] };

export interface DeleteRequestStartPayload {
  key: string
}
export interface DeleteRequestCompletePayload {
  key: string
  resources: string[]
}

export interface ReadRequestStartPayload {
  key: string
}

export interface ReadRequestCompletePayload<R extends Resource> {
  key: string
  resources: R[]
  list?: string
  mergeList?: boolean
}

export interface UpdateResourcePayload<RT extends Resource> {
  id: string
  update: Partial<RT>
}

export interface ResourceModel<RT extends Resource, SM extends object> {
  resources: ResourceStore<RT>
  requests: ResourceRequests
  lists: ResourceLists
  readRequest: Action<this, ReadRequestStartPayload>
  completeReadRequest: Action<this, ReadRequestCompletePayload<RT>>
  deleteRequest: Action<this, DeleteRequestStartPayload>
  completeDeletRequest: Action<this, DeleteRequestCompletePayload>
  updateResource: Action<this, UpdateResourcePayload<RT>>
  getResources: Computed<
  this,
  (listName: string) => RT[],
  SM
  >
  getResource: Computed<
  this,
  (id: number | null) => RT | null,
  SM
  >
  getRequestStatus: Computed<
  this,
  (key: string) => Status,
  SM
  >
}
