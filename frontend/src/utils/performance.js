// Performance monitoring utilities

export const measurePerformance = (name, fn) => {
  if (typeof performance !== 'undefined' && performance.mark) {
    const startMark = `${name}-start`;
    const endMark = `${name}-end`;
    const measureName = `${name}-measure`;
    
    performance.mark(startMark);
    const result = fn();
    performance.mark(endMark);
    performance.measure(measureName, startMark, endMark);
    
    return result;
  }
  return fn();
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Preload images for better performance
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Preload videos for better performance
export const preloadVideo = (src) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.onloadeddata = () => resolve(video);
    video.onerror = reject;
    video.preload = 'metadata';
    video.src = src;
  });
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Optimize images based on device capabilities
export const getOptimizedImageUrl = (baseUrl, options = {}) => {
  const { width, height, quality = 80, format = 'webp' } = options;
  
  // Check if browser supports WebP
  const supportsWebP = (() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  })();
  
  // Return optimized URL based on capabilities
  if (supportsWebP && format === 'webp') {
    return `${baseUrl}?w=${width}&h=${height}&q=${quality}&f=webp`;
  }
  
  return `${baseUrl}?w=${width}&h=${height}&q=${quality}`;
};

// Memory usage monitoring
export const monitorMemoryUsage = () => {
  if (performance.memory) {
    const { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit } = performance.memory;
    const usagePercentage = (usedJSHeapSize / jsHeapSizeLimit) * 100;
    
    return { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit, usagePercentage };
  }
  return null;
};

// Intersection Observer with performance optimization
export const createOptimizedIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '50px',
    ...options
  };
  
  return new IntersectionObserver(
    throttle(callback, 100), // Throttle callback to improve performance
    defaultOptions
  );
};

// Critical resource preloader for above-the-fold content
export const preloadCriticalResources = (resources) => {
  resources.forEach(({ src, type, as }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    if (as) link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
  });
};

// Lazy load non-critical resources
export const lazyLoadResource = (src, type = 'image') => {
  return new Promise((resolve, reject) => {
    if (type === 'image') {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    } else if (type === 'video') {
      const video = document.createElement('video');
      video.onloadeddata = () => resolve(video);
      video.onerror = reject;
      video.preload = 'metadata';
      video.src = src;
    }
  });
};

// Performance observer for monitoring component performance
export const observeComponentPerformance = (componentName) => {
  if (typeof PerformanceObserver !== 'undefined') {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name.includes(componentName)) {
          // Performance data available but not logged
        }
      });
    });
    
    observer.observe({ entryTypes: ['measure'] });
    return observer;
  }
  return null;
};

// Device capability detection
export const getDeviceCapabilities = () => {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  return {
    // Network information
    effectiveType: connection?.effectiveType || 'unknown',
    downlink: connection?.downlink || 0,
    rtt: connection?.rtt || 0,
    saveData: connection?.saveData || false,
    
    // Device information
    deviceMemory: navigator.deviceMemory || 4,
    hardwareConcurrency: navigator.hardwareConcurrency || 4,
    
    // Screen information
    screenWidth: screen.width,
    screenHeight: screen.height,
    pixelRatio: window.devicePixelRatio || 1,
    
    // Browser capabilities
    supportsWebP: (() => {
      const canvas = document.createElement('canvas');
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    })(),
    supportsAvif: (() => {
      const canvas = document.createElement('canvas');
      return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
    })(),
  };
};

// Adaptive loading based on device capabilities
export const getAdaptiveLoadingStrategy = () => {
  const capabilities = getDeviceCapabilities();
  
  // Low-end device detection
  const isLowEndDevice = 
    capabilities.deviceMemory <= 2 ||
    capabilities.hardwareConcurrency <= 2 ||
    capabilities.effectiveType === 'slow-2g' ||
    capabilities.effectiveType === '2g' ||
    capabilities.saveData;
  
  return {
    shouldPreload: !isLowEndDevice,
    imageQuality: isLowEndDevice ? 60 : 80,
    videoQuality: isLowEndDevice ? 'low' : 'high',
    enableAnimations: !isLowEndDevice && !prefersReducedMotion(),
    maxConcurrentRequests: isLowEndDevice ? 2 : 6,
    cacheStrategy: isLowEndDevice ? 'minimal' : 'aggressive',
  };
}; 