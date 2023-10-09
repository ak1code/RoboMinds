
import { useNavigate } from "react-router-dom";
import "./just.css"
import Robot from "./Robot";

function InterviewSelection() {
  const navigate=useNavigate()
  return (
    <>
   
    <div className="h-1/2 w-1/3 left-1/3 bg-gray-100 absolute transform  flex items-center justify-center  msg-icn" style={{ zIndex: 2}}>
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Choose Your Interview Type</h2>
        <div className="flex space-x-4">
          <button onClick={()=>navigate("/openAI")} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" style={{ zIndex: 3 }}>
            MERN
          </button>
          <button onClick={()=>navigate("/openAI")} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" style={{ zIndex: 3 }}>
            Node.js
          </button>
          <button onClick={()=>navigate("/openAI")} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600" style={{ zIndex: 3 }}>
            Java
          </button>
        </div>
      </div>
       
    </div>
    <Robot/>
    </>
  );
}

export default InterviewSelection;
