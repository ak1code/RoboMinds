
import { useNavigate } from "react-router-dom";

function InterviewSelection() {
  const navigate=useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Choose Your Interview Type</h2>
        <div className="flex space-x-4">
          <button onClick={()=>navigate("/openAI")} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            MERN
          </button>
          <button onClick={()=>navigate("/openAI")} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Node.js
          </button>
          <button onClick={()=>navigate("/openAI")} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
            Java
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterviewSelection;
