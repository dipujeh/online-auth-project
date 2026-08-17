import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});

  const greeting = () => {
    const hours = new Date().getHours();

    if (hours < 12) {
      return "Good Morning";
    } else if (hours < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  greeting();
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8007/api/getdata", {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8007/api/logout",
        {},
        { withCredentials: true },
      );
      toast.success(response?.data?.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="w-full text-white min-h-screen bg-[#090713] px-16 py-8">
      <div className="relative flex justify-end items-center">
        {/* Avatar */}
        <div
          className="w-12 h-12 rounded-full border-2 bg-purple-600 border-amber-100  text-white flex justify-center items-center text-xl cursor-pointer"
          onClick={() => setOpen(!open)}
        >
         {user.firstName[0]}
        </div>

        {/* Dropdown */}
        <div
          className={`absolute top-16 right-0 w-45 bg-[#150F2A] rounded-xl shadow-lg  p-2  transition-all duration-300 ${
            open
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }}`}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="">
            <p className="capitalize font-medium text-lg">{`${user.firstName} ${user.lastName}`}</p>
            <p className="font-light">{user.email}</p>
          </div>
          <div className="border-b-1 my-4 border-gray-500"></div>
          <p className="px-3 py-2 rounded-lg  hover:bg-[#090713] cursor-pointer">
            Profile
          </p>

          <button
            className="w-full text-left px-3 py-2 rounded-lg text-red-500 hover:bg-[#090713] cursor-pointer"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </div>

      <div>
        <h1 className="text-center text-4xl font-bold">{greeting()}, <span className="capitalize text-purple-600">{user.firstName}</span> 👋</h1>
      </div>
    </div>
  );
};

export default Dashboard;
