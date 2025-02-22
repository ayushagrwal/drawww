import React from 'react';
import { Pencil, Share2, Download, Users, Sparkles, Github, Shapes, Palette, Eraser, MousePointer2, Layers, Lock } from 'lucide-react';
import Link from 'next/link';

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function ToolButton({ icon: Icon, label }: { icon: React.ElementType, label: string }) {
  return (
    <div className="flex items-center justify-center flex-col">
      <button className="h-12 w-12 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center group">
        <Icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600 transition-colors" />
      </button>
      <span className="text-sm text-gray-600 mt-2">{label}</span>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Pencil className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-800">Drawww</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Docs</a>
            <a href="https://github.com" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
            <div className="flex items-center space-x-3">
              <Link href={"/signin"}>
                <button className="border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:border-gray-400 transition-colors">
                  Sign In
                </button>
              </Link>
              <Link href={"/signup"}>
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Collaborative Diagramming Made Simple
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create, share, and collaborate on diagrams in real-time. No sign-up required.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href={"/signin"}>
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>Start Drawing</span>
              </button>
            </Link>
            {/* <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:border-gray-400 transition-colors">
              View Examples
            </button> */}
          </div>
        </div>
        
        {/* Interactive Demo Section */}
        <div className="mt-16 relative">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {/* Toolbar */}
            <div className="flex justify-center space-x-4 mb-8">
              <ToolButton icon={MousePointer2} label="Select" />
              <ToolButton icon={Pencil} label="Draw" />
              <ToolButton icon={Shapes} label="Shapes" />
              <ToolButton icon={Palette} label="Colors" />
              <ToolButton icon={Eraser} label="Erase" />
              <ToolButton icon={Layers} label="Layers" />
              <ToolButton icon={Lock} label="Lock" />
            </div>

            {/* Canvas Preview */}
            <div className="relative bg-gray-50 rounded-xl h-[400px] overflow-hidden">
              {/* Collaborative Cursors */}
              <div className="absolute top-[30%] left-[20%] flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <div className="bg-blue-500 text-white text-sm py-1 px-2 rounded">Sarah</div>
              </div>
              <div className="absolute top-[45%] right-[30%] flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div className="bg-green-500 text-white text-sm py-1 px-2 rounded">Alex</div>
              </div>

              {/* Sample Drawing Elements */}
              <div className="absolute top-[25%] left-[15%] w-48 h-32 border-2 border-indigo-500 rounded-lg bg-indigo-50 opacity-50"></div>
              <div className="absolute top-[40%] right-[25%] w-40 h-40 border-2 border-purple-500 rounded-full bg-purple-50 opacity-50"></div>
              <svg className="absolute top-[35%] left-[40%]" width="200" height="100">
                <path d="M10 50 Q 100 10 190 50" stroke="rgb(99 102 241)" strokeWidth="2" fill="none"/>
              </svg>

              {/* Collaboration Indicator */}
              <div className="absolute bottom-4 right-4 bg-white rounded-full shadow-lg px-4 py-2 flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-sm">S</div>
                  <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-white text-sm">A</div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-white text-sm">M</div>
                </div>
                <span className="text-sm text-gray-600">3 collaborators</span>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">Real-time</div>
                <p className="text-gray-600">See changes instantly as your team collaborates</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">Intuitive</div>
                <p className="text-gray-600">Easy-to-use tools for quick diagramming</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">Powerful</div>
                <p className="text-gray-600">Advanced features for complex diagrams</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything you need to bring your ideas to life
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Share2}
              title="Real-time Collaboration"
              description="Work together with your team in real-time, see changes as they happen."
            />
            <FeatureCard 
              icon={Download}
              title="Export Anywhere"
              description="Export your diagrams in multiple formats including PNG, SVG, and PDF."
            />
            <FeatureCard 
              icon={Users}
              title="Team Friendly"
              description="Built for teams of all sizes, with powerful collaboration features."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Pencil className="h-6 w-6 text-indigo-600" />
              <span className="text-xl font-semibold text-gray-800">Drawww</span>
            </div>
            <div className="text-gray-500">
              © {new Date().getFullYear()} Drawww. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;