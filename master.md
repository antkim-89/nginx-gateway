🚀 Next-Gen Dynamic Gateway System: 구현 마스터 가이드

이 문서는 기술팀의 각 담당자가 Antigravity(또는 Gemini Canvas) 환경에서 즉시 작업에 착수할 수 있도록 설계된 '역할별 마스터 프롬프트' 모음입니다. 각 파트의 담당자는 아래의 프롬프트를 복사하여 프로젝트를 시작하십시오.

1. [Gateway & Lua] OpenResty 코어 엔진 엔지니어 전용

프롬프트 복사 대상: Gateway 인프라 및 Lua 스크립트 개발자

다음 조건에 부합하는 OpenResty(Nginx + Lua)의 단일 구성 파일(`nginx.conf`)과 핵심 Lua 로직을 생성해줘.

[시스템 요구사항]
1. 인프라 기반: OpenResty를 사용하여 dynamic routing 구현.
2. 데이터 소스: Redis에서 실시간으로 라우팅 정보, SSL 인증서, Rate Limit 정책, Key-Auth 정보를 읽어옴.
3. 단계별 로직 구현:
   - access_by_lua: Key-Auth 인증(Header 기반), Rate Limiting(Redis 카운터), SSO 세션 체크.
   - header_filter_by_lua: Redis에 정의된 도메인별 CORS 정책(Allow-Origin 등) 동적 적용.
   - log_by_lua: 요청 수, 응답 시간, 상태 코드를 lua-resty-prometheus 형식을 사용하여 기록.
4. 동적 업스트림: Redis의 'services' 정보를 바탕으로 proxy_pass 대상을 실시간 결정.
5. 에러 처리: 401(Auth), 429(Rate Limit), 502(Upstream) 상황에 대한 JSON 응답 처리.

[출력 형식]
- 모든 설정과 Lua 코드가 포함된 통합 `nginx.conf` 또는 `OneFile.html` 형태의 시뮬레이션 코드.
- Redis 연결 및 데이터 조회 최적화 로직 포함.


2. [Backend] Admin API 및 데이터 관리자 전용

프롬프트 복사 대상: 제어 평면(Control Plane) 백엔드 개발자

OpenResty 게이트웨이를 제어하기 위한 관리자용 Backend API 서버를 구축해줘.

[시스템 요구사항]
1. 기술 스택: Node.js (Express) 또는 Go (선택 가능), Redis 연동.
2. 주요 기능 (CRUD):
   - 서비스 관리: 서비스(서버) 추가/수정/삭제 (Redis Hash 구조로 저장).
   - 보안 설정: SSL 인증서 업로드 및 도메인 매핑, CORS 허용 리스트 관리.
   - 접근 제어: API Key 생성 및 활성화 여부 제어, Rate Limit 수치 설정.
   - SSO 연동: 관리자 로그인 및 외부 인증 공급자(IdP) 연동 뼈대.
3. 데이터 구조: Gateway가 읽기 쉬운 형태의 Redis Key-Value 설계 포함.
4. 보안: 모든 API는 관리자 인증이 필요하며, 실시간으로 Redis에 반영되어 게이트웨이가 즉시 인식해야 함.

[출력 형식]
- 모든 API 엔드포인트와 Redis 연동 로직이 포함된 단일 실행 파일 코드.


3. [Frontend] 관리자 대시보드 개발자 전용

프롬프트 복사 대상: Admin UI 및 시각화 담당자

게이트웨이 시스템을 동적으로 제어하고 상태를 추적하는 통합 관리자 대시보드를 개발해줘.

[시스템 요구사항]
1. 기술 스택: React (Tailwind CSS 활용), Lucide 아이콘.
2. 주요 화면 구성 (Single Page App):
   - Dashboard: 실시간 트래픽 매트릭스(Prometheus 데이터 시각화), 서비스별 상태(Health Check) 요약.
   - Service Manager: 서버 목록 조회, 신규 서비스 추가 Modal, 트래픽 On/Off 스위치.
   - Security Center: SSL 인증서 관리 테이블, CORS 설정, API Key 발급 및 이력 관리.
   - SSO Configuration: SSO 로그인 연동 설정 및 세션 관리.
3. UI 디자인: 다크 테마 기반의 모던한 인프라 관리 도구 스타일.
4. 인터랙션: 설정을 저장하면 즉시 "게이트웨이에 반영됨" 알림 표시.

[출력 형식]
- Tailwind CSS가 포함된 단일 파일 `App.jsx`로 구현. 모든 컴포넌트와 상태 관리를 포함할 것.


4. [SRE & DevOps] 모니터링 및 인프라 구축 담당자 전용

프롬프트 복사 대상: 인프라 자동화 및 관측성(Observability) 엔지니어

게이트웨이 시스템 전체의 운영 환경과 추적 매트릭스 수집 환경을 구축하기 위한 명세서를 작성해줘.

[시스템 요구사항]
1. 배포 구성: Docker Compose를 활용한 OpenResty, Redis, Prometheus, Grafana 통합 구성.
2. 모니터링 설정:
   - Prometheus: OpenResty의 `/metrics` 엔드포인트를 Scraping 하는 설정.
   - Health Check: 주기적으로 업스트림 서버들의 생존 여부를 체크하여 Redis에 상태를 기록하는 스크립트.
3. 로그 수집: Nginx 액세스 로그를 시각화하기 위한 구조 설계.
4. 가용성: Redis 장애 시 게이트웨이가 동작할 수 있는 Failover 전략(로컬 캐시 등) 제안.

[출력 형식]
- `docker-compose.yml`, `prometheus.yml` 설정 파일 및 인프라 구축 가이드를 포함한 기술 문서.


공통 기술 표준 및 약속

Redis Path Rule:

서비스 정보: gw:services:{domain}

인증 키: gw:auth:keys:{api_key}

유량 제한: gw:ratelimit:{ip_or_key}:{window}

Metric Naming:

http_requests_total: 전체 요청 수

http_request_duration_seconds: 응답 시간 지표

Communication: 모든 API는 JSON 형식을 사용하며, 에러 메시지는 표준화된 포맷({ "error": "msg", "code": 4xx })을 따름.