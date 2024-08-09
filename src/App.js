import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Search, MapPin, Star, TrendingUp, Users, MessageCircle } from 'lucide-react';

// モックデータ
const mockStoreData = {
  name: "自店舗",
  rating: 4.2,
  reviews: 120,
  category: "イタリアンレストラン"
};

const mockCompetitors = [
  { id: 1, name: "競合A", rating: 4.0, reviews: 95, distance: 0.5 },
  { id: 2, name: "競合B", rating: 4.3, reviews: 150, distance: 0.8 },
  { id: 3, name: "競合C", rating: 3.8, reviews: 80, distance: 1.2 },
];

const reviewTrendData = [
  { month: '1月', 自店舗: 4.0, 競合A: 3.8, 競合B: 4.1, 競合C: 3.7 },
  { month: '2月', 自店舗: 4.1, 競合A: 3.9, 競合B: 4.2, 競合C: 3.8 },
  { month: '3月', 自店舗: 4.2, 競合A: 4.0, 競合B: 4.2, 競合C: 3.9 },
  { month: '4月', 自店舗: 4.2, 競合A: 4.1, 競合B: 4.3, 競合C: 3.8 },
  { month: '5月', 自店舗: 4.3, 競合A: 4.0, 競合B: 4.3, 競合C: 3.9 },
  { month: '6月', 自店舗: 4.2, 競合A: 4.0, 競合B: 4.4, 競合C: 3.8 },
];

const popularTimesData = [
  { time: '10:00', 自店舗: 30, 競合A: 25, 競合B: 35, 競合C: 20 },
  { time: '12:00', 自店舗: 90, 競合A: 85, 競合B: 95, 競合C: 80 },
  { time: '14:00', 自店舗: 60, 競合A: 55, 競合B: 65, 競合C: 50 },
  { time: '16:00', 自店舗: 40, 競合A: 35, 競合B: 45, 競合C: 30 },
  { time: '18:00', 自店舗: 85, 競合A: 80, 競合B: 90, 競合C: 75 },
  { time: '20:00', 自店舗: 70, 競合A: 65, 競合B: 75, 競合C: 60 },
];

const keywordData = [
  { aspect: 'サービス', 自店舗: 4.5, 競合A: 4.2, 競合B: 4.6, 競合C: 3.9 },
  { aspect: '料理の味', 自店舗: 4.7, 競合A: 4.5, 競合B: 4.8, 競合C: 4.2 },
  { aspect: '雰囲気', 自店舗: 4.3, 競合A: 4.0, 競合B: 4.5, 競合C: 3.8 },
  { aspect: 'コスパ', 自店舗: 4.0, 競合A: 4.2, 競合B: 3.9, 競合C: 4.1 },
  { aspect: '清潔さ', 自店舗: 4.6, 競合A: 4.3, 競合B: 4.7, 競合C: 4.0 },
];

const CompetitiveAnalysisDashboard = () => {
  const [selectedCompetitor, setSelectedCompetitor] = useState(null);

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">競合比較分析ダッシュボード</h1>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-lg font-semibold mb-2">自店舗情報</h2>
        <div className="flex items-center space-x-4">
          <div>
            <strong>{mockStoreData.name}</strong>
            <p>{mockStoreData.category}</p>
          </div>
          <div className="flex items-center">
            <Star className="text-yellow-500 mr-1" />
            <span>{mockStoreData.rating}</span>
          </div>
          <div>
            <MessageCircle className="inline mr-1" />
            <span>{mockStoreData.reviews} レビュー</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-lg font-semibold mb-2">近隣の競合店舗</h2>
        <div className="space-y-2">
          {mockCompetitors.map(competitor => (
            <div key={competitor.id} className="flex items-center justify-between p-2 border rounded">
              <div>
                <strong>{competitor.name}</strong>
                <p className="text-sm text-gray-600">
                  <MapPin className="inline mr-1" size={14} />
                  {competitor.distance}km
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <Star className="inline text-yellow-500 mr-1" />
                  <span>{competitor.rating}</span>
                </div>
                <div>
                  <MessageCircle className="inline mr-1" />
                  <span>{competitor.reviews}</span>
                </div>
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => setSelectedCompetitor(competitor)}
                >
                  比較
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCompetitor && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">評価スコアトレンド</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={reviewTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="自店舗" stroke="#8884d8" />
                <Line type="monotone" dataKey={selectedCompetitor.name} stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">人気の時間帯比較</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={popularTimesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="自店舗" fill="#8884d8" />
                <Bar dataKey={selectedCompetitor.name} fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">主要評価項目の比較</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={keywordData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="aspect" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} />
                <Radar name="自店舗" dataKey="自店舗" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name={selectedCompetitor.name} dataKey={selectedCompetitor.name} stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">AI分析レポート</h2>
            <p>
              自店舗と{selectedCompetitor.name}の比較分析結果：
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>評価スコアトレンド：自店舗は過去6ヶ月で着実に評価を上げており、{selectedCompetitor.name}を上回っています。特に3月以降の改善が顕著です。</li>
              <li>人気時間帯：ランチ（12:00）とディナー（18:00）のピーク時に、自店舗は{selectedCompetitor.name}よりもやや高い集客を示しています。一方で、14:00-16:00の時間帯は{selectedCompetitor.name}の方が集客に成功しています。</li>
              <li>主要評価項目：「料理の味」と「サービス」で自店舗が優位にありますが、「コスパ」では{selectedCompetitor.name}がわずかに上回っています。「雰囲気」の評価が最も開きがあり、改善の余地があります。</li>
            </ul>
            <p className="mt-4 font-semibold">改善提案：</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>14:00-16:00の時間帯に特別なアフタヌーンメニューや割引を導入し、集客を増やす。</li>
              <li>「コスパ」の向上のため、値ごろ感のあるセットメニューや定期的な特別オファーを検討する。</li>
              <li>「雰囲気」の改善のため、店内装飾の見直しやBGMの選定など、顧客体験を向上させる取り組みを行う。</li>
              <li>{selectedCompetitor.name}の成功戦略（特に評価の高い項目）を分析し、自店舗に適用できる点を検討する。</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetitiveAnalysisDashboard;
