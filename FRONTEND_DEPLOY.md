# 프론트엔드 배포 가이드

## 🚀 Vercel 배포 (추천)

### 1단계: Vercel 계정 생성
1. https://vercel.com 접속
2. GitHub 계정으로 로그인

### 2단계: 프로젝트 배포
1. "Add New Project" 클릭
2. GitHub 저장소 선택: `gbsw-ai-chatbot`
3. **중요 설정:**
   - **Root Directory**: `frontend` 입력
   - **Framework Preset**: Next.js (자동 감지)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 3단계: 환경 변수 설정
Environment Variables 섹션에서:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```
(나중에 백엔드 배포하면 URL 변경)

### 4단계: 배포
- "Deploy" 클릭
- 2~3분 대기
- 완료! 🎉

### 배포 URL
- `https://your-project.vercel.app`

---

## 🌐 GitHub Pages 배포

### 사전 준비
```bash
cd frontend
npm install
```

### 1단계: next.config.js 수정
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/gbsw-ai-chatbot',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

### 2단계: 빌드
```bash
npm run build
```

### 3단계: GitHub Pages 설정
1. GitHub 저장소 → Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` 선택
4. Folder: `/root` 선택

### 4단계: 배포 스크립트 실행
```bash
# out 폴더를 gh-pages 브랜치에 푸시
npm run deploy
```

---

## 📦 Netlify 배포

### 1단계: Netlify 계정 생성
1. https://netlify.com 접속
2. GitHub 계정으로 로그인

### 2단계: 새 사이트 추가
1. "Add new site" → "Import an existing project"
2. GitHub 저장소 선택
3. **설정:**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/.next`

### 3단계: 환경 변수
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4단계: 배포
- "Deploy site" 클릭

---

## 🖥️ 로컬 프로덕션 빌드 테스트

```bash
cd frontend

# 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 접속: http://localhost:3000
```

---

## ⚠️ 중요 사항

### 백엔드 연결
- **로컬 백엔드 사용**: `NEXT_PUBLIC_API_URL=http://localhost:8000`
- **배포된 백엔드**: URL을 실제 백엔드 주소로 변경

### CORS 문제
프론트엔드 배포 후 백엔드에서 CORS 설정 필요:
```python
# backend/app.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-frontend.vercel.app"  # 배포된 URL 추가
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 백엔드 실행 필수
프론트엔드만 배포해도 **백엔드는 로컬에서 실행**해야 합니다:
```bash
cd backend
uvicorn app:app --host 0.0.0.0 --port 8000
```

---

## 🔧 트러블슈팅

### API 연결 안 됨
1. 백엔드가 실행 중인지 확인
2. `NEXT_PUBLIC_API_URL` 환경 변수 확인
3. CORS 설정 확인

### 빌드 오류
```bash
# 캐시 삭제 후 재빌드
rm -rf .next
npm run build
```

### 환경 변수 적용 안 됨
- Vercel: 환경 변수 변경 후 재배포 필요
- 로컬: `.env.production` 파일 확인

---

## 📊 배포 후 확인사항

✅ 프론트엔드 접속 가능  
✅ 백엔드 API 연결 확인  
✅ 채팅 기능 작동  
✅ 모델 선택 가능  
✅ 상태 표시 정상  

---

## 🎯 추천 배포 방식

**개발/테스트**: Vercel (무료, 자동 배포)  
**프로덕션**: Vercel + 백엔드 서버 (Railway/Render)  
**완전 로컬**: Docker Compose
