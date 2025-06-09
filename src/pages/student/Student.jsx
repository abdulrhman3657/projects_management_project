import axios from "axios";
import React, { useEffect, useState } from "react";

function Student() {
  const API = "https://682199fa259dad2655afc100.mockapi.io/usersapi";

  const [data, setData] = useState({});
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [counter, setCounter] = useState(0);
  const [status, setStatus] = useState("");

  const id = localStorage.getItem("id");

  useEffect(() => {
    axios.get(`${API}/${id}`).then((res) => {
      console.log(res.data);
      setData(res.data);
      console.log(res.data.ideaStatus.status);
      setStatus(res.data.ideaStatus.status);
    });
  }, [counter]);

  const post_idea = () => {
    axios
      .put(`${API}/${id}`, {
        username: data.username,
        email: data.email,
        password: data.password,
        type: data.userType,
        idea: { title: title, text: text },
        students: [],
        ideaStatus: { status: "pending", text: "" },
      })
      .then((res) => {
        // res.data.idea.ideaStatus.status
        setTitle(res.data.idea.title);
        setText(res.data.idea.text);
        setCounter(counter + 1);
        console.log(res.data);
      });
  };

  return (
    <div className="bg-blue-50 p-3">
      <div>
        <div className="flex flex-col lg:items-center gap-3 justify-center">
          <div>
            {data?.idea?.title ? (
              <div>
                <h1>
                  <span className="font-bold">Idea: </span>
                  {data?.idea?.title}
                </h1>
                <h1>
                  <span className="font-bold">Text: </span>
                  {data?.idea?.text}
                </h1>
                <h1>
                  <span className="font-bold">Status: </span>
                  {status}
                </h1>
                {data?.ideaStatus?.status == "rejected" ? (
                  <h1>
                    <span className="font-bold">rejection reason: </span>
                    {data?.ideaStatus?.text}
                  </h1>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <h1 className="text-2xl font-bold">
                you have not yet choosen an idea
              </h1>
            )}
          </div>
          <div className="flex flex-col lg:w-1/4 p-3 border-2 rounded-2xl bg-gray-200">
            <div className="mb-6">
              <label
                htmlFor="default-input"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Idea Title
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="large-input"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Idea Text
              </label>
              <input
                type="text"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
              onClick={post_idea}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
