import React, { useState } from 'react';
import { 
  Shield, 
  Award, 
  Eye, 
  Lock, 
  CheckCircle, 
  AlertTriangle, 
  Upload,
  TrendingUp
} from 'lucide-react';

const AIFeatures: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState<'skills' | 'bias' | 'matching' | 'privacy'>('skills');
  
  // Results state
  const [skillsResult, setSkillsResult] = useState<any>(null);
  const [biasResult, setBiasResult] = useState<any>(null);
  const [matchResult, setMatchResult] = useState<any>(null);
  const [privacyResult, setPrivacyResult] = useState<any>(null);

  const switchFeature = (feature: 'skills' | 'bias' | 'matching' | 'privacy') => {
    setActiveFeature(feature);
    // Scroll to top of page smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSkillVerification = async () => {
    if (!selectedFile) {
      alert('Please upload a resume first');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('resume', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/api/skills/extract', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setSkillsResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to extract skills');
    } finally {
      setLoading(false);
    }
  };

  const handleBiasDetection = async () => {
    if (!selectedFile || !jobDescription) {
      alert('Please upload a resume and enter job description');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('resume', selectedFile);
    formData.append('jobDescription', jobDescription);

    try {
      const response = await fetch('http://localhost:5000/api/bias/fair-evaluation', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setBiasResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to perform bias analysis');
    } finally {
      setLoading(false);
    }
  };

  const handleTransparentMatching = async () => {
    if (!selectedFile || !jobDescription) {
      alert('Please upload a resume and enter job description');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('resume', selectedFile);
    formData.append('jobDescription', jobDescription);

    try {
      const response = await fetch('http://localhost:5000/api/match/transparent', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setMatchResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to perform matching');
    } finally {
      setLoading(false);
    }
  };

  const handlePrivacyCheck = async () => {
    if (!selectedFile) {
      alert('Please upload a resume first');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('resume', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/api/privacy/report', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setPrivacyResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate privacy report');
    } finally {
      setLoading(false);
    }
  };

  const renderSkillsResults = () => {
    if (!skillsResult || !skillsResult.success) return null;

    const skills = skillsResult.skills;
    return (
      <div className="mt-6 space-y-4">
        <div className="glass-strong rounded-2xl p-6 border-l-4 border-blue-500">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-400" />
            Skills Extracted Successfully
          </h3>
          
          {skills.technical_skills && skills.technical_skills.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-300 mb-3">Technical Skills:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {skills.technical_skills.slice(0, 10).map((skill: any, idx: number) => (
                  <div key={idx} className="glass rounded-xl p-4 border border-white/10 hover:border-blue-500/50 smooth-transition">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white">{skill.skill}</span>
                      {skill.evidence_found && <CheckCircle className="w-5 h-5 text-green-400" />}
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      {skill.category} • {skill.proficiency_level}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills.certifications && skills.certifications.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-300 mb-3">Certifications:</h4>
              <div className="flex flex-wrap gap-2">
                {skills.certifications.map((cert: string, idx: number) => (
                  <span key={idx} className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    <Award className="w-3 h-3 inline mr-1" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="text-sm text-gray-300 mt-4 pt-4 border-t border-white/10">
            Total Skills Found: <span className="font-bold text-blue-400">{skills.total_skills_count}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderBiasResults = () => {
    if (!biasResult || !biasResult.success) return null;

    const fairEval = biasResult.fair_evaluation;
    return (
      <div className="mt-6 space-y-4">
        <div className="glass-strong rounded-2xl p-6 border-l-4 border-purple-500">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-purple-400" />
            Bias-Free Evaluation
          </h3>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-300 font-medium">Merit Score:</span>
              <span className="text-3xl font-bold text-purple-400">{fairEval.merit_score}/100</span>
            </div>
            <div className="bg-white/10 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500 shadow-lg"
                style={{ width: `${fairEval.merit_score}%` }}
              ></div>
            </div>
          </div>

          {fairEval.strengths && fairEval.strengths.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-300 mb-3">Strengths:</h4>
              <ul className="space-y-2">
                {fairEval.strengths.map((strength: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-300 glass rounded-lg p-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {biasResult.masked_attributes && biasResult.masked_attributes.length > 0 && (
            <div className="glass rounded-xl p-4 border border-purple-500/30">
              <p className="text-sm text-gray-300">
                <Shield className="w-5 h-5 inline mr-2 text-purple-400" />
                Personal attributes masked: <span className="text-purple-300 font-semibold">{biasResult.masked_attributes.join(', ')}</span>
              </p>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-white/10 text-sm text-gray-300">
            Recommendation: <span className="font-bold text-purple-400">{fairEval.recommendation?.replace('_', ' ')}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderMatchResults = () => {
    if (!matchResult || !matchResult.success) return null;

    const match = matchResult.transparent_match;
    return (
      <div className="mt-6 space-y-4">
        <div className="glass-strong rounded-2xl p-6 border-l-4 border-green-500">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Eye className="w-6 h-6 text-green-400" />
            Transparent Match Analysis
          </h3>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-300 font-medium">Overall Match Score:</span>
              <span className="text-4xl font-bold text-green-400">{match.overall_match_score}/100</span>
            </div>
            <div className="bg-white/10 rounded-full h-5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-500 to-teal-500 h-full transition-all duration-500 shadow-lg"
                style={{ width: `${match.overall_match_score}%` }}
              ></div>
            </div>
          </div>

          <div className="glass rounded-xl p-5 border border-green-500/30 mb-6">
            <h4 className="font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-400" />
              Transparency Statement:
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              {match.transparency_statement}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {match.skill_alignment && (
              <div className="glass rounded-xl p-4 border border-white/10 hover:border-green-500/50 smooth-transition">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">Skill Alignment</span>
                  <span className="text-xl font-bold text-green-400">{match.skill_alignment.score}%</span>
                </div>
                <p className="text-xs text-gray-400">{match.skill_alignment.explanation?.substring(0, 100)}...</p>
              </div>
            )}

            {match.experience_alignment && (
              <div className="glass rounded-xl p-4 border border-white/10 hover:border-green-500/50 smooth-transition">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">Experience Alignment</span>
                  <span className="text-xl font-bold text-green-400">{match.experience_alignment.score}%</span>
                </div>
                <p className="text-xs text-gray-400">{match.experience_alignment.explanation?.substring(0, 100)}...</p>
              </div>
            )}
          </div>

          {match.strengths && match.strengths.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-300 mb-3">Top Strengths:</h4>
              <div className="space-y-3">
                {match.strengths.slice(0, 3).map((item: any, idx: number) => (
                  <div key={idx} className="glass rounded-xl p-4 border border-green-500/30">
                    <p className="text-sm font-medium text-green-400">{item.strength}</p>
                    <p className="text-xs text-gray-400 mt-2">{item.value_to_role}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {match.concerns && match.concerns.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-300 mb-3">Areas of Concern:</h4>
              <div className="space-y-3">
                {match.concerns.slice(0, 3).map((item: any, idx: number) => (
                  <div key={idx} className="glass rounded-xl p-4 border border-yellow-500/30">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-yellow-400">{item.concern}</p>
                        <p className="text-xs text-gray-400 mt-2">Severity: {item.severity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="glass rounded-xl p-4 border border-green-500/30">
            <p className="text-sm text-gray-300">
              <strong className="text-green-400">Next Step:</strong> {match.next_steps?.recommendation?.replace('_', ' ')} - {match.next_steps?.reasoning}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderPrivacyResults = () => {
    if (!privacyResult || !privacyResult.success) return null;

    const report = privacyResult.privacy_report;
    return (
      <div className="mt-6 space-y-4">
        <div className="glass-strong rounded-2xl p-6 border-l-4 border-gray-500">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6 text-gray-400" />
            Privacy Analysis Report
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="glass rounded-xl p-4 border border-white/10">
              <p className="text-xs text-gray-400 mb-2">PII Detected</p>
              <p className="text-xl font-bold text-white">
                {report.pii_detected ? (
                  <span className="text-yellow-400">Yes ⚠️</span>
                ) : (
                  <span className="text-green-400">No ✅</span>
                )}
              </p>
            </div>
            <div className="glass rounded-xl p-4 border border-white/10">
              <p className="text-xs text-gray-400 mb-2">Risk Level</p>
              <p className={`text-xl font-bold ${
                report.privacy_risk_level === 'high' ? 'text-red-400' :
                report.privacy_risk_level === 'medium' ? 'text-yellow-400' :
                'text-green-400'
              }`}>
                {report.privacy_risk_level.toUpperCase()}
              </p>
            </div>
          </div>

          {report.pii_types_found && report.pii_types_found.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-300 mb-3">PII Types Found:</h4>
              <div className="flex flex-wrap gap-2">
                {report.pii_types_found.map((type: string, idx: number) => (
                  <span key={idx} className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          )}

          {report.recommendations && report.recommendations.length > 0 && (
            <div className="glass rounded-xl p-5 border border-gray-500/30">
              <h4 className="font-semibold text-gray-300 mb-3">Privacy Recommendations:</h4>
              <ul className="space-y-3">
                {report.recommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="text-sm text-gray-300 flex items-start gap-3">
                    <Lock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950/10 to-black py-32 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-10/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-30/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <div className="w-2 h-2 bg-primary-10 rounded-full animate-pulse" />
            <span className="text-sm text-primary-10 font-semibold">Powered by Google Gemini AI</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            AI-Powered <span className="text-gradient">Features</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Enterprise-Grade Analysis • Transparent AI • Privacy-First
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <button
            onClick={() => switchFeature('skills')}
            className={`p-6 rounded-2xl smooth-transition group ${
              activeFeature === 'skills'
                ? 'glass-strong border-blue-500 shadow-2xl shadow-blue-500/20'
                : 'glass hover:glass-strong hover:border-blue-500/30'
            }`}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 smooth-transition">
              <Award className="w-7 h-7 text-white" />
            </div>
            <p className="font-semibold text-sm text-white">Skill Verification</p>
          </button>

          <button
            onClick={() => switchFeature('bias')}
            className={`p-6 rounded-2xl smooth-transition group ${
              activeFeature === 'bias'
                ? 'glass-strong border-purple-500 shadow-2xl shadow-purple-500/20'
                : 'glass hover:glass-strong hover:border-purple-500/30'
            }`}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 smooth-transition">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <p className="font-semibold text-sm text-white">Bias Detection</p>
          </button>

          <button
            onClick={() => switchFeature('matching')}
            className={`p-6 rounded-2xl smooth-transition group ${
              activeFeature === 'matching'
                ? 'glass-strong border-green-500 shadow-2xl shadow-green-500/20'
                : 'glass hover:glass-strong hover:border-green-500/30'
            }`}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 smooth-transition">
              <Eye className="w-7 h-7 text-white" />
            </div>
            <p className="font-semibold text-sm text-white">Transparent Match</p>
          </button>

          <button
            onClick={() => switchFeature('privacy')}
            className={`p-6 rounded-2xl smooth-transition group ${
              activeFeature === 'privacy'
                ? 'glass-strong border-gray-400 shadow-2xl shadow-gray-500/20'
                : 'glass hover:glass-strong hover:border-gray-500/30'
            }`}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 smooth-transition">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <p className="font-semibold text-sm text-white">Privacy Check</p>
          </button>
        </div>

        {/* Main Content */}
        <div className="glass-strong rounded-3xl p-8 md:p-12">
          {/* File Upload Section */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Upload Resume
            </label>
            <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-primary-10/50 hover:bg-white/[0.03] smooth-transition group">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.docx,.txt"
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <Upload className="w-14 h-14 mx-auto mb-3 text-primary-10 group-hover:scale-110 smooth-transition" />
                <p className="text-sm text-gray-300">
                  {selectedFile ? (
                    <span className="text-primary-10 font-semibold">{selectedFile.name}</span>
                  ) : (
                    'Click to upload resume (PDF, DOCX, TXT)'
                  )}
                </p>
              </label>
            </div>
          </div>

          {/* Job Description (for matching and bias features) */}
          {(activeFeature === 'bias' || activeFeature === 'matching') && (
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Job Description
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full p-4 glass rounded-2xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-10 focus:border-primary-10 smooth-transition"
                rows={6}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            {activeFeature === 'skills' && (
              <button
                onClick={handleSkillVerification}
                disabled={loading || !selectedFile}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-2xl font-bold hover:from-blue-700 hover:to-blue-800 disabled:opacity-40 disabled:cursor-not-allowed smooth-transition hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/30 flex items-center justify-center gap-3"
              >
                {loading ? 'Analyzing...' : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    Verify Skills
                  </>
                )}
              </button>
            )}

            {activeFeature === 'bias' && (
              <button
                onClick={handleBiasDetection}
                disabled={loading || !selectedFile || !jobDescription}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-2xl font-bold hover:from-purple-700 hover:to-pink-700 disabled:opacity-40 disabled:cursor-not-allowed smooth-transition hover:scale-105 hover:shadow-2xl hover:shadow-purple-600/30 flex items-center justify-center gap-3"
              >
                {loading ? 'Analyzing...' : (
                  <>
                    <Shield className="w-5 h-5" />
                    Check for Bias
                  </>
                )}
              </button>
            )}

            {activeFeature === 'matching' && (
              <button
                onClick={handleTransparentMatching}
                disabled={loading || !selectedFile || !jobDescription}
                className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 px-8 rounded-2xl font-bold hover:from-green-700 hover:to-teal-700 disabled:opacity-40 disabled:cursor-not-allowed smooth-transition hover:scale-105 hover:shadow-2xl hover:shadow-green-600/30 flex items-center justify-center gap-3"
              >
                {loading ? 'Matching...' : (
                  <>
                    <Eye className="w-5 h-5" />
                    Transparent Match
                  </>
                )}
              </button>
            )}

            {activeFeature === 'privacy' && (
              <button
                onClick={handlePrivacyCheck}
                disabled={loading || !selectedFile}
                className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 text-white py-4 px-8 rounded-2xl font-bold hover:from-gray-800 hover:to-gray-900 disabled:opacity-40 disabled:cursor-not-allowed smooth-transition hover:scale-105 hover:shadow-2xl hover:shadow-gray-700/30 flex items-center justify-center gap-3"
              >
                {loading ? 'Analyzing...' : (
                  <>
                    <Lock className="w-5 h-5" />
                    Privacy Analysis
                  </>
                )}
              </button>
            )}
          </div>

          {/* Results Section */}
          {activeFeature === 'skills' && renderSkillsResults()}
          {activeFeature === 'bias' && renderBiasResults()}
          {activeFeature === 'matching' && renderMatchResults()}
          {activeFeature === 'privacy' && renderPrivacyResults()}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <button
            onClick={() => switchFeature('skills')}
            className={`glass hover:glass-strong rounded-2xl p-8 text-left smooth-transition hover:translate-y-[-4px] cursor-pointer group ${
              activeFeature === 'skills' ? 'ring-2 ring-blue-500/50 shadow-2xl shadow-blue-500/20' : 'hover:border-blue-500/30'
            }`}
          >
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 smooth-transition shadow-lg">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-white mb-3 group-hover:text-primary-10 smooth-transition">Skill Credentials</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              AI-verified skills with evidence from resume and projects
            </p>
          </button>

          <button
            onClick={() => switchFeature('bias')}
            className={`glass hover:glass-strong rounded-2xl p-8 text-left smooth-transition hover:translate-y-[-4px] cursor-pointer group ${
              activeFeature === 'bias' ? 'ring-2 ring-purple-500/50 shadow-2xl shadow-purple-500/20' : 'hover:border-purple-500/30'
            }`}
          >
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 smooth-transition shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-white mb-3 group-hover:text-primary-10 smooth-transition">Bias Detection</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Fair evaluation with masked personal attributes
            </p>
          </button>

          <button
            onClick={() => switchFeature('matching')}
            className={`glass hover:glass-strong rounded-2xl p-8 text-left smooth-transition hover:translate-y-[-4px] cursor-pointer group ${
              activeFeature === 'matching' ? 'ring-2 ring-green-500/50 shadow-2xl shadow-green-500/20' : 'hover:border-green-500/30'
            }`}
          >
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 smooth-transition shadow-lg">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-white mb-3 group-hover:text-primary-10 smooth-transition">Transparent Matching</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Full explanation of every decision and score
            </p>
          </button>

          <button
            onClick={() => switchFeature('privacy')}
            className={`glass hover:glass-strong rounded-2xl p-8 text-left smooth-transition hover:translate-y-[-4px] cursor-pointer group ${
              activeFeature === 'privacy' ? 'ring-2 ring-gray-500/50 shadow-2xl shadow-gray-500/20' : 'hover:border-gray-500/30'
            }`}
          >
            <div className="w-14 h-14 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 smooth-transition shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-white mb-3 group-hover:text-primary-10 smooth-transition">Privacy-Preserving</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Minimal data processing with PII masking
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIFeatures;
