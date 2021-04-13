import axios from "axios";

const fetch = () => axios.get("api/v1/tasks");

const create = payload => axios.post("api/v1/tasks", payload);

const destroy = payload => axios.post("api/v1/tasks/bulk_delete", payload);

const tasksApi = {
  fetch,
  create,
  destroy,
};

export default tasksApi;
