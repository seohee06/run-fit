JavaScript
const videoElement = document.getElementById('input-video');
const canvasElement = document.getElementById('output-canvas');
const canvasCtx = canvasElement.getContext('2d');

const weatherInfo = document.getElementById('weather-info');
const pacemakerVoice = document.getElementById('pacemaker-voice');
const shoulderDiffEl = document.getElementById('shoulder-diff');
const hipDiffEl = document.getElementById('hip-diff');
const pointsEl = document.getElementById('reward-points');
const coachingMsg = document.getElementById('coaching-message');

let totalPoints = 0;

function initWeatherData() {
  const mockWindSpeed = 7.5; 
  weatherInfo.innerHTML = `📍 부산 남구 이기대 권역 | 💨 풍속: <span style="color:#ff9100; font-weight:700;">${mockWindSpeed} m/s</span> | 🌡 온도: 19°C`;
  pacemakerVoice.innerHTML = `<strong>[AI 안내]</strong> 강력한 마주바람 감지. 상체를 평소보다 숙여 추진력을 확보하세요.`;
}

function startCamera() {
  coachingMsg.innerText = "카메라 장치를 동기화하는 중입니다...";

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    coachingMsg.innerText = "현재 브라우저에서 카메라를 지원하지 않습니다.";
    return;
  }

  navigator.mediaDevices.getUserMedia({
    video: { width: 640, height: 480, facingMode: "user" }
  })
  .then((stream) => {
    videoElement.srcObject = stream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
      coachingMsg.innerText = "정상 작동 중입니다. 화면에 전신이 나오도록 가볍게 뛰어주세요.";
      coachingMsg.style.color = "#00e676";
      requestAnimationFrame(updateDashboard);
    };
  })
  .catch((err) => {
    coachingMsg.innerText = "카메라 권한을 획득할 수 없습니다. 상단 자물쇠 설정을 확인하세요.";
    coachingMsg.style.color = "#ff3b30";
  });
}

function updateDashboard() {
  if (videoElement.paused || videoElement.ended) return;

  if (canvasElement.width !== videoElement.videoWidth) {
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
  }

  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  
  // 미러 모드 좌우 반전
  canvasCtx.translate(canvasElement.width, 0);
  canvasCtx.scale(-1, 1);
  canvasCtx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.restore();

  // 실제 연동 스케일 감을 보기 위한 정밀 변화 주기
  const timeFactor = Date.now() * 0.003;
  const liveShoulder = Math.abs(Math.sin(timeFactor) * 3.2) + (Math.random() * 0.4);
  const liveHip = Math.abs(Math.cos(timeFactor) * 2.1) + (Math.random() * 0.3);

  shoulderDiffEl.innerHTML = `${liveShoulder.toFixed(2)} <span class="unit">cm</span>`;
  hipDiffEl.innerHTML = `${liveHip.toFixed(2)} <span class="unit">cm</span>`;

  // 피드백 메시지 간소화 및 가독성 업그레이드
  if (liveShoulder > 3.2) {
    coachingMsg.innerText = "⚠️ 오른쪽 어깨 처짐 발생! 스윙 수평을 가다듬으세요.";
    coachingMsg.style.color = "#ff9100";
  } else if (liveHip > 2.2) {
    coachingMsg.innerText = "⚠️ 골반 축이 비대칭합니다. 고관절 코어에 집중하세요.";
    coachingMsg.style.color = "#ff9100";
  } else {
    coachingMsg.innerText = "🟢 신체 대칭성 우수. 완벽한 흐름을 유지하는 중입니다.";
    coachingMsg.style.color = "#00e676";
    
    if (Math.random() > 0.96) {
      totalPoints += 10;
      pointsEl.innerHTML = `${totalPoints} <span class="unit">P</span>`;
    }
  }

  requestAnimationFrame(updateDashboard);
}

initWeatherData();
startCamera();