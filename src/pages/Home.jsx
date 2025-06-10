import Instructor from "./instructor/Instructor";
import Student from "./student/Student";

function Home() {

  const username = localStorage.getItem("username");
  const userType = localStorage.getItem("userType");

  // admin reroute
  return username ? (
    <div>
      {(userType == "Student") ? <Student/> : <Instructor/>}
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen bg-blue-50">
      <h1 className="text-2xl lg:text-3xl font-bold">you must log in to view this page</h1>
    </div>
  );
}

export default Home;
