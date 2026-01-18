import { useSelector } from "react-redux";
import Card from "./Card.jsx";
import LiquidEther from "./LiquidEther.jsx"; 

function CardPage() {
  const { courseData } = useSelector((state) => state.course);
  const popularCourses = courseData?.slice(0, 6) || [];

  return (
    // 1. MAIN CONTAINER (Relative, Overflow Hidden, White Background)
    <div className="relative w-full overflow-hidden bg-white">
      
      {/* 2. BACKGROUND LAYER (Absolute & Z-0) */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={['#ffffff', '#f3f4f6', '#e0f2fe']}
          mouseForce={31}
          cursorSize={95}
          viscous={22}
          iterationsPoisson={41}
          autoSpeed={0.3}
          autoIntensity={2.6}
          isViscous={true} 
        />
      </div>

      {/* 3. CONTENT LAYER (Relative & Z-10) - Keeps content clickable */}
      <div className="relative z-10 flex items-center justify-center flex-col w-full h-full">
        
        <h1 className="md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-[20px] text-gray-900">
          Our Popular Courses
        </h1>
        
        <span className="lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] mb-[30px] px-[20px] text-gray-600">
          Explore top rated courses designed to boost your skills, enhance
          careers, and unlock opportunities in tech, AI, businesses, and beyond.
        </span>
        
        <div className="w-full flex items-center justify-center flex-wrap gap-[50px] lg:p-[50px] md:p-[30px] p-[10px] mb-[40px]">
          {popularCourses?.map((course, index) => (
            <Card
              key={index}
              thumbnail={course.thumbnail}
              title={course.title}
              category={course.category}
              price={course.price}
              id={course._id}
              reviews={course.reviews}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default CardPage;