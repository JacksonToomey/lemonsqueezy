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
  readRequest: Action<ResourceModel<RT, SM>, ReadRequestStartPayload>
  completeReadRequest: Action<ResourceModel<RT, SM>, ReadRequestCompletePayload<RT>>
  deleteRequest: Action<ResourceModel<RT, SM>, DeleteRequestStartPayload>
  completeDeletRequest: Action<ResourceModel<RT, SM>, DeleteRequestCompletePayload>
  updateResource: Action<ResourceModel<RT, SM>, UpdateResourcePayload<RT>>
  getResources: Computed<
  ResourceModel<RT, SM>,
  (listName: string) => RT[],
  SM
  >
  getResource: Computed<
  ResourceModel<RT, SM>,
  (id: string | null) => RT | null,
  SM
  >
  getRequestStatus: Computed<
  ResourceModel<RT, SM>,
  (key: string) => Status,
  SM
  >
}
