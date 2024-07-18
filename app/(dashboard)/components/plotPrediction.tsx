'use client'
import React, { useEffect, useRef, useState } from 'react';
import PredictionFetcher from './prediction_Fetcher';
import Chart from 'chart.js/auto';

const PlotPredict = ({ session, subject, label, id, colour }) => {
  const chartRef = useRef(null);
  const [error, setError] = useState(null);
  const {predictedIndices, predictedValues } = PredictionFetcher({ session, subject });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Prepare X and Y data for the predictions dataset
        const predictionPoints = predictedIndices.map((index, i) => ({
          x: index, 
          y: predictedValues[i],
        }));

        console.log(predictedIndices)

        const chartCanvas = document.getElementById(id);
        if (chartCanvas instanceof HTMLCanvasElement) {
          if (chartRef.current) {
            chartRef.current.destroy();
          }
          chartRef.current = new Chart(chartCanvas, {
            type: 'line',
            data: {
              labels: predictedIndices,
              datasets: [
                {
                  label: label,
                  data: predictionPoints.map(point => ({ x: point.x, y: point.y })),
                  backgroundColor: colour,
                  borderColor: colour,
                  borderWidth: 1,
                  pointBackgroundColor: colour,
                  yAxisID: 'left-y-axis',
                }
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                'left-y-axis': {
                  type: 'linear',
                  position: 'left',
                  title: {
                    display: true,
                    text: label
                  }
                },
                x: {
                  type: 'linear',
                  position: 'bottom',
                  title: {
                    display: true,
                    text: 'Time (min)'
                  }
                }
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: context => {
                      const datasetLabel = context.dataset.label || '';
                      const value = context.parsed.y;
                      return `${datasetLabel}: ${value}`;
                    },
                  },
                },
              },
            },
          });
          setError(null);
        } else {
          console.error('chartCanvas is not an instance of HTMLCanvasElement');
          setError('Chart canvas element is not found.')
        }
      } catch (error) {
        console.error('Error fetching or parsing CSV data:', error);
        setError('Missing data')
      }
    };

    fetchData();
  }, [session, subject, label, id, colour, predictedIndices,predictedValues]);

  return <canvas id={id}></canvas>;
};

export default PlotPredict;
