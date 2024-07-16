const getResponse = async (url, message, isCustomDoubt, history) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  if (isCustomDoubt) {
    return fetch(backendUrl + "api/custom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url, history: history, doubt: message }),
    })
      .then((response) => response.json())
      .then((data) => data.message);
  } else {
    return fetch(backendUrl + "api/preprompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url, history: history, doubt: message }),
    })
      .then((response) => response.json())
      .then((data) => data.message);
  }
};

const continueChat = async (message, history) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return fetch(backendUrl + "api/continue", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: message, history: history }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.message;
    });
};

export default getResponse;
export { continueChat };
