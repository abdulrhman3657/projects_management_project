import axios from "axios";
import { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { FaDeleteLeft } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router";

function AdminPage() {
  const API = "https://682199fa259dad2655afc100.mockapi.io/usersapi";

  const [users, setUsers] = useState([]);
  const [usersCopy, setUsersCopy] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    axios.get(API).then((res) => {

      const newlist1 = res.data.filter((user) => {
        return user.type == "Student"
      })

      setUsers(newlist1);

      setUsersCopy(res.data);

      const newlist = res.data.filter((user) => {
        return user.type == "Instructor"
      })
      
      setInstructors(newlist)

      // console.log(res.data);
    });
  }, []);

  // const modifyUser = () => {

  // };
  const deleteUser = (id) => {
    // console.log(id);

    axios.delete(`${API}/${id}`).then((res) => {
      // console.log(res.data);

      const newUsers = users.filter((user) => {
        return user.id != id;
      });

      setUsers(newUsers);
    });
  };

  const searchUser = () => {
    if (search == "") {
      console.log(usersCopy);
      setUsers(usersCopy);
      return;
    }

    let filteredUsers = users.filter((user) => {
      return user.username.toLowerCase().includes(search.toLowerCase());
    });

    if (filteredUsers.length == 0) {
      filteredUsers = usersCopy.filter((user) => {
        return user.username.toLowerCase().includes(search.toLowerCase());
      });

      setUsers(filteredUsers);

      return;
    }

    setUsers(filteredUsers);
  };

  return localStorage.getItem("username") == "admin" ? (
    <div className="p-3 bg-gray-300 flex flex-col gap-3">
      <div>
        <ToastContainer position="top-center" reverseOrder={false} />
      </div>
      <div>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            onClick={searchUser}
          >
            Search
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Idea
              </th>
              <th scope="col" className="px-6 py-3">
                More
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="bg-white border-b border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {user.username}
                </th>
                <td className="px-6 py-4">{user.type}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link to={`/adminpage/ideadetails/${user.id}`} className="hover:text-indigo-700 hover:cursor-pointer font-bold">Details...</Link>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3 text-2xl">
                    <FaDeleteLeft
                      onClick={() => deleteUser(user.id)}
                      className="hover:text-red-500 hover:cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

                  <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Students
              </th>
              <th scope="col" className="px-6 py-3">
                More
              </th>
            </tr>
          </thead>
          <tbody>
            {instructors.map((user) => (
              <tr key={user.id} className="bg-white border-b border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {user.username}
                </th>
                <td className="px-6 py-4">{user.type}</td>
                <td className="px-6 py-4">
                  <Link to={`/adminpage/groupdetails/${user.id}`} className="hover:text-indigo-700 hover:cursor-pointer font-bold">Details...</Link>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3 text-2xl">
                    <FaDeleteLeft
                      onClick={() => deleteUser(user.id)}
                      className="hover:text-red-500 hover:cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  ) : (
    <div className="flex justify-center items-center h-screen bg-blue-50">
      <h1 className="text-2xl lg:text-3xl font-bold">
        you are not authorised for this page
      </h1>
    </div>
  );
}

export default AdminPage;
