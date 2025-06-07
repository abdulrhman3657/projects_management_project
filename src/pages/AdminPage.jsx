import axios from "axios";
import React, { useEffect, useState } from "react";

function AdminPage() {

  const API = "https://682199fa259dad2655afc100.mockapi.io/usersapi";

  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get(API).then((res) => {
        setUsers(res.data)
        console.log(res.data)
    })
  }, []);

  return localStorage.getItem("username") == "admin" ? (
    <div>
      <div>
        {
            users.map((user) =>(
                <div key={user.id}>
                    <p>{user.username}</p>
                    <p>{user.email}</p>
                    <p>{user.type}</p>
                </div>
            ))
        }
      </div>
    </div>
  ) : (
    <div>you are no aothorised for this page</div>
  );
}

export default AdminPage;
