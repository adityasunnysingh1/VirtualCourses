import { useMemo, useState } from 'react';
import Nav from '../components/Nav_TEMP.jsx'; 
import { BsArrowReturnLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import ai from "../assets/ai_search_icon.png";
import { useSelector } from 'react-redux';
import TiltedCard from '../components/TiltedCard.jsx';

function AllCourses() {
  const navigate = useNavigate();
  const { courseData } = useSelector(state => state.course);
  const [category, setCategory] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(c => c !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const filterCourses = useMemo(() => {
    let courseCopy = courseData?.slice() || [];
    if (category.length > 0) {
      courseCopy = courseCopy.filter(c => category.includes(c.category));
    }
    return courseCopy;
  }, [courseData, category]);

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Nav />
      
      {/* Mobile Filter Button */}
      <button 
        className='fixed top-20 left-4 z-50 bg-white text-black px-3 py-1 rounded md:hidden border-2 border-black cursor-pointer' 
        onClick={() => setIsSidebarVisible(prev => !prev)}
      >
        {isSidebarVisible ? "Hide" : "Show"} Filters
      </button>

      {/* Sidebar */}
      <aside className={`w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 py-[130px] border-r border-gray-200 shadow-md transition-transform duration-300 z-50 ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"} md:block md:translate-x-0`}>
        <h2 className='text-xl font-bold flex items-center justify-center gap-2 text-gray-50 mb-6'>
          <BsArrowReturnLeft className='text-white cursor-pointer' onClick={() => navigate("/")} />
          Filter by Categories
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className='space-y-4 text-sm bg-gray-600 border-white text-[white] border p-[20px] rounded-2xl'>
          <button className='px-[10px] py-[10px] bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer w-full' onClick={() => navigate("/search")}>
            Search with AI
            <img src={ai} className='w-[30px] h-[30px] rounded-full' alt='' />
          </button>

          {/* Categories */}
          {["App Development", "AI/ML", "AI Tools", "Data Science", "Data Analytics", "Ethical Hacking", "UI/UX Designing", "Web Development", "Others"].map((cat) => (
            <label key={cat} className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
              <input type='checkbox' className='accent-black w-4 h-4 rounded-md' onChange={toggleCategory} value={cat} />
              {cat}
            </label>
          ))}
        </form>
      </aside>

      {/* Main Content Grid */}
      <main className='w-full transition-all duration-300 py-[130px] md:pl-[300px] flex items-start justify-center md:justify-start flex-wrap gap-8 px-[20px]'>
        {filterCourses?.map((course, index) => (
          <div key={course._id || index} className="cursor-pointer" onClick={() => navigate(`/course/${course._id}`)}>
            <TiltedCard
              imageSrc={course.thumbnail}
              altText={course.title}
              captionText={course.title}
              containerHeight="320px"
              containerWidth="320px"
              imageHeight="320px"
              imageWidth="320px"
              rotateAmplitude={12}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip={false} // Tooltip off since we have the overlay
              displayOverlayContent={true}
              overlayContent={
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100 flex flex-col gap-1">
                  <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{course.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">{course.category}</span>
                    <span className="font-bold text-green-600">₹{course.price}</span>
                  </div>
                </div>
              }
            />
          </div>
        ))}
      </main>
    </div>
  );
}

export default AllCourses;