'use client'
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import Papa from 'papaparse';

const PlotChart = ({ session, subject, data, label, id, colour }) => {
  const chartRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      try {
        // Fetch CSV data
        const csvResponse = await fetch('./processed_coolbit.csv');
        if (!csvResponse.ok) {
          throw new Error('Failed to fetch CSV data');
        }
        const csvData = await csvResponse.text();
        const parsedData = Papa.parse(csvData, { header: true }).data;

        // Filter CSV data
        const filteredData = parsedData.filter(row => row['Subject No.'] === subject && row['Phase'] === 'Activity' && row['Session'] == session);

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
                }
              ]
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
  }, [session, subject, data, label, id, colour]);

  return <canvas id={id}></canvas>;
};

export default PlotChart;
