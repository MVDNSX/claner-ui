import {BrowserRouter, Routes, Route} from 'react-router-dom'
import JoinPage from '../pages/JoinPage'
import MemberPage from '../pages/MemberPage'
import OfficerPage from '../pages/OfficerPage'
import ErrorPage from '../pages/ErrorPage'


const AppRouter = ({route}) => {
  return (
    <BrowserRouter>
      <Routes>
        {route === 'join' && <Route path='*' element={<JoinPage/>}/>}
        {route === 'member' && <Route path='*' element={<MemberPage/>}/>}
        {route === 'officer' && <Route path='*' element={<OfficerPage/>}/>}
        {route === 'error' && <Route path='*' element={<ErrorPage/>}/>}
      </Routes>
    </BrowserRouter>
  )
}