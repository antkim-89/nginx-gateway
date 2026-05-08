import { Link } from 'react-router-dom';
import styles from '../GuideStyles.module.css';

export function GatewayEngine() {
  return (
    <div className={styles.container}>
      <div className={styles.backNav}>
        <Link to="/" className={styles.backBtn}>
          <i className="fa-solid fa-arrow-left"></i> 메인으로 돌아가기
        </Link>
      </div>
      
      <div className={styles.header}>
        <div className={`${styles.badge} ${styles.badgeEmerald}`}>Data Plane 엔진</div>
        <h1 className={styles.title}>1. Gateway Engine</h1>
        <p className={styles.subtitle}>OpenResty 및 Lua 기반의 고성능 API 게이트웨이 구현 가이드</p>
      </div>
      
      <div className={styles.content}>
        <div className={styles.card}>
          <div className={`${styles.cardLine} ${styles.lineEmerald}`}></div>
          <h3 className={styles.cardTitle}>
            <i className={`fa-solid fa-layer-group ${styles.iconWrap} ${styles.iconEmerald}`}></i> 기술 스택 (Tech Stack)
          </h3>
          <div className={styles.grid3}>
            <div className={styles.techBox}>
              <h4 className={styles.techTitle}><i className={`fa-solid fa-server ${styles.textEmerald}`}></i> OpenResty</h4>
              <p className={styles.techDesc}>Nginx 기반의 웹 플랫폼으로, 고성능의 비동기 I/O를 지원하여 대용량 트래픽 처리에 적합합니다.</p>
            </div>
            <div className={styles.techBox}>
              <h4 className={styles.techTitle}><i className={`fa-solid fa-code ${styles.textBlue}`}></i> LuaJIT</h4>
              <p className={styles.techDesc}>초고속 Just-In-Time 컴파일러를 통해 Nginx 요청 처리 파이프라인 단계별로 동적 로직을 주입합니다.</p>
            </div>
            <div className={styles.techBox}>
              <h4 className={styles.techTitle}><i className={`fa-solid fa-database ${styles.textRed}`}></i> Redis</h4>
              <p className={styles.techDesc}>밀리초 단위의 읽기 속도를 제공하는 인메모리 스토어로, 라우팅 및 보안 상태를 동기화합니다.</p>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>
            <i className={`fa-solid fa-laptop-code ${styles.iconWrap} ${styles.iconEmerald}`}></i> 코드 예시 (Lua Script)
          </h3>
          <p className={styles.codeDesc}>Redis를 활용한 IP 기반 Rate Limiting (유량 제한) 로직 예시입니다.</p>
          <div className={styles.codeBox}>
<pre><code className={`${styles.code} ${styles.codeEmerald}`}>
{`-- access_rate_limit.lua
local redis = require "resty.redis"
local red = redis:new()
red:set_timeout(1000) -- 1초 타임아웃
local ok, err = red:connect("redis-server", 6379)

if not ok then
    ngx.log(ngx.ERR, "failed to connect to Redis: ", err)
    return ngx.exit(500)
end

local ip = ngx.var.remote_addr
local key = "gw:ratelimit:" .. ip
local current, err = red:incr(key)

if current == 1 then
    red:expire(key, 60) -- 60초 제한 창
end

if current > 100 then -- 분당 100회 제한
    ngx.status = 429
    ngx.header["Content-Type"] = "application/json"
    ngx.say('{"error": "Rate Limit Exceeded"}')
    return ngx.exit(429)
end`}
</code></pre>
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>
            <i className={`fa-solid fa-gears ${styles.iconWrap} ${styles.iconEmerald}`}></i> 연동 설정 (Configuration)
          </h3>
          <p className={styles.codeDesc}><code>nginx.conf</code>에 Lua 스크립트와 Redis를 연동하는 기본 구조입니다.</p>
          <div className={styles.codeBox}>
<pre><code className={`${styles.code} ${styles.codeBlue}`}>
{`http {
    # Lua 라이브러리 경로 설정
    lua_package_path "/usr/local/openresty/lualib/?.lua;;";
    
    server {
        listen 80;
        
        location / {
            # 1. 인증 및 Rate Limit 수행
            access_by_lua_file /etc/nginx/lua/access_rate_limit.lua;
            
            # 2. 동적 업스트림 프록시
            set $upstream_target "";
            rewrite_by_lua_block {
                -- 실제 환경에서는 Redis에서 Host 기반 라우팅 정보 획득
                ngx.var.upstream_target = "http://backend-service:8080"
            }
            proxy_pass $upstream_target;
        }
    }
}`}
</code></pre>
          </div>
        </div>

        <div className={`${styles.card} ${styles.techBox}`}>
          <h3 className={styles.cardTitle}>
            <i className={`fa-solid fa-book ${styles.iconWrap} ${styles.iconSlate}`}></i> 개발 가이드 (Development Guide)
          </h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <i className={`fa-solid fa-chevron-right ${styles.listIcon} ${styles.textEmerald}`}></i>
              <div><strong style={{color: 'white'}}>모듈화:</strong> 복잡한 로직은 <code className={`${styles.inlineCode} ${styles.codeEmerald}`}>nginx.conf</code> 내부 블록에 작성하지 말고 개별 <code className={`${styles.inlineCode} ${styles.codeEmerald}`}>.lua</code> 파일로 분리하여 관리하세요.</div>
            </li>
            <li className={styles.listItem}>
              <i className={`fa-solid fa-chevron-right ${styles.listIcon} ${styles.textEmerald}`}></i>
              <div><strong style={{color: 'white'}}>성능 최적화:</strong> Redis 쿼리 비용을 최소화하기 위해 <code className={`${styles.inlineCode} ${styles.codeEmerald}`}>lua_shared_dict</code>를 활용한 Nginx 로컬 메모리 캐싱 계층을 도입하세요 (L1/L2 캐시 구조).</div>
            </li>
            <li className={styles.listItem}>
              <i className={`fa-solid fa-chevron-right ${styles.listIcon} ${styles.textEmerald}`}></i>
              <div><strong style={{color: 'white'}}>에러 로깅:</strong> <code className={`${styles.inlineCode} ${styles.codeEmerald}`}>ngx.log(ngx.ERR, ...)</code>를 적극 활용하여 문제를 추적하고, 로그 레벨에 맞추어 디버깅 정보를 남기세요.</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
