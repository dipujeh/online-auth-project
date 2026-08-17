import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

import user from "../assets/dp.jpg";



const Signup = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [frontendImg,setFrontendImg] = useState(user)
  const [backendImg,setBackendImg] = useState(null);

  const singupHandler = async (e) => {
    e.preventDefault();
    try {
          const formData = new FormData();
          formData.append("firstName",firstName)
          formData.append("lastName",lastName)
          formData.append("course",course)
          formData.append("email",email)
          formData.append("password",password)
          formData.append("profileImg",backendImg)
          
      const response = await axios.post(
        "http://localhost:8007/api/signup",
        formData,
        { withCredentials: true },
      );

      setFirstName("");
      setLastName("");
      setCourse("");
      setEmail("");
      setPassword("");

      toast.success(response.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const imageHandler = (e)=>{
      
    // console.log(e.target.files[0]);

    const file = e.target.files[0];

    setBackendImg(file)

    let imageUrl = URL.createObjectURL(file)

    setFrontendImg(imageUrl);
    
      
  }

  return (
    <div className="w-full min-h-screen bg-gray-200 flex justify-center items-center">
      <form
        className="w-87.5 h-140  flex flex-col gap-4  rounded-xl bg-white px-8 py-2 "
        onSubmit={singupHandler}
      >
        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-center font-medium text-2xl mt-4 text-[#283346]">
            Signup
          </h2>
          <div className="w-20 h-20 relative border rounded-full flex justify-center items-center overflow-hidden">
            <img
              src={frontendImg}
              alt="user"
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => inputRef.current.click()}
            />
            <input type="file" className="hidden" accept="image/*" ref={inputRef} onChange={imageHandler}/>
          </div>
        </div>
        <div className="w-full flex  gap-2">
          <input
            type="text"
            placeholder="First Name"
            required
            className=" border border-gray-400 text-gray-900 w-full px-3 rounded-lg outline-none py-2 "
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <input
            type="text"
            placeholder="Last Name"
            required
            className=" border border-gray-400 text-gray-900 w-full px-3 rounded-lg outline-none py-2 "
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
        <select
          className=" border cursor-pointer border-gray-400 text-gray-900 w-full px-3 rounded-lg outline-none py-2 "
          required
          onChange={(e) => setCourse(e.target.value)}
          value={course}
        >
          <option value="" className="text-gray-400">
            Select Course
          </option>
          <option value="BCA">BCA</option>
          <option value="MCA">MCA</option>
          <option value="BTech CSE">BTech CSE</option>
          <option value="MTech">MTech</option>
          <option value="BBA">BBA</option>
        </select>
        <input
          type="email"
          placeholder="Email"
          required
          className=" border border-gray-400 text-gray-900 w-full px-3 rounded-lg outline-none py-2 "
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className=" border border-gray-400 text-gray-900 w-full px-3 rounded-lg outline-none py-2 "
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          type="submit"
          className="bg-amber-200 py-4 cursor-pointer rounded-lg"
        >
          Signup
        </button>
        <p className="text-center">
          Already have an account?
          <span
            className="cursor-pointer hover:underline text-blue-500"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
