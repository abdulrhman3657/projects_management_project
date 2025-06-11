import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";

function GroupDetails() {
  const [data, setData] = useState({});
  const [students, setStudents] = useState([]);
  const [allstudents, setAllStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");

  const { id } = useParams();

  const API = "https://682199fa259dad2655afc100.mockapi.io/usersapi";

  useEffect(() => {
    axios.get(API).then((res) => {
      const filterStudents = res.data.filter((user) => {
        return user.type == "Student";
      });
      setAllStudents(filterStudents);
    });
  }, []);

  useEffect(() => {
    axios.get(`${API}/${id}`).then((res) => {
      setData(res.data);
      setStudents(res.data.students);
    });
  }, []);

  const addStudent = () => {
    if (selectedStudent == "") {
      return;
    }

    const studentData = allstudents.find((student) => {
      return student.id == selectedStudent;
    });

    // the students group
    const selectedStudents = [...students, studentData];

    selectedStudents.forEach((student) => {
      
      axios
        .put(`${API}/${student.id}`, {
          username: student.username,
          email: student.email,
          password: student.password,
          type: student.userType,
          idea: student.idea,
          students: [...students, studentData],
          ideaStatus: {
            status: student.ideaStatus.status,
            text: student.ideaStatus.text,
          },
          instructor: data,
        })
        .then((res) => {
          console.log("here")
          console.log(res.data);
        });
    });

    axios
      .put(`${API}/${id}`, {
        username: data.username,
        email: data.email,
        password: data.password,
        type: data.userType,
        idea: { title: "", text: "" },
        students: [...students, studentData],
        ideaStatus: { status: "", text: "" },
      })
      .then((res) => {
        toast.success("successfully added student");    
        console.log("instructor list:", res.data)  
      });
  };

  return (
    <div className="p-5 h-screen flex justify-center  bg-blue-100">
      <div>
        <ToastContainer position="top-center" reverseOrder={false} />
      </div>
      <div className="flex w-full flex-col lg:flex-row-reverse lg:justify-around gap-10 lg:gap-3 items-center p-3">
        {students.length == 0 ? (
          <h1 className="text-xl">no students yet</h1>
        ) : (
          <div className="bg-white p-3 rounded-xl">
            <h1 className="text-x font-bold">{data.username}' Students:</h1>
            {students.map((student) => (
              <div key={student.id}>{student.username}</div>
            ))}
          </div>
        )}
        <div className="w-full lg:w-1/4 flex justify-center">
          <div className="flex flex-col w-full gap-3 p-3 border-2 rounded-2xl bg-gray-200">
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              <option value="">Select a student</option>
              {allstudents.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.username}
                </option>
              ))}
            </select>
            <button
              onClick={addStudent}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors"
            >
              Add student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupDetails;
