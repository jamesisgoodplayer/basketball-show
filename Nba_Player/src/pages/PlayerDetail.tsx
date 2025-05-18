import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { players } from '../data/players';
import './PlayerDetail.scss';
import PlayerStatsBarChart from '../components/PlayerStatsBarChart';
import PlayerHonorProgress from '../components/PlayerHonorProgress';
import PlayerCareerTimeline from '../components/PlayerCareerTimeline';
import Confetti from '../components/Confetti';

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

const PlayerDetail: React.FC = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const player = players.find(p => p.运动员 === name);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<{name: string, content: string, time: string}[]>([]);
  const [commentName, setCommentName] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const likeBtnRef = useRef<HTMLButtonElement>(null);
  const [commentAnimIndex, setCommentAnimIndex] = useState<number|null>(null);
  const [confettiTrigger, setConfettiTrigger] = useState(false);

  useEffect(() => {
    if (!player) return;
    const likeData = JSON.parse(localStorage.getItem('nba_likes') || '{}');
    setLiked(!!likeData[player.运动员]?.liked);
    setLikeCount(likeData[player.运动员]?.count || 0);
    const commentData = JSON.parse(localStorage.getItem('nba_comments') || '{}');
    setComments(commentData[player.运动员] || []);
  }, [player]);

  useEffect(() => {
    const btn = likeBtnRef.current;
    if (!btn) return;
    const handleEnd = () => btn.classList.remove('animated');
    btn.addEventListener('animationend', handleEnd);
    return () => btn.removeEventListener('animationend', handleEnd);
  }, []);

  useEffect(() => {
    setConfettiTrigger(true);
  }, [player]);

  const handleLike = () => {
    if (!player) return;
    const likeData = JSON.parse(localStorage.getItem('nba_likes') || '{}');
    if (liked) {
      likeData[player.运动员] = { count: Math.max(0, likeCount - 1), liked: false };
      setLikeCount(Math.max(0, likeCount - 1));
      setLiked(false);
    } else {
      likeData[player.运动员] = { count: likeCount + 1, liked: true };
      setLikeCount(likeCount + 1);
      setLiked(true);
    }
    localStorage.setItem('nba_likes', JSON.stringify(likeData));
    if (likeBtnRef.current) {
      likeBtnRef.current.classList.remove('animated');
      void likeBtnRef.current.offsetWidth;
      likeBtnRef.current.classList.add('animated');
    }
    setConfettiTrigger(true);
  };

  const handleComment = () => {
    if (!player || !commentContent.trim()) return;
    const commentData = JSON.parse(localStorage.getItem('nba_comments') || '{}');
    const newComment = {
      name: commentName.trim() || '匿名',
      content: commentContent.trim(),
      time: new Date().toLocaleString(),
    };
    const updated = [...(commentData[player.运动员] || []), newComment];
    commentData[player.运动员] = updated;
    localStorage.setItem('nba_comments', JSON.stringify(commentData));
    setComments(updated);
    setCommentContent('');
    setCommentAnimIndex(updated.length - 1);
    setTimeout(() => setCommentAnimIndex(null), 900);
    setConfettiTrigger(true);
  };

  const handleDeleteComment = (index: number) => {
    if (!player) return;
    const commentData = JSON.parse(localStorage.getItem('nba_comments') || '{}');
    const updated = [...(commentData[player.运动员] || [])];
    updated.splice(index, 1);
    commentData[player.运动员] = updated;
    localStorage.setItem('nba_comments', JSON.stringify(commentData));
    setComments(updated);
  };

  if (!player) {
    return <div style={{ padding: 40, textAlign: 'center' }}>未找到该球员信息</div>;
  }

  return (
    <>
      <Confetti trigger={confettiTrigger} onEnd={() => setConfettiTrigger(false)} />
      <div className="player-detail-page">
        {/* 左侧运动动画元素 */}
        <div className="player-detail-anim player-detail-anim-left">
          <div className="anim-item anim-basketball">
            <svg viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" fill="#fcb514" stroke="#e03a3e" strokeWidth="4"/>
              <path d="M24 2 A22 22 0 0 1 24 46" stroke="#e03a3e" strokeWidth="3"/>
              <path d="M2 24 A22 22 0 0 1 46 24" stroke="#e03a3e" strokeWidth="3"/>
            </svg>
          </div>
          <div className="anim-item anim-trophy">
            <svg viewBox="0 0 48 48" fill="none">
              <rect x="14" y="36" width="20" height="6" rx="2" fill="#bdbdbd"/>
              <ellipse cx="24" cy="24" rx="10" ry="14" fill="#fcb514" stroke="#e03a3e" strokeWidth="2"/>
              <rect x="20" y="40" width="8" height="4" rx="2" fill="#e03a3e"/>
            </svg>
          </div>
          <div className="anim-item anim-hoop">
            <svg viewBox="0 0 48 48" fill="none">
              <ellipse cx="24" cy="10" rx="14" ry="6" fill="#fff" stroke="#17408b" strokeWidth="2"/>
              <path d="M10 10 L24 44 L38 10" stroke="#e03a3e" strokeWidth="2" fill="none"/>
              <path d="M16 10 L24 44 L32 10" stroke="#fcb514" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          {/* 篮球火焰 */}
          <div className="anim-item anim-fireball">
            <svg viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="30" r="10" fill="#fcb514" stroke="#e03a3e" strokeWidth="2"/>
              <path d="M24 10 Q28 18 24 30 Q20 18 24 10" fill="#e03a3e" fillOpacity="0.7"/>
              <path d="M24 10 Q26 20 28 24 Q26 18 24 10" fill="#fcb514" fillOpacity="0.7"/>
            </svg>
          </div>
          {/* 跳跃球员剪影 */}
          <div className="anim-item anim-player">
            <svg viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="10" r="5" fill="#17408b"/>
              <rect x="21" y="15" width="6" height="16" rx="3" fill="#17408b"/>
              <rect x="18" y="31" width="12" height="4" rx="2" fill="#e03a3e"/>
              <rect x="22" y="35" width="4" height="8" rx="2" fill="#fcb514"/>
            </svg>
          </div>
          {/* 星星 */}
          <div className="anim-item anim-star">
            <svg viewBox="0 0 48 48" fill="none">
              <polygon points="24,6 28,20 42,20 30,28 34,42 24,34 14,42 18,28 6,20 20,20" fill="#fcb514" stroke="#e03a3e" strokeWidth="1.5"/>
            </svg>
          </div>
        </div>
        {/* 右侧运动动画元素 */}
        <div className="player-detail-anim player-detail-anim-right">
          <div className="anim-item anim-shoe" style={{fontSize: 38, lineHeight: '48px'}}>👟</div>
          <div className="anim-item anim-jersey" style={{fontSize: 38, lineHeight: '48px'}}>🏀</div>
          <div className="anim-item anim-lightning" style={{fontSize: 38, lineHeight: '48px'}}>⚡</div>
          {/* 奖牌 */}
          <div className="anim-item anim-medal">
            <svg viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="32" r="10" fill="#fcb514" stroke="#e03a3e" strokeWidth="2"/>
              <rect x="20" y="8" width="8" height="18" rx="4" fill="#17408b"/>
              <rect x="22" y="4" width="4" height="8" rx="2" fill="#e03a3e"/>
            </svg>
          </div>
          {/* 哨子 */}
          <div className="anim-item anim-whistle">
            <svg viewBox="0 0 48 48" fill="none">
              <rect x="10" y="20" width="28" height="12" rx="6" fill="#bdbdbd" stroke="#17408b" strokeWidth="2"/>
              <circle cx="38" cy="26" r="4" fill="#e03a3e"/>
              <rect x="6" y="24" width="8" height="4" rx="2" fill="#fcb514"/>
            </svg>
          </div>
          {/* 星星 */}
          <div className="anim-item anim-star">
            <svg viewBox="0 0 48 48" fill="none">
              <polygon points="24,6 28,20 42,20 30,28 34,42 24,34 14,42 18,28 6,20 20,20" fill="#fcb514" stroke="#e03a3e" strokeWidth="1.5"/>
            </svg>
          </div>
        </div>
        {/* 主内容区 */}
        <div className="player-detail-content-center">
          <button className="back-btn" onClick={() => navigate('/?main=1')}>← 返回主页面</button>
          <div className="player-detail-card">
            <img
              className="player-detail-avatar"
              src={`/players/${playerImgMap[player.运动员] || 'default.png'}`}
              alt={player.运动员}
              onError={e => (e.currentTarget.src = '/players/default.png')}
            />
            <h2 className="player-detail-name">{player.运动员}</h2>
            <div className="player-detail-basic">
              <span>🎂 {player.基本信息.年龄}</span>
              <span>🌏 {player.基本信息.国家}</span>
              <span>📏 {player.基本信息.身高}</span>
              <span>⚖️ {player.基本信息.体重}</span>
              <span>🏀 {player.基本信息.绰号}</span>
              <span>🏢 {player.基本信息.效力球队}</span>
              <span>⏳ {player.基本信息.生涯年限}</span>
            </div>
            <div className="player-detail-section">
              <div className="section-title-with-icon">
                <svg className="section-icon" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#fcb514" stroke="#e03a3e" strokeWidth="2" /><path d="M16 4v24" stroke="#e03a3e" strokeWidth="2" /><path d="M4 16h24" stroke="#e03a3e" strokeWidth="2" /></svg>
                <h3>🏆 荣誉与数据</h3>
              </div>
              <div style={{marginBottom: 16}}>
                <div style={{fontWeight: 500, color: '#17408b', marginBottom: 8}}>生涯场均数据</div>
                <PlayerStatsBarChart
                  data={parseStatsBarData(player.荣誉与数据.关键数据)}
                />
              </div>
              <PlayerHonorProgress
                data={parseHonorProgressData(player.荣誉与数据.主要荣誉)}
              />
            </div>
            <div className="player-detail-section">
              <div className="section-title-with-icon">
                <svg className="section-icon" viewBox="0 0 32 32"><rect x="6" y="8" width="20" height="16" rx="4" fill="#17408b" opacity="0.18" /><rect x="12" y="4" width="8" height="8" rx="4" fill="#fcb514" /></svg>
                <h3>🏅 职业生涯轨迹</h3>
              </div>
              <PlayerCareerTimeline data={parseCareerTimeline(player.职业生涯轨迹)} />
            </div>
            {/* 历史地位评价与经典语录合并风格 */}
            <div className="player-detail-section player-detail-honor-section">
              <div className="section-title-with-icon" style={{marginBottom: '0.6em'}}>
                <span className="player-detail-honor-icon">
                  <svg width="28" height="28" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#fcb514" stroke="#e03a3e" strokeWidth="2" /><path d="M16 4v24" stroke="#e03a3e" strokeWidth="2" /><path d="M4 16h24" stroke="#e03a3e" strokeWidth="2" /></svg>
                </span>
                <h3 style={{margin: 0, color: '#17408b', fontWeight: 700, fontSize: '1.13rem', display: 'flex', alignItems: 'center'}}>
                  📜 历史地位评价
                </h3>
              </div>
              <div className="player-detail-honor">{player.历史地位评价}</div>
            </div>
            <div className="player-detail-section player-detail-quote-section">
              <div className="section-title-with-icon" style={{marginBottom: '0.6em'}}>
                <span className="player-detail-honor-icon" style={{background: 'linear-gradient(135deg, #e03a3e 60%, #fcb514 100%)'}}>
                  <svg width="28" height="28" viewBox="0 0 32 32"><rect x="4" y="8" width="24" height="16" rx="8" fill="#e03a3e" opacity="0.13" /><path d="M8 16h16" stroke="#e03a3e" strokeWidth="2" /></svg>
                </span>
                <h3 style={{margin: 0, color: '#e03a3e', fontWeight: 700, fontSize: '1.13rem', display: 'flex', alignItems: 'center'}}>
                  💬 经典语录
                </h3>
              </div>
              <div className="player-detail-quote">{`"${player.经典语录}"`}</div>
            </div>
            {/* 点赞和评论区 */}
            <div className="player-detail-interact">
              <button ref={likeBtnRef} className={`like-btn${liked ? ' liked' : ''}`} onClick={handleLike}>
                {liked ? '👍 已点赞' : '👍 点赞'} <span>{likeCount}</span>
              </button>
              <div className="comment-section">
                <div className="comment-title">评论区</div>
                <div className="comment-list">
                  {comments.length === 0 && <div className="comment-empty">暂无评论，快来抢沙发！</div>}
                  {comments.map((c, i) => (
                    <div className={`comment-item${commentAnimIndex === i ? ' animated' : ''}`} key={i}>
                      <span className="comment-name">{c.name}</span>
                      <span className="comment-time">{c.time}</span>
                      <button className="comment-delete" title="删除" onClick={() => handleDeleteComment(i)}>
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="4.5" y="8.5" width="11" height="7" rx="2" fill="#fff" stroke="#e03a3e" strokeWidth="1.2"/><rect x="8.5" y="3.5" width="3" height="2" rx="1" fill="#e03a3e"/><rect x="6" y="5" width="8" height="2" rx="1" fill="#e03a3e"/><path d="M8 11v3M10 11v3M12 11v3" stroke="#e03a3e" strokeWidth="1.2" strokeLinecap="round"/></svg>
                      </button>
                      <div className="comment-content">{c.content}</div>
                    </div>
                  ))}
                </div>
                <div className="comment-form">
                  <input
                    className="comment-input"
                    placeholder="昵称(可选)"
                    value={commentName}
                    onChange={e => setCommentName(e.target.value)}
                    maxLength={12}
                  />
                  <textarea
                    className="comment-textarea"
                    placeholder="写下你的评论..."
                    value={commentContent}
                    onChange={e => setCommentContent(e.target.value)}
                    maxLength={120}
                  />
                  <button className="comment-submit" onClick={handleComment}>发布</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerDetail;

function parseStatsBarData(str: string) {
  const map: Record<string, string> = { '分': '得分', '篮板': '篮板', '助攻': '助攻', '抢断': '抢断', '盖帽': '盖帽' };
  const result = [];
  for (const key in map) {
    const reg = new RegExp(`([\\d.]+)${key}`);
    const m = str.match(reg);
    if (m) {
      result.push({ label: map[key], value: parseFloat(m[1]) });
    }
  }
  return result;
}

function parseHonorProgressData(str: string) {
  const items = [
    { label: '总冠军', max: 7, color: '#fcb514' },
    { label: 'FMVP', max: 6, color: '#e03a3e' },
    { label: 'MVP', max: 6, color: '#1976d2' },
    { label: '一阵', max: 15, color: '#43a047' },
    { label: '一防', max: 12, color: '#8e24aa' },
    { label: '得分王', max: 12, color: '#ff9800' },
    { label: '全明星', max: 20, color: '#00bcd4' },
    { label: 'DPOY', max: 4, color: '#607d8b' },
    { label: '助攻王', max: 10, color: '#009688' },
    { label: '抢断王', max: 5, color: '#cddc39' },
    { label: '盖帽王', max: 5, color: '#795548' },
  ];
  return items.map(item => {
    const reg = new RegExp(`(\\d+)次?${item.label}`);
    const m = str.match(reg);
    return {
      label: item.label,
      value: m ? parseInt(m[1]) : 0,
      max: item.max,
      color: item.color,
    };
  }).filter(i => i.value > 0);
}

function parseCareerTimeline(str: string) {
  const arr = str.split(/[，。；;\n]/).map(s => s.trim()).filter(Boolean);
  return arr.map((item, idx) => {
    const yearMatch = item.match(/(\d{4}[年-]?)/);
    const teamMatch = item.match(/(公牛|湖人|勇士|热火|马刺|凯尔特人|太阳|篮网|雄鹿|76人|掘金|尼克斯|森林狼|独行侠|火箭|爵士|奇才|黄蜂|活塞|开拓者|雷霆|太阳|雄鹿|骑士|快船|猛龙|国王|步行者|灰熊|鹈鹕|老鹰|魔术|雷霆|超音速|太阳|太阳队|队)/);
    return {
      year: yearMatch ? yearMatch[1] : '',
      team: teamMatch ? teamMatch[0] : '',
      event: item,
      color: idx === 0 ? '#fcb514' : idx === arr.length - 1 ? '#e03a3e' : '#1976d2',
    };
  });
}