'use client'
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import Papa from 'papaparse';

const PlotChart = ({ subject, data, label, id, colour }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch CSV data
        const csvResponse = await fetch('./New_Coolbit.csv');
        if (!csvResponse.ok) {
          throw new Error('Failed to fetch CSV data');
        }
        const csvData = await csvResponse.text();
        const parsedData = Papa.parse(csvData, { header: true }).data;

        // Filter CSV data
        const filteredData = parsedData.filter(row => row['Subject No.'] === subject && row['Session'] === 'RUN');

        // Fetch JSON prediction data
        const predictionResponse = await fetch(`http://localhost:8000/predict/RUN/${subject}`);
        if (!predictionResponse.ok) {
          throw new Error('Failed to fetch prediction data');
        }
        const predictionData = await predictionResponse.json();

        // Extract predicted indices and values
        const predictedIndices = predictionData.map(prediction => prediction.index);
        const predictedValues = predictionData.map(prediction => prediction.prediction);

        // Prepare X and Y data for the main dataset
        const X_labels = filteredData.map(row => parseFloat(row['Time (min)']));
        const y_count = filteredData.map((row) => {
          return {
            x: parseFloat(row['Time (min)']),
            y: parseFloat(row[data]),
            backgroundColor:colour,
            borderColor: colour,
          };
        });

        // Prepare X and Y data for the predictions dataset
        const predictionPoints = predictedIndices.map((index, i) => ({
          x: index * 9, 
          y: predictedValues[i],
        }));

        // Debug logs
        console.log('Filtered Data:', filteredData);
        console.log('Predicted Indices:', predictedIndices);
        console.log('Predicted Values:', predictedValues);
        console.log('Prediction Points:', predictionPoints);

        const chartCanvas = document.getElementById(id);
        if (chartCanvas instanceof HTMLCanvasElement) {
          if (chartRef.current) {
            chartRef.current.destroy();
          }
          chartRef.current = new Chart(chartCanvas, {
            type: 'line',
            data: {
              labels: X_labels,
              datasets: [
                {
                  label: label,
                  data: y_count.map(point => ({ x: point.x, y: point.y })),
                  backgroundColor: colour,
                  borderColor: colour,
                  borderWidth: 1,
                  pointBackgroundColor: y_count.map(point => point.backgroundColor),
                  yAxisID: 'left-y-axis',
                },
                {
                  label: 'Model Predictions',
                  type: 'scatter', // Use scatter type for discrete prediction points
                  data: predictionPoints.map(point => ({ x: point.x, y: point.y })),
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1,
                  pointBackgroundColor: 'red',
                  yAxisID: 'right-y-axis',
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
                'right-y-axis': {
                  type: 'linear',
                  position: 'right',
                  title: {
                    display: true,
                    text: 'Model Predictions'
                  },
                  grid: {
                    drawOnChartArea: false, 
                  },

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
        } else {
          console.error('chartCanvas is not an instance of HTMLCanvasElement');
        }
      } catch (error) {
        console.error('Error fetching or parsing CSV data:', error);
      }
    };

    fetchData();
  }, [subject, data, label, id, colour]);

  return <canvas id={id}></canvas>;
};

export default PlotChart;
