import { motion } from 'framer-motion';
import { FileCheck, Shield, Scan, AlertCircle, CheckCircle2, FileText, ArrowLeft, Upload, Loader2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useState } from 'react';

export const ATSCompatibility = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showUploadSection, setShowUploadSection] = useState(false);

  const scrollToUpload = () => {
    setShowUploadSection(true);
    setTimeout(() => {
      document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeFile) {
      setError('Please upload a resume file');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResults(null);

    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('jobDescription', jobDescription);

      const response = await fetch('http://localhost:5000/api/analyze-ats', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResults(data);
      } else {
        setError(data.error || 'Analysis failed');
      }
    } catch (err) {
      setError('Failed to connect to server. Make sure the backend is running on port 5000.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetForm = () => {
    setResumeFile(null);
    setJobDescription('');
    setResults(null);
    setError(null);
  };

  const features = [
    {
      icon: <Scan className="w-6 h-6" />,
      title: 'Format Analysis',
      description: 'Scan resume formatting to ensure compatibility with all major ATS systems and tracking software.',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Parsing Preview',
      description: 'See exactly how ATS systems will parse and read the resume before submission.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Keyword Optimization',
      description: 'Analyze keyword density and suggest improvements to pass ATS screening filters.',
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: 'Issue Detection',
      description: 'Identify formatting issues, incompatible elements, and potential parsing errors.',
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: 'Section Validation',
      description: 'Verify all required sections are properly structured and labeled for ATS recognition.',
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: 'File Type Check',
      description: 'Ensure resume file format is ATS-friendly (.pdf, .docx) with proper encoding.',
    },
  ];

  const checks = [
    'Contact information parsing',
    'Work experience structure',
    'Skills section formatting',
    'Education details extraction',
    'Date format compatibility',
    'Special character handling',
    'Table and column detection',
    'Header and footer validation',
    'Font and styling compatibility',
    'Section heading recognition',
  ];

  return (
    <div className="relative bg-black text-white min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-primary-20 hover:text-primary-30 mb-8 smooth-transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass border border-info-10/30 rounded-full mb-6">
              <FileCheck className="w-4 h-4 text-info-20" />
              <span className="text-info-20 font-semibold text-sm">ATS Compatibility</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Resume Optimization <span className="text-gradient">Scanner</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed mb-8">
              Ensure resumes are ATS-friendly and optimized for automated screening systems. 
              Detect formatting issues, keyword mismatches, and compatibility problems before submission.
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={scrollToUpload}
                className="px-8 py-4 bg-gradient-to-r from-info-10 to-info-20 hover:from-info-20 hover:to-info-10 rounded-full font-semibold smooth-transition hover:scale-105 hover:shadow-2xl hover:shadow-info-10/50"
              >
                Check Resume Now
              </button>
              <button 
                onClick={scrollToUpload}
                className="px-8 py-4 glass hover:glass-strong hover:border-info-10/30 rounded-full font-semibold smooth-transition hover:scale-105"
              >
                See Example
              </button>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Comprehensive ATS Analysis
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass hover:glass-strong hover:border-info-10/30 rounded-2xl p-8 smooth-transition group hover:translate-y-[-4px]"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-info-10 to-info-20 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 smooth-transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-info-20 smooth-transition">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Upload Section */}
        {showUploadSection && (
          <div id="upload-section" className="max-w-4xl mx-auto px-6 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-strong rounded-3xl p-8 md:p-12"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Upload Your Resume</h2>
              
              {/* File Upload */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3 text-gray-300">
                  Resume File (PDF, DOCX, TXT)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="flex items-center justify-center gap-3 p-8 glass hover:glass-strong border-2 border-dashed border-info-10/30 hover:border-info-20/50 rounded-xl cursor-pointer smooth-transition group"
                  >
                    <Upload className="w-8 h-8 text-info-20 group-hover:scale-110 smooth-transition" />
                    <span className="text-lg font-medium">
                      {resumeFile ? resumeFile.name : 'Click to upload resume'}
                    </span>
                  </label>
                </div>
                {resumeFile && (
                  <div className="mt-3 flex items-center gap-2 text-success-20">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>File selected: {resumeFile.name}</span>
                  </div>
                )}
              </div>

              {/* Job Description (Optional) */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3 text-gray-300">
                  Job Description (Optional)
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description to check keyword matching..."
                  className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:border-info-20 focus:ring-2 focus:ring-info-20/20 outline-none smooth-transition"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-error-10/10 border border-error-10/30 rounded-xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-error-20" />
                  <span className="text-error-20">{error}</span>
                </div>
              )}

              {/* Analyze Button */}
              <div className="flex gap-4">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !resumeFile}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-info-10 to-info-20 hover:from-info-20 hover:to-info-10 rounded-full font-semibold smooth-transition hover:scale-105 hover:shadow-2xl hover:shadow-info-10/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Scan className="w-5 h-5" />
                      Analyze Resume
                    </>
                  )}
                </button>
                {resumeFile && (
                  <button
                    onClick={resetForm}
                    className="px-6 py-4 glass hover:glass-strong rounded-full smooth-transition flex items-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Reset
                  </button>
                )}
              </div>

              {/* Results Section */}
              {results && results.success && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 space-y-6"
                >
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                    <FileCheck className="w-6 h-6 text-info-20" />
                    AI-Powered Analysis Results
                  </h3>

                  {/* ATS Score */}
                  <div className="p-6 glass-strong rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-semibold">ATS Compatibility Score</span>
                      <span className="text-4xl font-bold text-info-20">{results.ats_score}%</span>
                    </div>
                    <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden mb-4">
                      <div 
                        className="h-full bg-gradient-to-r from-info-10 to-info-20 smooth-transition"
                        style={{ width: `${results.ats_score}%` }}
                      />
                    </div>
                    {results.reasoning?.ats_compatibility && (
                      <div className="p-4 bg-info-10/10 border border-info-10/30 rounded-lg">
                        <p className="text-sm font-semibold mb-2 text-info-20">Why this score?</p>
                        <p className="text-sm text-gray-300">{results.reasoning.ats_compatibility}</p>
                      </div>
                    )}
                  </div>

                  {/* Overall Assessment */}
                  {results.overall_assessment && (
                    <div className="p-6 glass-strong rounded-2xl">
                      <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-info-20" />
                        Overall Assessment
                      </h4>
                      <p className="text-gray-300 leading-relaxed">{results.overall_assessment}</p>
                    </div>
                  )}

                  {/* Match Score (if job description provided) */}
                  {results.gemini_analysis?.match_score && (
                    <div className="p-6 glass-strong rounded-2xl">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xl font-semibold">Job Match Score</span>
                        <span className="text-4xl font-bold text-success-20">{results.gemini_analysis.match_score}%</span>
                      </div>
                      <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden mb-4">
                        <div 
                          className="h-full bg-gradient-to-r from-success-10 to-success-20 smooth-transition"
                          style={{ width: `${results.gemini_analysis.match_score}%` }}
                        />
                      </div>
                      {results.reasoning?.job_match && (
                        <div className="p-4 bg-success-10/10 border border-success-10/30 rounded-lg">
                          <p className="text-sm font-semibold mb-2 text-success-20">Match Analysis</p>
                          <p className="text-sm text-gray-300">{results.reasoning.job_match}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Strengths */}
                  {results.strengths && results.strengths.length > 0 && (
                    <div className="p-6 glass-strong rounded-2xl">
                      <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-success-20" />
                        Key Strengths
                      </h4>
                      <div className="space-y-3">
                        {results.strengths.map((strength: string, idx: number) => (
                          <div key={idx} className="p-4 bg-success-10/10 border border-success-10/30 rounded-lg flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-success-20 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-200">{strength}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Weaknesses */}
                  {results.weaknesses && results.weaknesses.length > 0 && (
                    <div className="p-6 glass-strong rounded-2xl">
                      <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-error-20" />
                        Areas for Improvement
                      </h4>
                      <div className="space-y-3">
                        {results.weaknesses.map((weakness: string, idx: number) => (
                          <div key={idx} className="p-4 bg-error-10/10 border border-error-10/30 rounded-lg flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-error-20 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-200">{weakness}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Issues */}
                  {results.issues && results.issues.length > 0 && (
                    <div className="p-6 glass-strong rounded-2xl">
                      <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-error-20" />
                        Formatting Issues
                      </h4>
                      <div className="space-y-2">
                        {results.issues.map((issue: string, idx: number) => (
                          <div key={idx} className="p-3 bg-error-10/10 border border-error-10/30 rounded-lg text-sm">
                            • {issue}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  {results.suggestions && results.suggestions.length > 0 && (
                    <div className="p-6 glass-strong rounded-2xl">
                      <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-info-20" />
                        Actionable Recommendations
                      </h4>
                      <div className="space-y-3">
                        {results.suggestions.map((suggestion: string, idx: number) => (
                          <div key={idx} className="p-4 glass rounded-lg flex items-start gap-3 hover:glass-strong smooth-transition">
                            <div className="w-6 h-6 rounded-full bg-info-10/20 border border-info-10/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-info-20">{idx + 1}</span>
                            </div>
                            <span className="text-sm text-gray-200">{suggestion}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Keyword Analysis */}
                  {results.gemini_analysis?.keyword_analysis && (
                    <div className="p-6 glass-strong rounded-2xl">
                      <h4 className="text-lg font-semibold mb-4">Keyword Analysis</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {results.gemini_analysis.keyword_analysis.matched_keywords && (
                          <div className="p-4 glass rounded-lg">
                            <p className="text-sm font-semibold text-success-20 mb-3">✓ Matched Keywords</p>
                            <div className="flex flex-wrap gap-2">
                              {results.gemini_analysis.keyword_analysis.matched_keywords.map((keyword: string, idx: number) => (
                                <span key={idx} className="px-3 py-1.5 bg-success-10/20 border border-success-10/30 rounded-full text-xs font-medium">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {results.gemini_analysis.keyword_analysis.missing_keywords && (
                          <div className="p-4 glass rounded-lg">
                            <p className="text-sm font-semibold text-error-20 mb-3">✗ Missing Keywords</p>
                            <div className="flex flex-wrap gap-2">
                              {results.gemini_analysis.keyword_analysis.missing_keywords.map((keyword: string, idx: number) => (
                                <span key={idx} className="px-3 py-1.5 bg-error-10/20 border border-error-10/30 rounded-full text-xs font-medium">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Key Concerns */}
                  {results.reasoning?.key_concerns && (
                    <div className="p-6 bg-gradient-to-br from-error-10/10 to-error-20/10 border border-error-10/30 rounded-2xl">
                      <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-error-20" />
                        Key Concerns to Address
                      </h4>
                      <p className="text-sm text-gray-200 leading-relaxed">{results.reasoning.key_concerns}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>
        )}

        {/* Compatibility Checks */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-strong rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              What We Check
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {checks.map((check, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <CheckCircle2 className="w-6 h-6 text-info-20 flex-shrink-0" />
                  <span className="text-lg text-gray-300">{check}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
