import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App.jsx';
import { setUserData } from '../redux/userSlice.js';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import Iridescence from '../components/Iridescence.jsx';

const EditProfileForm = ({ initialData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState(initialData.name || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEditProfile = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (photoUrl) {
        formData.append("photoUrl", photoUrl);
      }

      const config = {
        withCredentials: true,
      };

      const result = await axios.post(
        `${serverUrl}/api/user/profile`,
        formData,
        config
      );

      dispatch(setUserData(result.data));
      setLoading(false);
      navigate("/profile");
      toast.success("Profile Updated Successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className='relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4 py-10'>

      <div className='relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 max-w-xl w-full text-white'>
        <div className="absolute inset-0 z-0">
        <Iridescence 
          color={[0.1, 0.1, 0.1]} 
          mouseReact={false} 
          amplitude={0.1} 
          speed={1.0} 
        />
      </div>
        <BsArrowReturnLeft 
            className="absolute top-[5%] left-[5%] w-[22px] h-[22px] cursor-pointer text-gray-300 hover:text-white transition" 
            onClick={() => navigate("/profile")} 
        />
        
        <h2 className='text-2xl font-bold text-center mb-6 text-white'>Edit Profile</h2>
        
        <form className='space-y-5' onSubmit={(e) => e.preventDefault()}>
          
          <div className='flex flex-col items-center text-center'>
            {initialData.photoUrl ? (
              <img
                src={initialData.photoUrl}
                className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-lg"
                alt="profile"
              />
            ) : (
              <div className="w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-blue-600 border-white/20 shadow-lg">
                {initialData.name?.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="image" className='text-sm font-medium text-gray-300'>Select Avatar</label>
            <input 
                id='image' 
                type='file' 
                accept='image/*'
                className='w-full px-4 py-2 mt-1 border border-white/10 rounded-md text-sm bg-white/5 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500' 
                onChange={(e) => setPhotoUrl(e.target.files[0])} 
            />
          </div>

          <div>
            <label htmlFor="name" className='text-sm font-medium text-gray-300'>UserName</label>
            <input 
                id='name' 
                type='text'
                className='w-full px-4 py-2 mt-1 border border-white/10 rounded-md text-sm bg-white/5 text-white focus:outline-none focus:border-blue-500' 
                onChange={(e) => setName(e.target.value)} 
                value={name} 
            />
          </div>

          <div>
            <label className='text-sm font-medium text-gray-300'>Email</label>
            <input 
                readOnly 
                type='text' 
                value={initialData.email}
                className='w-full px-4 py-2 mt-1 border border-white/10 rounded-md text-sm bg-white/10 text-gray-400 cursor-not-allowed' 
            />
          </div>

          <div>
            <label className='text-sm font-medium text-gray-300'>Bio</label>
            <textarea 
                placeholder="Tell us about yourself" 
                rows={3}
                className='w-full mt-1 px-4 py-2 border border-white/10 rounded-md resize-none bg-white/5 text-white focus:outline-none focus:border-blue-500' 
                onChange={(e) => setDescription(e.target.value)} 
                value={description} 
            />
          </div>

          <button 
            className='w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-md font-semibold transition cursor-pointer shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed' 
            disabled={loading} 
            onClick={handleEditProfile}
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Save Changes"}
          </button>

        </form>
      </div>
    </div>
  );
};

function EditProfile() {
  const { userData } = useSelector(state => state.user);

  if (!userData) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-black'>
         <ClipLoader size={50} color="white"/>
      </div>
    );
  }

  return <EditProfileForm initialData={userData} key={userData._id || 'edit-form'} />;
}

export default EditProfile;