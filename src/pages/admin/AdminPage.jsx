import axios from "axios";
import { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { FaDeleteLeft } from "react-icons/fa6";

function AdminPage() {
  const API = "https://682199fa259dad2655afc100.mockapi.io/usersapi";

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(API).then((res) => {
      setUsers(res.data);
      console.log(res.data);
    });
  }, []);

  // const modifyUser = () => {

  // };
  const deleteUser = (id) => {
    console.log(id);

    axios.delete(`${API}/${id}`).then((res) => {

      console.log(res.data);

      const newUsers = users.filter(user => {
        return user.id != id
      })

      setUsers(newUsers)

    });
  };

  return localStorage.getItem("username") == "admin" ? (
    <div className="p-3 bg-gray-300">
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
              <tr className="bg-white border-b border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {user.username}
                </th>
                <td className="px-6 py-4">{user.type}</td>
                <td className="px-6 py-4">No idea yet</td>
                <td className="px-6 py-4">
                  <div className="flex gap-3 text-2xl">
                    {/* <TbEdit
                      onClick={modifyUser}
                      className="hover:text-green-500 hover:cursor-pointer"
                    /> */}
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
    <div>you are no aothorised for this page</div>
  );
}

export default AdminPage;
