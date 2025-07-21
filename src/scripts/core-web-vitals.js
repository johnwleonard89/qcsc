// Core Web Vitals Monitoring Script
// Real User Monitoring (RUM) for performance optimization

class CoreWebVitalsMonitor {
  constructor() {
    this.vitals = {
      LCP: null,
      FID: null,
      CLS: null,
      TTFB: null,
      FCP: null
    };
    
    this.init();
  }

  init() {
    // Only run in browsers that support the APIs
    if (typeof window === 'undefined' || !window.PerformanceObserver) {
      return;
    }

    this.measureLCP();
    this.measureFID();
    this.measureCLS();
    this.measureTTFB();
    this.measureFCP();
    
    // Send data when page is hidden/unloaded
    this.setupReporting();
  }

  // Largest Contentful Paint (LCP) - should be < 2.5s
  measureLCP() {
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.vitals.LCP = lastEntry.startTime;
        
        this.logVital('LCP', lastEntry.startTime, lastEntry.startTime < 2500);
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      console.warn('LCP measurement not supported:', error);
    }
  }

  // First Input Delay (FID) - should be < 100ms
  measureFID() {
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          this.vitals.FID = entry.processingStart - entry.startTime;
          
          this.logVital('FID', this.vitals.FID, this.vitals.FID < 100);
        });
      });
      
      observer.observe({ entryTypes: ['first-input'] });
    } catch (error) {
      console.warn('FID measurement not supported:', error);
    }
  }

  // Cumulative Layout Shift (CLS) - should be < 0.1
  measureCLS() {
    try {
      let clsValue = 0;
      let sessionValue = 0;
      let sessionEntries = [];
      
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            const firstSessionEntry = sessionEntries[0];
            const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
            
            if (sessionValue && 
                entry.startTime - lastSessionEntry.startTime < 1000 &&
                entry.startTime - firstSessionEntry.startTime < 5000) {
              sessionValue += entry.value;
              sessionEntries.push(entry);
            } else {
              sessionValue = entry.value;
              sessionEntries = [entry];
            }
            
            if (sessionValue > clsValue) {
              clsValue = sessionValue;
              this.vitals.CLS = clsValue;
              
              this.logVital('CLS', clsValue, clsValue < 0.1);
            }
          }
        });
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('CLS measurement not supported:', error);
    }
  }

  // Time to First Byte (TTFB) - should be < 800ms
  measureTTFB() {
    try {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        this.vitals.TTFB = navigation.responseStart - navigation.requestStart;
        
        this.logVital('TTFB', this.vitals.TTFB, this.vitals.TTFB < 800);
      }
    } catch (error) {
      console.warn('TTFB measurement failed:', error);
    }
  }

  // First Contentful Paint (FCP) - should be < 1.8s
  measureFCP() {
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.vitals.FCP = entry.startTime;
            
            this.logVital('FCP', entry.startTime, entry.startTime < 1800);
          }
        });
      });
      
      observer.observe({ entryTypes: ['paint'] });
    } catch (error) {
      console.warn('FCP measurement not supported:', error);
    }
  }

  logVital(name, value, isGood) {
    const status = isGood ? '✅' : '⚠️';
    const color = isGood ? 'color: green' : 'color: orange';
    
    console.log(
      `%c${status} ${name}: ${Math.round(value)}ms`,
      color + '; font-weight: bold'
    );
  }

  setupReporting() {
    // Send data when page is about to be hidden
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.sendVitals();
      }
    });

    // Fallback for older browsers
    window.addEventListener('beforeunload', () => {
      this.sendVitals();
    });

    // Also send after a delay to capture late measurements
    setTimeout(() => {
      this.sendVitals();
    }, 10000);
  }

  sendVitals() {
    // Filter out null values
    const vitals = Object.entries(this.vitals)
      .filter(([key, value]) => value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = Math.round(value);
        return acc;
      }, {});

    if (Object.keys(vitals).length === 0) {
      return;
    }

    // Add additional context
    const data = {
      vitals,
      url: window.location.href,
      userAgent: navigator.userAgent,
      connection: this.getConnectionInfo(),
      timestamp: Date.now(),
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };

    // Send to analytics (replace with your actual endpoint)
    this.reportToAnalytics(data);
  }

  getConnectionInfo() {
    if ('connection' in navigator) {
      const conn = navigator.connection;
      return {
        effectiveType: conn.effectiveType,
        downlink: conn.downlink,
        rtt: conn.rtt,
        saveData: conn.saveData
      };
    }
    return null;
  }

  reportToAnalytics(data) {
    // Console logging for development
    console.group('📊 Core Web Vitals Report');
    console.table(data.vitals);
    console.log('📱 Device Info:', {
      viewport: data.viewport,
      connection: data.connection
    });
    console.groupEnd();

    // Send to Google Analytics (if available)
    if (typeof gtag !== 'undefined') {
      Object.entries(data.vitals).forEach(([metric, value]) => {
        gtag('event', 'web_vitals', {
          metric_name: metric,
          metric_value: value,
          metric_rating: this.getRating(metric, value)
        });
      });
    }

    // Send to your own analytics endpoint
    if (navigator.sendBeacon) {
      try {
        navigator.sendBeacon('/api/vitals', JSON.stringify(data));
      } catch (error) {
        console.warn('Failed to send vitals:', error);
      }
    }
  }

  getRating(metric, value) {
    const thresholds = {
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      TTFB: { good: 800, poor: 1800 },
      FCP: { good: 1800, poor: 3000 }
    };

    const threshold = thresholds[metric];
    if (!threshold) return 'unknown';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  // Public method to get current vitals
  getVitals() {
    return { ...this.vitals };
  }

  // Public method to force reporting
  forceReport() {
    this.sendVitals();
  }
}

// Performance budget monitoring
class PerformanceBudget {
  constructor() {
    this.budgets = {
      // Time budgets (in ms)
      LCP: 2500,
      FID: 100,
      CLS: 0.1,
      TTFB: 800,
      FCP: 1800,
      
      // Resource budgets
      totalSize: 2 * 1024 * 1024, // 2MB
      imageSize: 1 * 1024 * 1024,  // 1MB
      scriptSize: 500 * 1024,      // 500KB
      styleSize: 100 * 1024        // 100KB
    };
    
    this.checkResourceBudgets();
  }

  checkResourceBudgets() {
    window.addEventListener('load', () => {
      const resources = performance.getEntriesByType('resource');
      const budgetReport = this.analyzeResources(resources);
      
      if (budgetReport.violations.length > 0) {
        console.warn('🚨 Performance Budget Violations:', budgetReport.violations);
      } else {
        console.log('✅ Performance Budget: All checks passed');
      }
    });
  }

  analyzeResources(resources) {
    const totals = {
      images: 0,
      scripts: 0,
      styles: 0,
      total: 0
    };

    const violations = [];

    resources.forEach(resource => {
      const size = resource.transferSize || 0;
      totals.total += size;

      if (resource.initiatorType === 'img') {
        totals.images += size;
      } else if (resource.initiatorType === 'script') {
        totals.scripts += size;
      } else if (resource.initiatorType === 'link' && resource.name.includes('.css')) {
        totals.styles += size;
      }
    });

    // Check violations
    if (totals.total > this.budgets.totalSize) {
      violations.push(`Total size: ${(totals.total / 1024).toFixed(1)}KB exceeds ${(this.budgets.totalSize / 1024).toFixed(1)}KB`);
    }

    if (totals.images > this.budgets.imageSize) {
      violations.push(`Image size: ${(totals.images / 1024).toFixed(1)}KB exceeds ${(this.budgets.imageSize / 1024).toFixed(1)}KB`);
    }

    if (totals.scripts > this.budgets.scriptSize) {
      violations.push(`Script size: ${(totals.scripts / 1024).toFixed(1)}KB exceeds ${(this.budgets.scriptSize / 1024).toFixed(1)}KB`);
    }

    if (totals.styles > this.budgets.styleSize) {
      violations.push(`Style size: ${(totals.styles / 1024).toFixed(1)}KB exceeds ${(this.budgets.styleSize / 1024).toFixed(1)}KB`);
    }

    return { totals, violations };
  }
}

// Initialize monitoring when DOM is ready
if (typeof window !== 'undefined') {
  const vitalsMonitor = new CoreWebVitalsMonitor();
  const budgetMonitor = new PerformanceBudget();
  
  // Make available globally for debugging
  window.vitalsMonitor = vitalsMonitor;
  window.budgetMonitor = budgetMonitor;
}

export { CoreWebVitalsMonitor, PerformanceBudget };