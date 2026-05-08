import { Link } from 'react-router-dom';
import styles from '../GuideStyles.module.css';

export function SreDevops() {
  return (
    <div className={styles.container}>
      <div className={styles.backNav}>
        <Link to="/" className={styles.backBtn}>
          <i className="fa-solid fa-arrow-left"></i> 메인으로 돌아가기
        </Link>
      </div>
      
      <div className={styles.header}>
        <div className={`${styles.badge} ${styles.badgeAmber}`}>SRE & DevOps (L6)</div>
        <h1 className={styles.title}>4. Observability & Infra</h1>
        <p className={styles.subtitle}>가시성 확보 및 컨테이너 기반 인프라 배포 시스템 명세</p>
      </div>
      
      <div className={styles.content}>
        <div className={styles.card}>
          <div className={`${styles.cardLine} ${styles.lineAmber}`}></div>
          <h3 className={styles.cardTitle}>
            <i className={`fa-solid fa-layer-group ${styles.iconWrap} ${styles.iconAmber}`}></i> 기술 스택 (Tech Stack)
          </h3>
          <div className={styles.grid3}>
            <div className={styles.techBox}>
              <h4 className={styles.techTitle}><i className={`fa-brands fa-docker ${styles.textBlue}`}></i> Docker Compose</h4>
              <p className={styles.techDesc}>Gateway 엔진, Redis, 백엔드 및 모니터링 도구들을 하나의 코드로 관리 및 배포합니다.</p>
            </div>
            <div className={styles.techBox}>
              <h4 className={styles.techTitle}><i className={`fa-solid fa-chart-area ${styles.textOrange}`}></i> Prometheus</h4>
              <p className={styles.techDesc}>게이트웨이에서 수집되는 시계열 매트릭스(요청 수, 응답 시간 등)를 주기적으로 스크랩합니다.</p>
            </div>
            <div className={styles.techBox}>
              <h4 className={styles.techTitle}><i className={`fa-solid fa-magnifying-glass-chart ${styles.textYellow}`}></i> Grafana</h4>
              <p className={styles.techDesc}>Prometheus 데이터를 기반으로 시각화 대시보드를 제공하여 인사이트를 도출합니다.</p>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>
            <i className={`fa-solid fa-laptop-code ${styles.iconWrap} ${styles.iconAmber}`}></i> 코드 예시 (Prometheus Scrape)
          </h3>
          <p className={styles.codeDesc}>Gateway의 Metrics 엔드포인트를 수집하기 위한 <code className={`${styles.inlineCode} ${styles.codeAmber}`}>prometheus.yml</code> 예시입니다.</p>
          <div className={styles.codeBox}>
<pre><code className={`${styles.code} ${styles.codeOrange}`}>
{`global:
  scrape_interval: 10s

scrape_configs:
  - job_name: 'openresty_gateway'
    metrics_path: '/metrics'
    static_configs:
      # Gateway 컨테이너의 9145 포트로 노출된 매트릭스 수집
      - targets: ['gateway:9145']
        labels:
          environment: 'production'
          tier: 'data_plane'`}
</code></pre>
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>
            <i className={`fa-solid fa-gears ${styles.iconWrap} ${styles.iconAmber}`}></i> 인프라 연결 설정 (Docker Compose)
          </h3>
          <p className={styles.codeDesc}>컴포넌트들을 연결하는 <code className={`${styles.inlineCode} ${styles.codeBlue}`}>docker-compose.yml</code> 주요 구성 예시입니다.</p>
          <div className={styles.codeBox}>
<pre><code className={`${styles.code} ${styles.codeBlue}`}>
{`version: '3.8'
services:
  gateway:
    image: openresty/openresty:alpine
    ports:
      - "80:80"     # 외부 트래픽 수신 포트
      - "443:443"
    depends_on:
      - redis
    networks:
      - gateway_net

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    networks:
      - gateway_net

  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    networks:
      - gateway_net

networks:
  gateway_net:
    driver: bridge`}
</code></pre>
          </div>
        </div>

        <div className={`${styles.card} ${styles.techBox}`}>
          <h3 className={styles.cardTitle}>
            <i className={`fa-solid fa-book ${styles.iconWrap} ${styles.iconSlate}`}></i> 개발 및 운영 가이드 (DevOps Guide)
          </h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <i className={`fa-solid fa-chevron-right ${styles.listIcon} ${styles.textAmber}`}></i>
              <div><strong style={{color: 'white'}}>IaC (Infrastructure as Code):</strong> 인프라 설정은 모두 코드로 관리(GitOps)하며, Grafana 대시보드 역시 JSON 프로비저닝을 통해 구성 자동화를 구축하세요.</div>
            </li>
            <li className={styles.listItem}>
              <i className={`fa-solid fa-chevron-right ${styles.listIcon} ${styles.textAmber}`}></i>
              <div><strong style={{color: 'white'}}>Alerting:</strong> Prometheus Alertmanager를 구성하여 에러율(5xx 상태코드) 증가나 응답 지연(Latency) 임계치 초과 시 Slack 또는 이메일 알림을 발송하도록 설정하세요.</div>
            </li>
            <li className={styles.listItem}>
              <i className={`fa-solid fa-chevron-right ${styles.listIcon} ${styles.textAmber}`}></i>
              <div><strong style={{color: 'white'}}>가용성:</strong> 단일 장애점(SPOF)을 제거하기 위해 운영 환경에서는 Redis Sentinel 또는 Cluster 모드를 사용하고, Gateway를 여러 노드로 스케일 아웃할 수 있도록 Stateless하게 설계해야 합니다.</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
