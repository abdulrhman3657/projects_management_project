import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

function Instructor() {
  const API = "https://682199fa259dad2655afc100.mockapi.io/usersapi";

  const [students, setStudents] = useState([]);

  const id = localStorage.getItem("id");

  useEffect(() => {
    axios.get(`${API}/${id}`).then((res) => {
      setStudents(res.data.students);
      console.log(res.data);
    });
  }, []);

  return (
    <div>
      <div className="relative overflow-x-auto p-5 bg-blue-100">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold py-3">Your students</h1>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-100 uppercase bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3">
                Student
              </th>
              <th scope="col" className="px-6 py-3">
                Idea
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((user) => (
              <tr key={user.id} className="bg-white border-b border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {user.username}
                </th>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      to={`/adminpage/ideadetails/${user.id}`}
                      className="hover:text-indigo-700 hover:cursor-pointer font-bold"
                    >
                      Details...
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Instructor;
