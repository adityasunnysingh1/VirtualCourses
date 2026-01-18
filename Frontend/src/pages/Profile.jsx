import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsArrowReturnLeft } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import { setUserData } from "../redux/userSlice.js";
import { serverUrl } from "../App.jsx";
import Iridescence from "../components/Iridescence";

function Profile() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(`${serverUrl}/api/auth/logOut`, {}, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout Failed");
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h2 className="text-xl font-bold text-white">Loading Profile...</h2>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen px-4 py-10 flex items-center justify-center bg-black overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <Iridescence 
          color={[0.1, 0.1, 0.1]} 
          mouseReact={false} 
          amplitude={0.1} 
          speed={1.0} 
        />
      </div>

      <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-8 max-w-xl w-full text-white">
        
        <BsArrowReturnLeft
          className="absolute top-[8%] left-[5%] w-[22px] h-[22px] cursor-pointer hover:scale-110 transition text-gray-300 hover:text-white"
          onClick={() => navigate("/")}
          title="Go Back"
        />

        <div className="flex flex-col items-center text-center">
          {userData?.photoUrl ? (
            <img
              src={userData?.photoUrl}
              className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-lg"
              alt="Profile"
            />
          ) : (
            <div
              className="w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-blue-600 border-white/20 shadow-lg"
            >
              {userData?.name?.slice(0, 1).toUpperCase()}
            </div>
          )}

          <h2 className="text-2xl font-bold mt-4 text-white">
            {userData?.name}
          </h2>
          <p className="text-sm text-gray-400 capitalize">{userData?.role}</p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="text-sm flex items-center justify-start gap-1 border-b border-white/10 pb-2">
            <span className="font-semibold text-gray-300">Email:</span>
            <span className="text-gray-100">{userData?.email}</span>
          </div>
          <div className="text-sm flex items-center justify-start gap-1 border-b border-white/10 pb-2">
            <span className="font-semibold text-gray-300">Bio:</span>
            <span className="text-gray-100">{userData?.description || "No bio available"}</span>
          </div>
          <div className="text-sm flex items-center justify-start gap-1">
            <span className="font-semibold text-gray-300">Enrolled Courses:</span>
            <span className="text-gray-100">{userData?.enrolledCourses?.length || 0}</span>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium
          hover:bg-blue-500 cursor-pointer transition shadow-lg shadow-blue-500/20"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </button>
          
          <button
            className="px-6 py-2 rounded-lg bg-red-600 text-white font-medium
          hover:bg-red-500 cursor-pointer transition shadow-lg shadow-red-500/20"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;