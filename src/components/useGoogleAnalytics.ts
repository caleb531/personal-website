import { useEffect } from 'react';
import ReactGA from 'react-ga';
import site from '../data/site.json';

// The useGoogleAnalytics() hook is a simple abstraction around the react-ga
// library for loading and firing Google Analytics
function useGoogleAnalytics() {
  // Initialize Google Analytics on the initial page load
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      ReactGA.initialize(site.googleAnalytics);
    }
  }, []);
  // Trigger a pageview even on the initial page load and when navigating to
  // another page on the site
  useEffect(() => {
    if (typeof window !== 'undefined') {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  });
}
export default useGoogleAnalytics;
