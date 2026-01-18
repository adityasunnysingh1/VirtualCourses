import about from "../assets/ai_student.png";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { BsPatchCheckFill } from "react-icons/bs";
import video from "../assets/Modified_Video_With_More_Texts.mp4";
import LiquidEther from "./LiquidEther.jsx";

function About() {
  return (
    // 1. MAIN CONTAINER (Relative, Overflow Hidden, White Background)
    <div className="relative w-full lg:h-[70vh] min-h-[50vh] bg-white overflow-hidden">
      
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
      <div className="relative z-10 w-full h-full flex flex-wrap items-center justify-center gap-2 mb-[30px] py-10 lg:py-0">
        
        {/* For Image area */}
        <div className="lg:w-[40%] md:w-[80%] w-full h-full flex items-center justify-center relative">
          <img src={about} alt="About Student" className="w-[80%] h-[90%] rounded-lg object-cover" />
          <div className="max-w-[350px] mx-auto p-4 absolute top-[55%] left-[50%] transform -translate-x-1/2">
            <video
              src={video}
              className="w-full rounded-xl shadow-lg border-2 border-white"
              controls
              autoPlay
              muted
              loop
            />
          </div>
        </div>

        {/* For about info */}
        <div className="lg:w-[50%] md:w-[70%] w-full h-full flex items-start justify-center flex-col px-[35px] md:px-[80px]">
          
          <div className="flex text-[20px] items-center justify-center gap-[20px] text-gray-800">
            About Us
            <TfiLayoutLineSolid className="w-[40px] h-[40px]" />
          </div>

          <div className="md:text-[45px] text-[35px] font-semibold text-gray-900 mt-2">
            We are maximizing your learning growth
          </div>

          <div className="text-[15px] text-gray-600 mt-4">
            We provide a modern Learning Management System to simplify online
            education, track progress, and enhance student-instructor
            collaboration efficiently.
          </div>

          <div className="w-full lg:w-[60%] text-gray-800">
            <div className="flex items-center justify-between mt-[40px]">
              <div className="flex items-center justify-center gap-[10px]">
                <BsPatchCheckFill className="w-[20px] h-[20px] text-blue-600" />Simplified Learning
              </div>
              <div className="flex items-center justify-center gap-[10px]">
                <BsPatchCheckFill className="w-[20px] h-[20px] text-blue-600" />Expert Trainers
              </div>
            </div>
            <div className="flex items-center justify-between mt-[40px]">
              <div className="flex items-center justify-center gap-[10px]">
                <BsPatchCheckFill className="w-[20px] h-[20px] text-blue-600" />Big Experience
              </div>
              <div className="flex items-center justify-center gap-[10px]">
                <BsPatchCheckFill className="w-[20px] h-[20px] text-blue-600" />Lifetime Access
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default About;