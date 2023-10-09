
import { Route, Routes } from 'react-router-dom'
import InterviewSelection from "./InterviewSelection"
import OpenAI from './openAI'

const AllRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<InterviewSelection/>}> </Route>
        <Route path="/openAI" element={<OpenAI/>}></Route>
    </Routes>
  )
}

export default AllRoute