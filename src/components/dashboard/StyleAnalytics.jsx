import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  LineChart,
  PieChart,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { BarChart as BarChartIcon } from "lucide-react";

const StyleAnalytics = ({ analytics }) => {
  // Sample data for charts
  const monthlyWearData = [
    { month: "Jan", wears: 45 },
    { month: "Feb", wears: 52 },
    { month: "Mar", wears: 38 },
    { month: "Apr", wears: 65 },
    { month: "May", wears: 48 },
    { month: "Jun", wears: 58 },
  ];

  const colorDistributionData = [
    { name: "Blue", value: 35 },
    { name: "Black", value: 25 },
    { name: "White", value: 20 },
    { name: "Gray", value: 15 },
    { name: "Other", value: 5 },
  ];

  const categoryUsageData = [
    { category: "Tops", usage: 40 },
    { category: "Bottoms", usage: 30 },
    { category: "Dresses", usage: 15 },
    { category: "Shoes", usage: 10 },
    { category: "Accessories", usage: 5 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <BarChartIcon className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Style Analytics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Wear Trend */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Monthly Wear Trend
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyWearData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="wears"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Color Distribution */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Color Distribution
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={colorDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {colorDistributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Usage */}
        <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Category Usage
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="usage" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-600">Style Score</h4>
          <p className="text-2xl font-bold text-blue-700">
            {analytics.styleScore}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-green-600">Outfit Variety</h4>
          <p className="text-2xl font-bold text-green-700">
            {analytics.outfitVariety}%
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-purple-600">Most Worn</h4>
          <p className="text-lg font-semibold text-purple-700">
            {analytics.mostWorn[0]}
          </p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-orange-600">
            Favorite Color
          </h4>
          <p className="text-lg font-semibold text-orange-700">
            {analytics.favoriteColors[0]}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default StyleAnalytics;
