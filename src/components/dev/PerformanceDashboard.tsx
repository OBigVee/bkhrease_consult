'use client';

import React, { useState } from 'react';
import {
  usePerformance,
  usePageSpeed,
  useBundleAnalysis,
} from '@/hooks/usePerformance';
import { Card } from '@/components/ui';

interface PerformanceDashboardProps {
  show?: boolean;
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  show = process.env.NODE_ENV === 'development',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { performanceData, isLoading } = usePerformance();
  const pageSpeed = usePageSpeed();
  const bundleInfo = useBundleAnalysis();

  if (!show) return null;

  const formatTime = (time: number) => `${Math.round(time)}ms`;
  const formatSize = (size: number) => `${(size / 1024).toFixed(2)}KB`;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        title="Performance Dashboard"
      >
        📊
      </button>

      {/* Dashboard Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Performance Dashboard
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Core Metrics */}
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-3">Core Metrics</h3>
                  {isLoading ? (
                    <div className="text-gray-500">Loading...</div>
                  ) : performanceData ? (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Load Time:</span>
                        <span
                          className={
                            performanceData.loadTime > 3000
                              ? 'text-red-600'
                              : 'text-green-600'
                          }
                        >
                          {formatTime(performanceData.loadTime)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>DOM Content Loaded:</span>
                        <span
                          className={
                            performanceData.domContentLoaded > 2000
                              ? 'text-red-600'
                              : 'text-green-600'
                          }
                        >
                          {formatTime(performanceData.domContentLoaded)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>First Paint:</span>
                        <span>{formatTime(performanceData.firstPaint)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>First Contentful Paint:</span>
                        <span
                          className={
                            performanceData.firstContentfulPaint > 2500
                              ? 'text-red-600'
                              : 'text-green-600'
                          }
                        >
                          {formatTime(performanceData.firstContentfulPaint)}
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold pt-2 border-t">
                        <span>Performance Score:</span>
                        <span className={getScoreColor(performanceData.score)}>
                          {performanceData.score}/100
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-500">No data available</div>
                  )}
                </Card>

                {/* Page Speed Analysis */}
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-3">Page Speed</h3>
                  {pageSpeed ? (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between font-semibold">
                        <span>Speed Score:</span>
                        <span className={getScoreColor(pageSpeed.score)}>
                          {pageSpeed.score}/100
                        </span>
                      </div>
                      <div className="space-y-1 pt-2 border-t">
                        <div className="flex justify-between">
                          <span>DNS Lookup:</span>
                          <span>{formatTime(pageSpeed.metrics.dnsLookup)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>TCP Connection:</span>
                          <span>
                            {formatTime(pageSpeed.metrics.tcpConnection)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Server Response:</span>
                          <span
                            className={
                              pageSpeed.metrics.serverResponse > 500
                                ? 'text-red-600'
                                : 'text-green-600'
                            }
                          >
                            {formatTime(pageSpeed.metrics.serverResponse)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>DOM Processing:</span>
                          <span>
                            {formatTime(pageSpeed.metrics.domProcessing)}
                          </span>
                        </div>
                      </div>
                      {pageSpeed.recommendations.length > 0 && (
                        <div className="pt-2 border-t">
                          <div className="text-xs font-medium text-gray-700 mb-1">
                            Recommendations:
                          </div>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {pageSpeed.recommendations.map((rec, index) => (
                              <li key={index}>• {rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-500">Analyzing...</div>
                  )}
                </Card>

                {/* Bundle Analysis */}
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-3">
                    Bundle Analysis
                  </h3>
                  {bundleInfo ? (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between font-semibold">
                        <span>Total Size:</span>
                        <span
                          className={
                            bundleInfo.totalSize > 500000
                              ? 'text-red-600'
                              : 'text-green-600'
                          }
                        >
                          {formatSize(bundleInfo.totalSize)}
                        </span>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="text-xs font-medium text-gray-700 mb-2">
                          Largest Chunks:
                        </div>
                        <div className="space-y-1 max-h-32 overflow-y-auto">
                          {bundleInfo.chunks.slice(0, 5).map((chunk, index) => (
                            <div
                              key={index}
                              className="flex justify-between text-xs"
                            >
                              <span
                                className="truncate mr-2"
                                title={chunk.name}
                              >
                                {chunk.name.length > 20
                                  ? `${chunk.name.substring(0, 20)}...`
                                  : chunk.name}
                              </span>
                              <span
                                className={
                                  chunk.size > 100000
                                    ? 'text-red-600'
                                    : 'text-gray-600'
                                }
                              >
                                {formatSize(chunk.size)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {bundleInfo.recommendations.length > 0 && (
                        <div className="pt-2 border-t">
                          <div className="text-xs font-medium text-gray-700 mb-1">
                            Recommendations:
                          </div>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {bundleInfo.recommendations.map((rec, index) => (
                              <li key={index}>• {rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-500">Analyzing...</div>
                  )}
                </Card>
              </div>

              {/* Web Vitals Status */}
              <Card className="p-4 mt-6">
                <h3 className="text-lg font-semibold mb-3">
                  Web Vitals Status
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-xs text-gray-600">LCP</div>
                    <div className="font-semibold">
                      {performanceData?.largestContentfulPaint
                        ? formatTime(performanceData.largestContentfulPaint)
                        : 'Measuring...'}
                    </div>
                    <div className="text-xs text-gray-500">
                      Largest Contentful Paint
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600">FID</div>
                    <div className="font-semibold">
                      {performanceData?.firstInputDelay
                        ? formatTime(performanceData.firstInputDelay)
                        : 'Waiting...'}
                    </div>
                    <div className="text-xs text-gray-500">
                      First Input Delay
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600">CLS</div>
                    <div className="font-semibold">
                      {performanceData?.cumulativeLayoutShift
                        ? performanceData.cumulativeLayoutShift.toFixed(3)
                        : 'Measuring...'}
                    </div>
                    <div className="text-xs text-gray-500">
                      Cumulative Layout Shift
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600">FCP</div>
                    <div className="font-semibold">
                      {performanceData?.firstContentfulPaint
                        ? formatTime(performanceData.firstContentfulPaint)
                        : 'Measuring...'}
                    </div>
                    <div className="text-xs text-gray-500">
                      First Contentful Paint
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600">TTFB</div>
                    <div className="font-semibold">Measuring...</div>
                    <div className="text-xs text-gray-500">
                      Time to First Byte
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PerformanceDashboard;
