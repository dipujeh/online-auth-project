import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [loder,setLoder] = useState(false);

    const loginHandler = async(e)=>{
      e.preventDefault();
      setLoder(true);
      try {
        const response = await axios.post("https://online-auth-project.onrender.com/api/login",{
          email,
          password
        },
        {withCredentials:true}
      )
       toast.success(response?.data?.message);
       navigate('/dashboard');
        
      } catch (error) {
        toast.error(error.response?.data?.message);
      }finally{
        setLoder(false)
      }
    }

  return (
    <div className="w-full min-h-screen bg-gray-200 flex justify-center items-center">
      <form
        className="w-87.5 h-100  flex flex-col gap-4  rounded-xl bg-white px-8 py-2"

        onSubmit={loginHandler}
      >
        <h2 className="text-center font-medium text-2xl mt-4 text-[#283346]">
          Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          required
          className=" border border-gray-400 text-gray-900 w-full px-3 rounded-lg outline-none py-2 "
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className=" border border-gray-400 text-gray-900 w-full px-3 rounded-lg outline-none py-2 "

          onChange={(e)=>setPassword(e.target.value)}
          value={password}

        />
        <button
          type="submit"
          className="bg-amber-200 py-4 cursor-pointer rounded-lg"
        >
          {loder?"Loggin in...":"Login"}
        </button>
        <p className="text-center">
          Does't have an account?
          <span
            className="cursor-pointer hover:underline text-blue-500"
            onClick={()=>navigate('/signup')}
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
