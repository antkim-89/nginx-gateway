import { Link } from 'react-router-dom';
import styles from './GatewayArchitecture.module.css';

export function GatewayArchitecture() {
  return (
    <div className={styles.canvasContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>System Architecture Blueprint</h1>
        <p className={styles.subtitle}>Precision Layout for Engineering Implementation</p>
      </div>

      <div className={styles.diagramWrapper}>
        <svg className={styles.connectorSvg}>
          <defs>
            <marker id="arrow-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
            </marker>
            <marker id="arrow-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
            </marker>
            <marker id="arrow-amber" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
            </marker>
            <marker id="arrow-slate" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#475569" />
            </marker>
          </defs>
          <path d="M 600 85 L 600 160" className={`${styles.flowLine} ${styles.colorGreen}`} markerEnd="url(#arrow-green)" />
          <path d="M 340 240 L 450 240" className={`${styles.flowLine} ${styles.colorBlue}`} markerEnd="url(#arrow-blue)" />
          <path d="M 750 240 L 900 240" className={`${styles.flowLine} ${styles.colorSlate}`} markerEnd="url(#arrow-slate)" />
          <path d="M 190 320 L 190 360 L 1030 360 L 1030 320" className={`${styles.flowLine} ${styles.colorBlue}`} markerEnd="url(#arrow-blue)" />
          <path d="M 520 320 L 520 380 L 220 380 L 220 450" className={`${styles.flowLine} ${styles.colorGreen}`} markerEnd="url(#arrow-green)" />
          <path d="M 600 320 L 600 450" className={`${styles.flowLine} ${styles.colorGreen}`} markerEnd="url(#arrow-green)" />
          <path d="M 680 320 L 680 380 L 980 380 L 980 450" className={`${styles.flowLine} ${styles.colorGreen}`} markerEnd="url(#arrow-green)" />
          <path d="M 450 280 L 400 280 L 400 680" className={`${styles.flowLine} ${styles.colorAmber}`} markerEnd="url(#arrow-amber)" />
          <path d="M 750 280 L 800 280 L 800 680" className={`${styles.flowLine} ${styles.colorAmber}`} markerEnd="url(#arrow-amber)" />
        </svg>

        <div className={styles.layerIndicator} style={{ top: 40 }}>L1. Entry Point</div>
        <div className={`${styles.node} ${styles.hasTooltip} ${styles.borderEmerald}`} style={{ top: 20, left: 450, width: 300, position: 'absolute' }}>
          <i className={`fa-solid fa-globe ${styles.nodeIcon} ${styles.textEmerald}`}></i>
          <div>
            <div className={styles.nodeTitle}>External Traffic</div>
            <div className={styles.nodeSubtitle}>User Request / DNS / LB</div>
          </div>
          <div className={styles.tooltip}>
            <h4>Layer 1. Entry Layer (진입로)</h4>
            <p><strong>역할:</strong> 클라이언트의 최초 접속을 수락하고 보안 필터링을 수행합니다.</p>
            <p><strong>핵심 기술:</strong> DNS, Global Load Balancer(L4), WAF(Web Application Firewall)</p>
            <p><strong>설명:</strong> 사용자의 요청이 네트워크를 통해 게이트웨이 시스템으로 들어오는 단계입니다.</p>
          </div>
        </div>

        <div className={styles.layerIndicator} style={{ top: 185 }}>L2. Data Plane</div>
        <div className={`${styles.layerBox} ${styles.borderEmerald}`} style={{ top: 160, left: 450, width: 300, height: 160, borderLeftWidth: 4 }}>
          <div className={styles.layerLabel}>Traffic Engine</div>
          <div className={styles.node} style={{ margin: '50px 20px 0' }}>
            <i className={`fa-solid fa-bolt-lightning ${styles.nodeIcon} ${styles.textEmerald}`}></i>
            <div>
              <div className={styles.nodeTitle}>OpenResty Node</div>
              <div className={styles.nodeSubtitle}>Lua Dynamic Processor</div>
            </div>
          </div>
          <div className={styles.tooltip}>
            <h4>Layer 2. Data Plane (트래픽 처리 레이어)</h4>
            <p><strong>역할:</strong> 모든 요청에 대해 실시간으로 비즈니스 로직을 적용합니다.</p>
            <ul>
              <li>SSL Handshake: Redis에서 도메인에 맞는 인증서를 가져와 즉시 적용</li>
              <li>Access Control: API Key 검증 및 SSO 세션 토큰 유효성 확인</li>
              <li>Traffic Control: Rate Limiting 알고리즘을 통한 서비스 보호</li>
              <li>Dynamic Proxy: 목적지 서버 결정</li>
            </ul>
          </div>
        </div>

        <div className={`${styles.layerBox} ${styles.borderBlue}`} style={{ top: 160, left: 40, width: 300, height: 160, borderLeftWidth: 4 }}>
          <div className={styles.layerLabel}>L3. Control Plane</div>
          <div className={styles.node} style={{ margin: '50px 20px 0' }}>
            <i className={`fa-solid fa-sliders ${styles.nodeIcon} ${styles.textBlue}`}></i>
            <div>
              <div className={styles.nodeTitle}>Admin API & UI</div>
              <div className={styles.nodeSubtitle}>Policy & Config Manager</div>
            </div>
          </div>
          <div className={styles.tooltip}>
            <h4>Layer 3. Control Plane (관리 레이어)</h4>
            <p><strong>역할:</strong> 시스템 운영자가 게이트웨이의 동작 방식을 정의하고 명령을 내립니다.</p>
            <p><strong>설명:</strong> 설정 변경(예: 서버 추가 등)이 여기서 일어나며 즉시 동기화됩니다.</p>
          </div>
        </div>

        <div className={`${styles.layerBox} ${styles.borderSlate}`} style={{ top: 160, left: 900, width: 260, height: 160, borderLeftWidth: 4 }}>
          <div className={styles.layerLabel}>L4. State Store</div>
          <div className={styles.node} style={{ margin: '50px 20px 0' }}>
            <i className={`fa-solid fa-database ${styles.nodeIcon} ${styles.textSlate}`}></i>
            <div>
              <div className={styles.nodeTitle}>Redis Cluster</div>
              <div className={styles.nodeSubtitle}>Single Source of Truth</div>
            </div>
          </div>
          <div className={styles.tooltip}>
            <h4>Layer 4. State Store (상태 저장 레이어)</h4>
            <p><strong>설명:</strong> 설정 데이터와 동적 데이터를 저장합니다. 인메모리 방식으로 극도로 빠르게 접근합니다.</p>
          </div>
        </div>

        <div className={styles.layerIndicator} style={{ top: 515 }}>L5. Upstream Layer</div>
        <div className={styles.layerBox} style={{ top: 450, left: 40, width: 1120, height: 160, background: 'rgba(15, 23, 42, 0.6)' }}>
          <div className={styles.layerLabel}>Application Services</div>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%', paddingTop: 24 }}>
            <div className={styles.node} style={{ width: 280 }}><i className={`fa-solid fa-server ${styles.nodeIcon} ${styles.textSlate}`}></i>
              <div><div className={styles.nodeTitle}>Service A</div><div className={styles.nodeSubtitle}>Authentication / Profile</div></div>
            </div>
            <div className={styles.node} style={{ width: 280 }}><i className={`fa-solid fa-server ${styles.nodeIcon} ${styles.textSlate}`}></i>
              <div><div className={styles.nodeTitle}>Service B</div><div className={styles.nodeSubtitle}>Transaction / Order</div></div>
            </div>
            <div className={styles.node} style={{ width: 280 }}><i className={`fa-solid fa-server ${styles.nodeIcon} ${styles.textSlate}`}></i>
              <div><div className={styles.nodeTitle}>Service C</div><div className={styles.nodeSubtitle}>Inventory / Logistics</div></div>
            </div>
          </div>
          <div className={styles.tooltip}>
            <h4>Layer 5. Upstream Layer (실제 서비스 레이어)</h4>
            <p><strong>역할:</strong> 비즈니스 로직을 실제로 수행하는 백엔드 서버들입니다.</p>
          </div>
        </div>

        <div className={styles.layerIndicator} style={{ top: 755 }}>L6. Insights Layer</div>
        <div className={`${styles.layerBox} ${styles.borderAmber}`} style={{ top: 680, left: 40, width: 1120, height: 180, borderTopWidth: 2, borderTopStyle: 'dashed' }}>
          <div className={styles.layerLabel}>Observability Plane</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, alignItems: 'center', height: '100%', paddingTop: 16 }}>
            <div className={styles.node} style={{ width: 280 }}>
              <i className={`fa-solid fa-chart-area ${styles.nodeIcon} ${styles.textAmber}`}></i>
              <div><div className={styles.nodeTitle}>Prometheus</div><div className={styles.nodeSubtitle}>Time-series Metrics</div></div>
            </div>
            <div className={styles.node} style={{ width: 280 }}>
              <i className={`fa-solid fa-magnifying-glass-chart ${styles.nodeIcon} ${styles.textAmber}`}></i>
              <div><div className={styles.nodeTitle}>Grafana</div><div className={styles.nodeSubtitle}>Insight Dashboards</div></div>
            </div>
          </div>
          <div className={styles.tooltip}>
            <h4>Layer 6. Observability Plane (인사이트 레이어)</h4>
            <p><strong>역할:</strong> 시스템에서 발생하는 모든 현상을 데이터로 기록하고 시각화합니다.</p>
          </div>
        </div>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <h4 className={`${styles.infoTitle} ${styles.infoTitleGreen}`}>Data Plane (L2)</h4>
          <p className={styles.infoDesc}>트래픽의 실질적 처리부. 모든 요청에 대해 Lua 스크립트가 실행되어 보안 검증 및 라우팅을 1ms 내에 수행합니다.</p>
        </div>
        <div className={styles.infoCard}>
          <h4 className={`${styles.infoTitle} ${styles.infoTitleBlue}`}>Control Plane (L3)</h4>
          <p className={styles.infoDesc}>관리 도구. 개발자나 운영자가 웹 UI를 통해 설정을 변경하면 이 레이어가 Redis에 데이터를 즉시 동기화합니다.</p>
        </div>
        <div className={styles.infoCard}>
          <h4 className={`${styles.infoTitle} ${styles.infoTitleSlate}`}>State Store (L4)</h4>
          <p className={styles.infoDesc}>상태 저장소. 시스템 전체의 설정값, SSL 인증서 원본, 실시간 유량 제한 카운터 등이 중앙 집중적으로 관리됩니다.</p>
        </div>
        <div className={styles.infoCard}>
          <h4 className={`${styles.infoTitle} ${styles.infoTitleAmber}`}>Observability (L6)</h4>
          <p className={styles.infoDesc}>전체 시스템 감시. 트래픽의 성공률, 지연 시간, 에러 로그를 수집하여 시스템의 건강 상태를 투명하게 보여줍니다.</p>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
         <Link to="/" style={{ color: '#94a3b8', textDecoration: 'underline' }}>← Back to Home</Link>
      </div>
    </div>
  );
}
