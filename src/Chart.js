import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js';

const API_URL = 'https://www.jsonkeeper.com/b/P2VO';

const ChartComponent = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(API_URL);
      setData(response.data);
    };
    fetchData();
  }, []);

  const filterDataByDate = () => {
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.item_date);
      const selectedDateCopy = new Date(selectedDate);
      return itemDate.setHours(0, 0, 0, 0) === selectedDateCopy.setHours(0, 0, 0, 0);
    });
    const groupedData = {};
    filteredData.forEach((item) => {
      const date = item.scheduled_date;
      if (date in groupedData) {
        groupedData[date] += 1;
      } else {
        groupedData[date] = 1;
      }
    });
    return groupedData;
  };

  const chartValues = Object.values(filterDataByDate());

  useEffect(() => {
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(filterDataByDate()),
        datasets: [{
          label: 'Scheduled',
          data: chartValues,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    return () => {
      myChart.destroy();
    };
  }, [data, selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  return (
    <div>
      <label htmlFor="date">Select a date:</label>
      <input type="date" id="date" value={selectedDate.toISOString().slice(0, 10)} onChange={handleDateChange} />

      <canvas id="myChart"></canvas>
    </div>
  );
};

export default ChartComponent;
