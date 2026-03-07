/**
 * Match Analysis Visual Component
 * 
 * Displays comprehensive candidate-job match analysis with:
 * - Circular progress indicators
 * - Score breakdowns by category
 * - Visual recommendations
 * - Color-coded performance metrics
 * 
 * @component
 */
import React from 'react';
import { CheckCircle, XCircle, AlertCircle, TrendingUp, Brain, Briefcase, GraduationCap, FolderOpen, Users, Target } from 'lucide-react';

interface MatchAnalysisProps {
  matchData: {
    overall_match_score: number;
    recommendation: string;
    skill_alignment?: { score: number; explanation: string };
    experience_alignment?: { score: number; explanation: string };
    education_alignment?: { score: number; reasoning: string };
    project_alignment?: { score: number; explanation: string };
    cultural_fit_indicators?: { score: number; explanation: string };
    growth_potential?: { score: number; reasoning: string };
    transparency_statement?: string;
  };
}

interface ScoreColor {
  bg: string;
  text: string;
  border: string;
}

export const MatchAnalysisVisual: React.FC<MatchAnalysisProps> = ({ matchData }) => {
  /**
   * Determines color scheme based on score thresholds
   * @param score - Numeric score (0-100)
   * @returns Color configuration object
   */
  const getScoreColor = (score: number): ScoreColor => {
    if (score >= 70) return { bg: 'from-green-500 to-emerald-500', text: 'text-green-400', border: 'border-green-500' };
    if (score >= 50) return { bg: 'from-yellow-500 to-orange-500', text: 'text-yellow-400', border: 'border-yellow-500' };
    return { bg: 'from-red-500 to-pink-500', text: 'text-red-400', border: 'border-red-500' };
  };

  const getRecommendationIcon = (recommendation: string) => {
    if (recommendation.includes('strong') || recommendation.includes('excellent')) {
      return <CheckCircle className="w-8 h-8 text-green-400" />;
    } else if (recommendation.includes('weak') || recommendation.includes('reject')) {
      return <XCircle className="w-8 h-8 text-red-400" />;
    }
    return <AlertCircle className="w-8 h-8 text-yellow-400" />;
  };

  const CircularProgress = ({ percentage, size = 120, strokeWidth = 10, label }: { percentage: number; size?: number; strokeWidth?: number; label: string }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;
    const colors = getScoreColor(percentage);

    return (
      <div className="relative flex flex-col items-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className={colors.bg.includes('green') ? 'text-green-500' : colors.bg.includes('yellow') ? 'text-yellow-500' : 'text-red-500'} stopColor="currentColor" />
              <stop offset="100%" className={colors.bg.includes('emerald') ? 'text-emerald-500' : colors.bg.includes('orange') ? 'text-orange-500' : 'text-pink-500'} stopColor="currentColor" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${colors.text}`}>{percentage}%</span>
        </div>
        <p className="text-sm text-gray-400 mt-2 font-medium text-center">{label}</p>
      </div>
    );
  };

  const metrics = [
    {
      label: 'Skill Alignment',
      score: matchData.skill_alignment?.score || 0,
      icon: Brain,
      color: 'blue'
    },
    {
      label: 'Experience',
      score: matchData.experience_alignment?.score || 0,
      icon: Briefcase,
      color: 'purple'
    },
    {
      label: 'Education',
      score: matchData.education_alignment?.score || 0,
      icon: GraduationCap,
      color: 'indigo'
    },
    {
      label: 'Projects',
      score: matchData.project_alignment?.score || 0,
      icon: FolderOpen,
      color: 'cyan'
    },
    {
      label: 'Cultural Fit',
      score: matchData.cultural_fit_indicators?.score || 0,
      icon: Users,
      color: 'pink'
    },
    {
      label: 'Growth Potential',
      score: matchData.growth_potential?.score || 0,
      icon: TrendingUp,
      color: 'green'
    },
  ];

  const overallColors = getScoreColor(matchData.overall_match_score);

  return (
    <div className="space-y-6">
      {/* Header with Overall Score */}
      <div className="glass-strong rounded-3xl p-8 border-l-4 border-gradient-to-b from-primary-10 to-primary-30">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Match Analysis Complete</h2>
            <p className="text-gray-400">Comprehensive candidate evaluation results</p>
          </div>
          {getRecommendationIcon(matchData.recommendation)}
        </div>

        {/* Large Overall Score Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Main Score Circle */}
          <div className="lg:col-span-1 flex justify-center">
            <div className="relative">
              <CircularProgress 
                percentage={matchData.overall_match_score} 
                size={180} 
                strokeWidth={14}
                label="Overall Match"
              />
            </div>
          </div>

          {/* Recommendation Box */}
          <div className="lg:col-span-2">
            <div className={`glass rounded-2xl p-6 border-2 ${overallColors.border}`}>
              <div className="flex items-start gap-4">
                <Target className={`w-12 h-12 ${overallColors.text} flex-shrink-0`} />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3">Recommendation</h3>
                  <div className={`inline-block px-4 py-2 rounded-full text-lg font-bold ${overallColors.text} bg-white/10 mb-4`}>
                    {matchData.recommendation.replace(/_/g, ' ').toUpperCase()}
                  </div>
                  {matchData.transparency_statement && (
                    <p className="text-sm text-gray-300 leading-relaxed mt-3">
                      {matchData.transparency_statement.substring(0, 300)}...
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Metrics Grid */}
      <div className="glass-strong rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <svg className="w-7 h-7 text-primary-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Score Breakdown
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const colors = getScoreColor(metric.score);
            
            return (
              <div 
                key={index}
                className="glass rounded-2xl p-4 hover:glass-strong smooth-transition group cursor-pointer hover:scale-105"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center mb-3 group-hover:scale-110 smooth-transition`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className={`text-3xl font-bold ${colors.text} mb-1`}>
                    {metric.score}%
                  </div>
                  
                  <p className="text-xs text-gray-400 font-medium leading-tight">
                    {metric.label}
                  </p>

                  {/* Mini progress bar */}
                  <div className="w-full h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${colors.bg} transition-all duration-1000 ease-out`}
                      style={{ width: `${metric.score}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Score Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {matchData.skill_alignment && (
          <div className="glass-strong rounded-2xl p-6 border border-blue-500/30 hover:border-blue-500/50 smooth-transition">
            <div className="flex items-center gap-3 mb-3">
              <Brain className="w-6 h-6 text-blue-400" />
              <h4 className="text-lg font-bold text-white">Skill Alignment</h4>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl font-bold text-blue-400">{matchData.skill_alignment.score}%</span>
              <span className="text-sm text-gray-400">Match Score</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {matchData.skill_alignment.explanation}
            </p>
          </div>
        )}

        {matchData.experience_alignment && (
          <div className="glass-strong rounded-2xl p-6 border border-purple-500/30 hover:border-purple-500/50 smooth-transition">
            <div className="flex items-center gap-3 mb-3">
              <Briefcase className="w-6 h-6 text-purple-400" />
              <h4 className="text-lg font-bold text-white">Experience Alignment</h4>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl font-bold text-purple-400">{matchData.experience_alignment.score}%</span>
              <span className="text-sm text-gray-400">Match Score</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {matchData.experience_alignment.explanation}
            </p>
          </div>
        )}

        {matchData.project_alignment && (
          <div className="glass-strong rounded-2xl p-6 border border-cyan-500/30 hover:border-cyan-500/50 smooth-transition">
            <div className="flex items-center gap-3 mb-3">
              <FolderOpen className="w-6 h-6 text-cyan-400" />
              <h4 className="text-lg font-bold text-white">Project Alignment</h4>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl font-bold text-cyan-400">{matchData.project_alignment.score}%</span>
              <span className="text-sm text-gray-400">Match Score</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {matchData.project_alignment.explanation}
            </p>
          </div>
        )}

        {matchData.growth_potential && (
          <div className="glass-strong rounded-2xl p-6 border border-green-500/30 hover:border-green-500/50 smooth-transition">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <h4 className="text-lg font-bold text-white">Growth Potential</h4>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl font-bold text-green-400">{matchData.growth_potential.score}%</span>
              <span className="text-sm text-gray-400">Score</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {matchData.growth_potential.reasoning}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
