import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { players } from '../data/players';
import './Home.scss';

const Home: React.FC = () => {
  const location = useLocation();
  const [showMain, setShowMain] = useState(() => {
    return new URLSearchParams(location.search).get('main') === '1';
  });
  const [search, setSearch] = useState('');
  const [team, setTeam] = useState('');
  const navigate = useNavigate();

  // 球队和位置选项
  const teams = Array.from(new Set(players.map(p => p.基本信息.效力球队)));

  // 过滤
  const filtered = players.filter(p => {
    const nameMatch = p.运动员.includes(search);
    const teamMatch = !team || p.基本信息.效力球队 === team;
    return nameMatch && teamMatch;
  });

  const playerImgMap: Record<string, string> = {
    '迈克尔·乔丹': '迈克尔.png',
    '科比·布莱恩特': '科比.png',
    '勒布朗·詹姆斯': '詹姆斯.png',
    '斯蒂芬·库里': '库里.png',
    '凯文·杜兰特': '杜兰特.png',
    '沙奎尔·奥尼尔': '沙奎尔·奥尼尔.png',
    '蒂姆·邓肯': '蒂姆·邓肯.png',
    '阿伦·艾弗森': '艾弗森.png',
    '魔术师约翰逊': '魔术师约翰逊.png',
    '贾巴尔': '贾巴尔.png',
    '拉里·伯德': '拉里·伯德.png',
    '凯文·加内特': '凯文·加内特.png',
    '德克·诺维茨基': '德克·诺维茨基.png',
    '德维恩·韦德': '德维恩·韦德.png',
    '扬尼斯·阿德托昆博': '扬尼斯·阿德托昆博.png',
    '大卫·罗宾逊': '大卫·罗宾逊.png',
    '哈基姆·奥拉朱旺': '哈基姆·奥拉朱旺.png',
    '卡梅罗·安东尼': '卡梅罗·安东尼.png',
    '约翰·斯托克顿': '约翰·斯托克顿.png',
  };

  if (!showMain) {
    // 欢迎页
    return (
      <div className="home-wrapper">
        <div className="home-content with-logo-bg">
          <div className="court-bg" />
          <h1 className="nba-title">NBA 球星展示系统</h1>
          <p className="nba-desc">欢迎来到NBA球员信息展示平台！</p>
          <button className="enter-btn" onClick={() => setShowMain(true)}>
            进入球员世界
          </button>
        </div>
      </div>
    );
  }

  // 主页面
  return (
    <div className="main-page">
      <div className="glow glow1" />
      <div className="glow glow2" />
      <div className="glow glow3" />
      <button className="back-btn" onClick={() => setShowMain(false)}>
        ← 返回欢迎页
      </button>
      <header className="sticky-search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="搜索球员姓名..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="search-select"
          value={team}
          onChange={e => setTeam(e.target.value)}
        >
          <option value="">全部球队</option>
          {teams.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </header>
      <div className="player-grid">
        {filtered.map(player => (
          <div
            className="player-card"
            key={player.运动员}
            onClick={() => navigate(`/player/${encodeURIComponent(player.运动员)}`)}
            style={{ cursor: 'pointer' }}
          >
            <img
              className="player-avatar"
              src={`/players/${playerImgMap[player.运动员] || 'default.png'}`}
              alt={player.运动员}
              onError={e => (e.currentTarget.src = '/players/default.png')}
            />
            <div className="player-info">
              <div className="player-name">{player.运动员}</div>
              <div className="player-detail-row"><span className="player-detail-icon">🎂</span>{player.基本信息.年龄}</div>
              <div className="player-detail-row"><span className="player-detail-icon">🌏</span>{player.基本信息.国家}</div>
              <div className="player-detail-row"><span className="player-detail-icon">📏</span>{player.基本信息.身高} <span className="player-detail-icon">⚖️</span>{player.基本信息.体重}</div>
              <div className="player-detail-row"><span className="player-detail-icon">🏀</span>{player.基本信息.绰号}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="basketball-anim">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="#fcb514" stroke="#e03a3e" strokeWidth="4" />
          <path d="M32 2 A30 30 0 0 1 32 62" stroke="#e03a3e" strokeWidth="3" />
          <path d="M2 32 A30 30 0 0 1 62 32" stroke="#e03a3e" strokeWidth="3" />
        </svg>
      </div>
      {/* 左侧体育动画元素 */}
      <div className="sports-anim sports-anim-left">
        <div className="sports-icon icon-basketball" />
        <div className="sports-icon icon-trophy" />
        <div className="sports-icon icon-hoop" />
      </div>
      {/* 右侧体育动画元素 */}
      <div className="sports-anim sports-anim-right">
        <div className="sports-icon icon-basketball" />
        <div className="sports-icon icon-trophy" />
        <div className="sports-icon icon-hoop" />
      </div>
      {/* 动态粒子流动 */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${8 + Math.random() * 84}%`,
            bottom: `${Math.random() * 20}vh`,
            width: `${8 + Math.random() * 12}px`,
            height: `${8 + Math.random() * 12}px`,
            animationDelay: `${Math.random() * 8}s`
          }}
        />
      ))}
      {/* NBA logo 左上角半透明装饰 */}
      <img className="nba-logo-bg" src="/players/nba_logo.png" alt="NBA Logo" />
      {/* 球员剪影SVG装饰 */}
      <svg className="player-silhouette silhouette1" viewBox="0 0 64 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="32" cy="20" rx="12" ry="16" fill="#fff2" />
        <rect x="24" y="36" width="16" height="40" rx="8" fill="#fff2" />
      </svg>
      <svg className="player-silhouette silhouette2" viewBox="0 0 64 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="32" cy="20" rx="12" ry="16" fill="#fff2" />
        <rect x="24" y="36" width="16" height="40" rx="8" fill="#fff2" />
      </svg>
      {/* 动态聚光灯 */}
      <div className="spotlight spotlight1" />
      <div className="spotlight spotlight2" />
    </div>
  );
};

export default Home; 