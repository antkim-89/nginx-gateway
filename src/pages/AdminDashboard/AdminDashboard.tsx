import { Link } from 'react-router-dom';
import styles from '../GuideStyles.module.css';

export function AdminDashboard() {
  return (
    <div className={styles.container}>
      <div className={styles.backNav}>
        <Link to="/" className={styles.backBtn}>
          <i className="fa-solid fa-arrow-left"></i> 메인으로 돌아가기
        </Link>
      </div>
      
      <div className={styles.header}>
        <div className={`${styles.badge} ${styles.badgePurple}`}>Frontend Management UI</div>
        <h1 className={styles.title}>3. Admin Dashboard</h1>
        <p className={styles.subtitle}>상태 추적 및 동적 제어를 위한 통합 웹 애플리케이션 가이드</p>
      </div>
      
      <div className={styles.content}>
        <div className={styles.card}>
          <div className={`${styles.cardLine} ${styles.linePurple}`}></div>
          <h3 className={styles.cardTitle}>
            <i className={`fa-solid fa-layer-group ${styles.iconWrap} ${styles.iconPurple}`}></i> 기술 스택 (Tech Stack)
          </h3>
          <div className={styles.grid3}>
            <div className={styles.techBox}>
              <h4 className={styles.techTitle}><i className={`fa-brands fa-react ${styles.textSky}`}></i> React 18 & Vite</h4>
              <p className={styles.techDesc}>컴포넌트 기반 UI 구성 및 매우 빠른 HMR(Hot Module Replacement) 지원.</p>
            </div>
            <div className={styles.techBox}>
              <h4 className={styles.techTitle}><i className={`fa-solid fa-paintbrush ${styles.textPink}`}></i> Tailwind CSS</h4>
              <p className={styles.techDesc}>유틸리티 클래스 기반으로 일관된 다크 테마 디자인 시스템을 신속하게 구축.</p>
            </div>
            <div className={styles.techBox}>
              <h4 className={styles.techTitle}><i className={`fa-solid fa-chart-pie ${styles.textAmber}`}></i> Zustand / React Query</h4>
              <p className={styles.techDesc}>글로벌 상태 관리 및 서버 상태(API 데이터) 동기화, 캐싱 처리.</p>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>
            <i className={`fa-solid fa-laptop-code ${styles.iconWrap} ${styles.iconPurple}`}></i> 코드 예시 (React Component)
          </h3>
          <p className={styles.codeDesc}>특정 서비스의 트래픽 라우팅을 실시간으로 켜고 끄는 토글 컴포넌트입니다.</p>
          <div className={styles.codeBox}>
<pre><code className={`${styles.code} ${styles.codePink}`}>
{`import { useState } from 'react';
import { api } from '@/lib/api'; // Axios instance

export default function ServiceToggle({ domain, initialStatus }) {
  const [isActive, setIsActive] = useState(initialStatus === 'active');
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const newStatus = isActive ? 'inactive' : 'active';
      // Backend API 호출로 Gateway의 Redis 상태 실시간 변경
      await api.patch(\`/services/\${domain}/status\`, { status: newStatus });
      setIsActive(!isActive);
      // 토스트 알림: "Gateway 반영 완료"
    } catch (error) {
      console.error('Failed to update status');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleToggle} disabled={isLoading}
      className={\`px-4 py-2 rounded-full font-bold \${isActive ? 'bg-emerald-500 text-white' : 'bg-slate-600 text-slate-300'}\`}
    >
      {isActive ? 'ON' : 'OFF'}
    </button>
  );
}`}
</code></pre>
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>
            <i className={`fa-solid fa-gears ${styles.iconWrap} ${styles.iconPurple}`}></i> 환경 변수 및 연동 (Configuration)
          </h3>
          <p className={styles.codeDesc}>Vite를 위한 환경 변수(<code className={`${styles.inlineCode} ${styles.codePurple}`}>.env</code>) 파일 예시입니다.</p>
          <div className={styles.codeBox}>
<pre><code className={`${styles.code} ${styles.codeSky}`}>
{`# .env
# Control Plane API 서버 주소 (모든 제어 명령의 목적지)
VITE_API_BASE_URL=http://admin-api.gateway.local/api/v1

# 모니터링 대시보드(Grafana) 임베드 URL
VITE_GRAFANA_EMBED_URL=http://grafana.gateway.local/d-solo/metrics`}
</code></pre>
          </div>
        </div>

        <div className={`${styles.card} ${styles.techBox}`}>
          <h3 className={styles.cardTitle}>
            <i className={`fa-solid fa-book ${styles.iconWrap} ${styles.iconSlate}`}></i> 개발 가이드 (Development Guide)
          </h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <i className={`fa-solid fa-chevron-right ${styles.listIcon} ${styles.textPurple}`}></i>
              <div><strong style={{color: 'white'}}>직관적인 피드백:</strong> 사용자가 설정을 변경하면(예: API 키 비활성화), Backend에 요청을 보내고 성공 응답을 받은 즉시 UI에 반영 알림을 주어 사용자 경험을 높이세요.</div>
            </li>
            <li className={styles.listItem}>
              <i className={`fa-solid fa-chevron-right ${styles.listIcon} ${styles.textPurple}`}></i>
              <div><strong style={{color: 'white'}}>Axios 인터셉터:</strong> 모든 Backend API 요청에 JWT 토큰을 자동으로 포함시키고, 401 에러 발생 시 자동으로 로그인 페이지로 라우팅하는 처리를 중앙화하세요.</div>
            </li>
            <li className={styles.listItem}>
              <i className={`fa-solid fa-chevron-right ${styles.listIcon} ${styles.textPurple}`}></i>
              <div><strong style={{color: 'white'}}>컴포넌트 재사용성:</strong> 폼, 모달, 버튼 등의 기본 UI 엘리먼트는 공통 컴포넌트로 분리하여 디자인 일관성을 유지하세요.</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
