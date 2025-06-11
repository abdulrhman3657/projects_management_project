import axios from "axios";
import React, { useEffect, useState } from "react";

function Student() {
  const API = "https://682199fa259dad2655afc100.mockapi.io/usersapi";

  const [data, setData] = useState({});
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [counter, setCounter] = useState(0);
  const [status, setStatus] = useState("");
  const [approvedIdeas, setApprovedIdeas] = useState([]);
  const [studentsGroup, setStudentsGroup] = useState([]);

  const id = localStorage.getItem("id");

  useEffect(() => {
    axios.get(`${API}/${id}`).then((res) => {
      const filterdList = res.data.students.filter((student) => {
        return student.username != localStorage.getItem("username");
      });

      setStudentsGroup(filterdList);

      console.log(res.data);

      setData(res.data);
      setStatus(res.data.ideaStatus.status);
    });
  }, [counter]);

  useEffect(() => {
    axios.get(API).then((res) => {
      const filterdList = res.data.filter((user) => {
        return user.ideaStatus.status == "approved";
      });

      setApprovedIdeas(filterdList);
    });
  }, []);

  const post_idea = () => {
    axios
      .put(`${API}/${id}`, {
        username: data.username,
        email: data.email,
        password: data.password,
        type: data.userType,
        idea: { title: title, text: text },
        students: data.students,
        ideaStatus: { status: "pending", text: "" },
        instructor: data.instructor,
      })
      .then((res) => {
        setTitle(res.data.idea.title);
        setText(res.data.idea.text);
        setCounter(counter + 1);
        console.log(res.data);
      });
  };

  return (
    <div className="bg-gray-200 lg:h-screen  p-3">
      <div className="flex flex-col h-full  lg:items-center gap-3 justify-around">
        <div className="flex flex-col lg:flex-row-reverse w-full justify-center lg:justify-around items-center gap-3">
          <div className="bg-white rounded-xl h-full w-full lg:w-3/10 flex flex-col items-center gap-3 justify-center p-3">
            <h1 className=" text-2xl font-bold text-green-500">
              Approved Ideas
            </h1>
            <ol className="list-decimal p-3">
              {approvedIdeas.map((user) => (
                <li key={user.id}>{user.idea.title}</li>
              ))}
            </ol>
          </div>
          <div className="h-full w-full lg::w-5/10">
            {data?.idea?.title ? (
              <div className="lg:flex flex-col justify-around gap-4 bg-white h-full p-3 rounded-xl">
                <h1>
                  <span className="font-bold">Your Idea: </span>
                  {data?.idea?.title}
                </h1>
                <h1>
                  <span className="font-bold">Description: </span>
                  {data?.idea?.text}
                </h1>
                <h1>
                  <span className="font-bold">Status: </span>
                  <span
                    className={
                      status == "approved"
                        ? "text-green-500"
                        : status == "rejected"
                        ? "text-red-500"
                        : "text-gray-500"
                    }
                  >
                    {status}
                  </span>
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

          <div className="flex flex-col w-full lg:w-1/4 p-3  rounded-2xl bg-white">
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

        <div className="bg-white p-3 rounded-xl lg:w-1/3 flex flex-col gap-2">
          <div>
            <span className="font-bold">Your instructor: </span>
            <span>{data?.instructor?.username}</span>
          </div>
          <div>
            <span className="font-bold">Email: </span>
            <span>{data?.instructor?.email}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-bold text-xl">Your team members: </span>
          <div className="flex flex-col flex-wrap lg:flex-row gap-3">
            {studentsGroup.map((student, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 bg-white p-3 rounded-xl"
              >
                <h1 className="">{student?.username}</h1>
                <h1 className="">{student?.email}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
