import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Layout from './Layout.jsx';

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error(`404 Error: User attempted to access non-existent route: ${location.pathname}`);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-white opacity-5">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient">Page Not Found</h1>
          </div>
        </div>
        
        <p className="text-white/70 max-w-lg mb-8">
          The page you're looking for doesn't exist or has been moved. Please check the URL or navigate back to the home page.
        </p>

        <Link
          to="/"
          className="neon-border px-6 py-3 rounded-md bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 hover:from-neon-blue/30 hover:to-neon-purple/30 backdrop-blur-md transition-all duration-300"
        >
          <span className="text-white font-medium">Return to Home</span>
        </Link>
      </div>
    </Layout>
  );
}
