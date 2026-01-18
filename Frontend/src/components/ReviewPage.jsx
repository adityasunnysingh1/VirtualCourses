import { useSelector } from "react-redux";
import ReviewCard from "./ReviewCard.jsx";
import LiquidEther from "./LiquidEther.jsx"; // 👈 Import the background

function ReviewPage() {
  const { reviewData } = useSelector((state) => state.review);
  const latestReview = reviewData?.slice(0, 6) || [];

  return (
    // 1. MAIN CONTAINER (Relative, Overflow Hidden, White Background)
    <div className="relative w-full min-h-screen overflow-hidden bg-white">
      
      {/* 2. BACKGROUND LAYER (Absolute & Z-0) */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={['#ffffff', '#f3f4f6', '#e0f2fe']} // White/Gray/Pale Blue Theme
          mouseForce={31}
          cursorSize={95}
          viscous={22}
          iterationsPoisson={41}
          autoSpeed={0.3}
          autoIntensity={2.6}
          isViscous={true}
        />
      </div>

      {/* 3. CONTENT LAYER (Relative & Z-10) */}
      <div className="relative z-10 flex items-center justify-center flex-col w-full h-full py-10">
        
        <h1 className="md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-[20px] text-gray-900">
          Real Reviews for real courses
        </h1>
        
        <span className="lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] mb-[30px] px-[20px] text-gray-600">
          Discover how our Virtual Courses is transforming learning experiences
          through real feedback from students and professionals worldwide.
        </span>
        
        <div className="w-full flex items-center justify-center flex-wrap gap-[50px] lg:p-[50px] md:p-[30px] p-[10px] mb-[40px]">
          {latestReview?.map((review, index) => (
            <ReviewCard
              key={index}
              comment={review.comment}
              rating={review.rating}
              photoUrl={review.user.photoUrl}
              courseTitle={review.course.title}
              name={review.user.name}
              description={review.user.description}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default ReviewPage;