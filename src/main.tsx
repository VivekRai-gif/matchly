import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import { RecruiterDashboard } from './pages/RecruiterDashboard.tsx'
import { ResumeMatching } from './pages/ResumeMatching.tsx'
import { ATSCompatibility } from './pages/ATSCompatibility.tsx'
import { EmailCampaigns } from './pages/EmailCampaigns.tsx'
import AIFeatures from './pages/AIFeatures.tsx'
import { CandidateIntelligence } from './pages/CandidateIntelligence.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/candidate-intelligence" element={<CandidateIntelligence />} />
        <Route path="/features/application-tracker" element={<RecruiterDashboard />} />
        <Route path="/features/resume-matching" element={<ResumeMatching />} />
        <Route path="/features/ats-compatibility" element={<ATSCompatibility />} />
        <Route path="/features/email-campaigns" element={<EmailCampaigns />} />
        <Route path="/features/ai-features" element={<AIFeatures />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
