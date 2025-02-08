
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule, PaginationModule, TextFilterModule, NumberFilterModule, DateFilterModule } from 'ag-grid-community';
import toast from "react-hot-toast";
// Import technical analysis functions
import {
  validateStockData,
  calculateSMA,
  calculateEMA,
  calculateRSI,
  calculateMACD,
  calculateBollingerBands,
  calculateStochasticOscillator,
  calculateATR,
  calculateFibonacciRetracement,
  calculateVWAP,
  calculateParabolicSAR
} from './technical-analysis/technicalAnalysis';

// Register the necessary modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule
]);

export function Tables() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(stocks);

  const fetchStockData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/data/stocks");
      setStocks(response.data);
      toast.success('Data updated successfully!');
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setError("Error fetching stock data");
      toast.error('Error fetching stock data');
    }
  };

  useEffect(() => {
    fetchStockData();
    const interval = setInterval(() => {
      fetchStockData();
    }, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const processedStocks = useMemo(() => {
    const validStocks = validateStockData(stocks);
    let result = calculateSMA(validStocks, 10); // 10-day SMA
    result = calculateEMA(result, 10); // 10-day EMA
    result = calculateRSI(result); // 14-day RSI
    result = calculateMACD(result); // MACD
    result = calculateBollingerBands(result); // Bollinger Bands
    result = calculateStochasticOscillator(result); // Stochastic Oscillator
    result = calculateATR(result); // ATR
    result = calculateFibonacciRetracement(result); // Fibonacci Retracement
    result = calculateVWAP(result); // VWAP
    result = calculateParabolicSAR(result); // Parabolic SAR
    return result;
  }, [stocks]);

  const columnDefs = useMemo(() => [
    { headerName: "Symbol", field: "symbol", cellStyle: { backgroundColor: '#f5f5f5' } },
    { headerName: "Open", field: "open", cellStyle: { backgroundColor: '#fff3e0' } },
    { headerName: "High", field: "dayHigh", cellStyle: { backgroundColor: '#e1f5fe' } },
    { headerName: "Low", field: "dayLow", cellStyle: { backgroundColor: '#ffebee' } },
    { headerName: "Last Price", field: "lastPrice", cellStyle: { backgroundColor: '#e8f5e9' } },
    { headerName: "Change", field: "change", cellStyle: { backgroundColor: '#f3e5f5' }, valueFormatter: params => `${params.value} (${params.data.pChange}%)` },
    { headerName: "Volume", field: "totalTradedVolume", cellStyle: { backgroundColor: '#f5f5f5' } },
    { headerName: "Previous Close", field: "previousClose", cellStyle: { backgroundColor: '#fff3e0' } },
    { headerName: "PChange", field: "pChange", cellStyle: { backgroundColor: '#e1f5fe' } },
    { headerName: "Total Traded Value", field: "totalTradedValue", cellStyle: { backgroundColor: '#ffebee' } },
    { headerName: "Last Update Time", field: "lastUpdateTime", cellStyle: { backgroundColor: '#e8f5e9' } },
    { headerName: "Year High", field: "yearHigh", cellStyle: { backgroundColor: '#f3e5f5' } },
    { headerName: "Year Low", field: "yearLow", cellStyle: { backgroundColor: '#f5f5f5' } },
    { headerName: "Per Change 365d", field: "perChange365d", cellStyle: { backgroundColor: '#fff3e0' } },
    { headerName: "Date 365d Ago", field: "date365dAgo", cellStyle: { backgroundColor: '#e1f5fe' } },
    { headerName: "Date 30d Ago", field: "date30dAgo", cellStyle: { backgroundColor: '#ffebee' } },
    { headerName: "Per Change 30d", field: "perChange30d", cellStyle: { backgroundColor: '#e8f5e9' } },
    { headerName: "10-Day SMA", field: "sma", cellStyle: { backgroundColor: '#ffe0b2' }, valueFormatter: params => isNaN(params.value) ? '' : params.value },
    { headerName: "10-Day EMA", field: "ema", cellStyle: { backgroundColor: '#ffe0b2' }, valueFormatter: params => isNaN(params.value) ? '' : params.value },
    { headerName: "RSI", field: "rsi", cellStyle: { backgroundColor: '#dcedc8' }, valueFormatter: params => isNaN(params.value) ? '' : params.value },
    { headerName: "MACD", field: "macd", cellStyle: { backgroundColor: '#ffcdd2' }, valueFormatter: params => isNaN(params.value) ? '' : params.value },
    { headerName: "MACD Signal Line", field: "signalLine", cellStyle: { backgroundColor: '#ffcdd2' }, valueFormatter: params => isNaN(params.value) ? '' : params.value },
    { headerName: "MACD Histogram", field: "histogram", cellStyle: { backgroundColor: '#ffcdd2' }, valueFormatter: params => isNaN(params.value) ? '' : params.value },
    { headerName: "Upper Bollinger Band", field: "upperBand", cellStyle: { backgroundColor: '#bbdefb' }, valueFormatter: params => isNaN(params.value) ? '' : params.value },
    { headerName: "Lower Bollinger Band", field: "lowerBand", cellStyle: { backgroundColor: '#bbdefb' }, valueFormatter: params => isNaN(params.value) ? '' : params.value },
    { headerName: "Stochastic Oscillator", field: "stochasticOscillator", cellStyle: { backgroundColor: '#d1c4e9' }, valueFormatter: params => isNaN(params.value) ? '' : params.value },
    { headerName: "ATR", field: "atr", cellStyle: { backgroundColor: '#c8e6c9' }, valueFormatter: params => isNaN(params.value) ? '' : params.value },
    { headerName: "VWAP", field: "vwap", cellStyle: { backgroundColor: '#ffecb3' }, valueFormatter: params => isNaN(params.value) ? '' : params.value },
    { headerName: "Parabolic SAR", field: "parabolicSAR", cellStyle: { backgroundColor: '#ffccbc' }, valueFormatter: params => isNaN(params.value) ? '' : params.value },
  ], []);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Stock Prices List
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {/* {error && <p className="text-red-500">{error}</p>} */}
          {/* <Button 
            variant="gradient" 
            color="gray" 
            onClick={fetchAndStoreLatestData} 
            disabled={loading}
            className="mb-4"
          >
            {loading ? "Loading..." : "Fetch Latest Data"}
          </Button> */}
          <div className="ag-theme-alpine mt-4" style={{ height: 600, width: '100%' }}>
            <AgGridReact
              rowData={processedStocks}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={10}
              defaultColDef={{
                sortable: true,
                filter: true,
                resizable: true,
                floatingFilter: true,
              }}
              modules={[
                ClientSideRowModelModule,
                PaginationModule,
                TextFilterModule,
                NumberFilterModule,
                DateFilterModule
              ]}
              theme="ag-theme-alpine"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;