"use client";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3 2 12h3v8h6v-6h2v6h6v-8h3Z" />
          </svg>
          Powered by OpenAI GPT-4o
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
            AI-Powered
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Resume Analysis
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Match your resume against any job description. Get detailed skill
          analysis, experience scoring, AI-powered insights, and actionable
          recommendations to land your dream job.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">5</div>
            <div className="text-sm text-gray-500">Analysis Categories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">AI</div>
            <div className="text-sm text-gray-500">Powered Insights</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">PDF/DOCX</div>
            <div className="text-sm text-gray-500">Resume Formats</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">Instant</div>
            <div className="text-sm text-gray-500">Results</div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#analyzer"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
          >
            Analyze Your Resume
          </a>
          <a
            href="#features"
            className="px-8 py-3.5 rounded-xl bg-white/5 text-white font-semibold border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-0.5"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
