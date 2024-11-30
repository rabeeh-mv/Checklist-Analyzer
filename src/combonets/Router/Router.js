import React from 'react'
import { Routes, Route  } from 'react-router-dom'
import LandingPage from '../landing page/Lnding'
import ChecklistAnalyzer from '../Checklist/ChecklistAnalyzer'
import ContactPage from '../ContactPage/Contact'
import Errpage from './Errpage'

const Router = () => {
  return (
    <Routes>
        <Route path='/' exact Component={LandingPage}/>
        <Route path='/Checklist' Component={ChecklistAnalyzer}/>
        <Route path='/Contact' Component={ContactPage}/>
        <Route path='*' Component={Errpage}/>
    </Routes>
  )
}

export default Router
