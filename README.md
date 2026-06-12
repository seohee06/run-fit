# run-fit
Plaintext
서비스 이름: 남구 런-핏 (Run-Fit)

[서비스 설명]
Vercel + Supabase 구성으로 운영할 수 있는 웹 앱입니다. 사용자는 회원 가입 후 실시간 카메라 분석을 통해 러닝 자세(어깨 및 골반 기울기 수평 밸런스)를 모니터링하고, 올바른 자세를 유지할 때마다 실시간으로 런-핏 보상 포인트를 적립합니다. 또한, 부산 남구 이기대 권역의 실시간 기상 데이터(풍속, 온도)를 연동하여 맞바람 저항이 강할 때 상체 각도를 조절하도록 돕는 AI 페이스메이커 피드백 시스템을 제공합니다.

[기술구성]
* 프런트엔드: HTML/CSS/자바스크립트
* 인증/데이터베이스: 수파베이스
* 호스팅: Vercel
* 구성: Vercel 환경을 다양하게 설정 config.js

[Supabase 설정]
1. Supabase에서 새 프로젝트를 생성합니다.
2. SQL Editor supabase/schema.sql 에서 전체 SQL을 실행합니다.
3. Authentication > Providers > Email 에서 이메일 로그인을 활성화합니다.
4. 첫 번째 로그인 계정을 앱으로 가입합니다.
5. Supabase SQL Editor에서 아래 쿼리로 최초 권한 권한을 부여합니다.
update public.members set role = 'admin', approved = true where email = '관리자이메일@example.com';

[현지 실행]
config.example.js 복사본을 config.local.js 구성합니다. Supabase 값을 약속합니다. config.local.js 는 Git에 맡기지 않습니다.
window.KSMC_SUPABASE_CONFIG = { supabaseUrl: "https://YOUR_PROJECT_REF.supabase.co", supabaseAnonKey: "YOUR_SUPABASE_ANON_KEY", };
그 다음 지역을 실행합니다.
python3 -m http.server 8080

[Vercel 배포]
1. 이 폴더를 GitHub에 있습니다.
2. Vercel에서 해당 내용을 가져오셔야 합니다.
3. Vercel 프로젝트의 Settings > Environment Variables 아래 값을 추가합니다.
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
4. 배포 후 Supabase Authentication > URL Configuration 에서 Vercel 배포 주소를 사이트 URL에 등록했습니다.

[운영하다]
* 러너: 회원가입 -> 로그인 -> 실시간 카메라 분석 가동 -> 대칭성 유지하며 러닝/포인트 획득
* AI 페이스메이커: 부산 남구 실시간 풍속/온도 데이터 분석 -> 맞바람 위험 시 상체 각도 조정 가이드 출력
* 실시간 피드백: 어깨/골반 기울기가 틀어질 경우 실시간 경고 및 교정 메시지 즉시 팝업
* 포인트 시스템: 완벽한 대칭성 유지 확률에 따라 초당 실시간 누적 보상 지급

[다음 확장하기]
* MediaPipe Pose 관절 랜드마크 실시간 수평선 가이드 오버레이 렌더링 정밀화
* 획득한 런-핏 포인트를 부산 남구 지역 화폐(오륙도페이)와 연동하는 보상 샵 구축
* 실시간 기상 API 연동 및 기후 가혹도에 따른 실시간 칼로리 소모량 보정 알고리즘 추가
* Supabase Edge Function을 활용한 일일 러닝 리포트 이메일 및 카카오 알림톡 발송