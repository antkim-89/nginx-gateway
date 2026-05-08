import { Card } from '../../components/Card/Card';
import styles from './Home.module.css';

export function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.badge}>시스템 아키텍처 문서</div>
        <h1 className={styles.title}>Next-Gen Dynamic Gateway</h1>
        <p className={styles.subtitle}>기술 스택, 개발 가이드 및 모듈 연동 명세서</p>
      </div>

      <div className={styles.grid}>
        <Card
          to="/gateway-engine"
          icon="fa-solid fa-bolt"
          title="1. Gateway Engine"
          subtitle="OpenResty & Lua Data Plane"
          description="실시간 트래픽 처리, 인증, Rate Limit, Dynamic Routing을 수행하는 핵심 게이트웨이 엔진."
          color="emerald"
        />
        <Card
          to="/backend-api"
          icon="fa-solid fa-server"
          title="2. Control Plane API"
          subtitle="Backend Admin Service"
          description="라우팅 정책, API Key, 서비스 설정을 관리하고 상태 저장소(Redis)와 동기화하는 백엔드 서버."
          color="blue"
        />
        <Card
          to="/admin-dashboard"
          icon="fa-solid fa-display"
          title="3. Admin Dashboard"
          subtitle="Frontend Management UI"
          description="시스템 모니터링, 실시간 설정 변경 및 운영을 위한 직관적인 관리자용 웹 대시보드."
          color="purple"
        />
        <Card
          to="/sre-devops"
          icon="fa-solid fa-network-wired"
          title="4. Observability & Infra"
          subtitle="SRE & DevOps"
          description="Prometheus, Grafana 기반의 모니터링 환경 및 Docker 기반의 시스템 인프라 배포 구성."
          color="amber"
        />
        <Card
          to="/architecture"
          icon="fa-solid fa-sitemap"
          title="System Architecture Blueprint"
          subtitle="전체 시스템 아키텍처 다이어그램 보기"
          description="전체 시스템 아키텍처 다이어그램 보기 (gateway.html)"
          color="slate"
          colSpan={2}
          center={true}
        />
      </div>
    </div>
  );
}
