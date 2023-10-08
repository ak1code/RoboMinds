
import './App.css'
import AllRoute from './Componant/AllRoute'
import InterviewSelection from './Componant/InterviewSelection'
import InterviewSimulation from './Componant/InterviewSimulation'
import Robot from './Componant/Robot'
import OpenAI from './Componant/openAI'


function App() {
  

  return (
    <>
      <AllRoute/>
        {/* <InterviewSimulation interviewType="MERN" />
        <InterviewSelection /> */}
       {/* <OpenAI/> */}
       <Robot/>
    </>
  )
}

export default App
