import { action, computed } from 'easy-peasy';
import { Resource, ResourceModel } from './types';

export default <RT extends Resource, SM extends object>(): ResourceModel<RT, SM> => ({
  requests: {},
  resources: {},
  lists: {},
  readRequest: action((state, payload) => {
    state.requests[payload.key] = { status: 'pending' };
  }),
  completeReadRequest: action((state, payload) => {
    state.requests[payload.key] = { status: 'succeeded' };
    payload.resources.forEach((resource) => {
      state.resources[resource.id] = resource;
    });
    if (payload.list) {
      if (payload.mergeList) {
        const currentList = state.lists[payload.list] || [];
        state.lists[payload.list] = currentList.concat(
          payload.resources.filter((r) => !currentList.includes(r.id)).map((r) => r.id),
        );
      } else {
        state.lists[payload.list] = payload.resources.map((r) => r.id);
      }
    }
  }),
  deleteRequest: action((state, payload) => {
    state.requests[payload.key] = { status: 'pending' };
  }),
  completeDeletRequest: action((state, payload) => {
    state.requests[payload.key] = { status: 'succeeded' };
    payload.resources.forEach((resource) => {
      delete state.resources[resource];
    });
  }),
  updateResource: action((state, payload) => {
    if (state.resources[payload.id]) {
      state.resources[payload.id] = {
        ...state.resources[payload.id],
        ...payload.update,
      };
    }
  }),
  getResources: computed(
    [
      (state) => state.lists,
      (state) => state.resources,
    ],
    (lists, resources) => (listName: string) => {
      if (!lists[listName]) {
        return [];
      }
      return lists[listName]
        .filter((id) => resources[id])
        .map(
          (id) => resources[id],
        );
    },
  ),
  getResource: computed(
    [
      (state) => state.resources,
    ],
    (resources) => (id: number | null) => ((id && resources[id]) ? resources[id] : null),
  ),
  getRequestStatus: computed(
    [
      (state) => state.requests,
    ],
    (requests) => (key: string) => (requests[key] ? requests[key].status : 'idle'),
  ),
});