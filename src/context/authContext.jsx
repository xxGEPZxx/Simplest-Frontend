import api from "../api/api";

export const login = async (email, password) => {
  const response = await api.post("/auth/signing", {
    email,
    password,
  });

  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data.data.user));
    localStorage.setItem(
      "authToken",
      JSON.stringify(response.data.data.accessToken)
    );
  }

  if (response.data.error) {
    return response.data.error;
  }

  return response.data;
};

export const signup = async (name, lastName, email, password, dateBirth) => {
  console.log(name);
  const response = await api.post("/auth/signup", {
    name,
    lastName,
    email,
    password,
    dateBirth,
  });
  console.log(response);
  if (response.data.error) {
    return response.data.error;
  }

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("authToken");
};

export const createPost = async (title, description) => {
  const response = await api.post(
    "/post",
    {
      title,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("authToken")
        )}`,
      },
    }
  );
  if (response.data.error) {
    return response.data.error;
  }

  return response.data;
};

export const updatePost = async (id, title, description) => {
  const response = await api.put(
    `/post/${id}`,
    {
      title,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("authToken")
        )}`,
      },
    }
  );
  if (response.data.error) {
    return response.data.error;
  }

  return response.data;
};

export const deletePost = async (id) => {
  console.log(id);
  const response = await api.delete(`/post/${id}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("authToken"))}`,
    },
  });
  if (response.data.error) {
    return response.data.error;
  }
  console.log(response.data);
  return response.data;
};

export const postUser = async () => {
  const response = await api.get("/post/user", {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("authToken"))}`,
    },
  });
  if (response.data.error) {
    return response.data.error;
  }
  return response.data;
};
