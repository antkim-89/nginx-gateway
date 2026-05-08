import { Link } from 'react-router-dom';
import styles from '../GuideStyles.module.css';

export function BackendApi() {
  return (
    <div className={styles.container}>
      <div className={styles.backNav}>
        <Link to="/" className={styles.backBtn}>
          <i className="fa-solid fa-arrow-left"></i> 메인으로 돌아가기
        </Link>
      </div>
      
      <div className={styles.header}>
        <div className={`${styles.badge} ${styles.badgeBlue}`}>Control Plane (제어 평면)</div>
        <h1 className={styles.title}>2. Backend Admin API</h1>
        <p className={styles.subtitle}>Gateway 제어를 위한 API 서버 기술 스택 및 연동 가이드</p>
      </div>
      
      <div className={styles.content}>
        <div className={styles.card}>
          <div className={`${styles.cardLine} ${styles.lineBlue}`}></div>
          <h3 className={styles.cardTitle}>
            <i className={`fa-solid fa-cubes ${styles.iconWrap} ${styles.iconBlue}`}></i> 기술 스택 (Tech Stack)
          </h3>
          <div className={`${styles.grid2}`}>
            <div className={styles.techBox}>
              <h4 className={styles.techTitle}><i className={`fa-brands fa-node-js ${styles.textGreen}`}></i> Node.js (Express/NestJS) 또는 Go</h4>
              <p className={styles.techDesc}>관리자 요청을 처리하고 비즈니스 로직(보안, 라우팅 관리)을 수행하는 백엔드 서버입니다.</p>
            </div>
            <div className={styles.techBox}>
              <h4 className={styles.techTitle}><i className={`fa-solid fa-database ${styles.textRed}`}></i> Redis (ioredis / go-redis)</h4>
              <p className={styles.techDesc}>Gateway(L2)가 바라보는 데이터 저장소에 API를 통해 실시간으로 상태를 업데이트합니다.</p>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>
            <i className={`fa-solid fa-laptop-code ${styles.iconWrap} ${styles.iconBlue}`}></i> 코드 예시 (Service API)
          </h3>
          <p className={styles.codeDesc}>Express.js를 사용하여 신규 서비스를 Redis에 등록하는 예시입니다.</p>
          <div className={styles.codeBox}>
<pre><code className={`${styles.code} ${styles.codeAmber}`}>
{`// src/controllers/serviceController.js
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

exports.addService = async (req, res) => {
    try {
        const { domain, targetUrl } = req.body;
        const redisKey = \`gw:services:\${domain}\`;
        
        // Redis Hash 형태로 서비스 정보 저장
        await redis.hmset(redisKey, {
            'target': targetUrl,
            'status': 'active',
            'created_at': Date.now()
        });
        
        // 동적 갱신 완료 응답
        res.status(201).json({ 
            success: true, 
            message: 'Service registered and applied to gateway', 
            data: { domain, targetUrl } 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};`}
</code></pre>
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>
            <i className={`fa-solid fa-gears ${styles.iconWrap} ${styles.iconBlue}`}></i> 환경 변수 및 연동 (Configuration)
          </h3>
          <p className={styles.codeDesc}>백엔드 서버 구동 시 필요한 설정값(<code className={`${styles.inlineCode} ${styles.codeBlue}`}>.env</code>) 예시입니다.</p>
          <div className={styles.codeBox}>
<pre><code className={`${styles.code} ${styles.codeGreen}`}>
{`# .env
PORT=3000
NODE_ENV=production

# Redis 연동 (Gateway가 바라보는 동일한 Redis Cluster)
REDIS_URL=redis://redis-cluster:6379

# JWT / Auth 설정
JWT_SECRET=super_secret_admin_key
ADMIN_API_KEY=admin_master_key_123

# CORS (대시보드 허용)
ALLOWED_ORIGIN=http://admin-dashboard.local`}
</code></pre>
          </div>
        </div>

        <div className={`${styles.card} ${styles.techBox}`}>
          <h3 className={styles.cardTitle}>
            <i className={`fa-solid fa-book ${styles.iconWrap} ${styles.iconSlate}`}></i> 개발 가이드 (Development Guide)
          </h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <i className={`fa-solid fa-chevron-right ${styles.listIcon} ${styles.textBlue}`}></i>
              <div><strong style={{color: 'white'}}>API 명세화:</strong> Swagger(OpenAPI)를 사용하여 API 문서를 자동화하고, 프론트엔드 팀과 규약을 명확히 맞추세요.</div>
            </li>
            <li className={styles.listItem}>
              <i className={`fa-solid fa-chevron-right ${styles.listIcon} ${styles.textBlue}`}></i>
              <div><strong style={{color: 'white'}}>보안 강화:</strong> 모든 API 엔드포인트에 인증(JWT 또는 API Key) 미들웨어를 반드시 부착하여 무단 접근을 방지하세요.</div>
            </li>
            <li className={styles.listItem}>
              <i className={`fa-solid fa-chevron-right ${styles.listIcon} ${styles.textBlue}`}></i>
              <div><strong style={{color: 'white'}}>트랜잭션:</strong> 여러 Redis 키를 동시에 업데이트해야 하는 경우 Lua Script(EVAL)나 MULTI/EXEC를 통해 원자성(Atomicity)을 보장하세요.</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
