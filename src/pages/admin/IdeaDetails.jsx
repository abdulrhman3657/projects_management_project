import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";

function IdeaDetails() {
  const [data, setData] = useState({});
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
  const [rejText, setRejText] = useState("");

  const { id } = useParams();

  const API = "https://682199fa259dad2655afc100.mockapi.io/usersapi";

  useEffect(() => {
    axios.get(`${API}/${id}`).then((res) => {
      setData(res.data);

      setTitle(res.data.idea.title);
      setText(res.data.idea.text);
      setStatus(res.data.ideaStatus.status);

      console.log(res.data);
    });
  }, []);

  const handleSubmit = () => {
    axios
      .put(`${API}/${id}`, {
        username: data.username,
        email: data.email,
        password: data.password,
        type: data.userType,
        idea: { title: title, text: text },
        students: data.students,
        ideaStatus: { status: status, text: rejText },
      })
      .then((res) => {
        console.log(res.data);

        toast.success("changes saved");
      });
  };

  return (
    <div className="">
      <div>
        <ToastContainer position="top-center" reverseOrder={false} />
      </div>
      <div className="bg-blue-100 h-screen lg:flex justify-center items-center">
        <div className="p-5 flex lg:w-1/2 flex-col gap-3 ">
          <h1>
            <span className="font-bold">Idea: </span>
            <input
              type="text"
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </h1>
          <h1>
            <span className="font-bold">Text: </span>
            <input
              type="text"
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </h1>
          <h1>
            <span className="font-bold">Status: </span>
            <select
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value={status}>{status}</option>

              {status != "pending" ? (
                <option value="pending">pending</option>
              ) : (
                ""
              )}
              {status != "approved" ? (
                <option value="approved">approved</option>
              ) : (
                ""
              )}
              {status != "rejected" ? (
                <option value="rejected">rejected</option>
              ) : (
                ""
              )}
            </select>
          </h1>

          {status == "rejected" ? (
            <div className="flex flex-col gap-3">
              <h1>Please type the rejection message</h1>
              <input
                type="text"
                className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5"
                value={rejText}
                onChange={(e) => setRejText(e.target.value)}
              />
            </div>
          ) : (
            ""
          )}

          <button
            className="self-start w-30 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors"
            onClick={handleSubmit}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default IdeaDetails;
