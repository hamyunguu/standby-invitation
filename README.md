# Standby 모바일 초대장

## Netlify 배포

1. Netlify에서 **Add new project → Import an existing project**를 선택하고 GitHub 저장소 `hamyunguu/standby-invitation`을 연결합니다.
2. 배포 브랜치는 `main`으로 선택합니다. 저장소의 `netlify.toml`이 빌드 명령과 배포 폴더(`dist`)를 설정하므로 별도의 프레임워크 설정은 필요하지 않습니다.
3. 배포 후 Netlify 주소를 카카오톡에 공유합니다. 기존에 공유한 GitHub Pages 주소는 그대로 유지됩니다.

Netlify 빌드에서는 사이트 주소를 HTML의 canonical, `og:url`, `og:image`에 적용합니다. 썸네일은 `assets/share-thumbnail-2026-kuid.png`입니다. 사이트 주소를 바꾸면 다시 배포해 링크 미리보기 주소도 갱신하세요.

로컬 빌드 확인:

```sh
SITE_URL=https://example.netlify.app node scripts/build-netlify.mjs
```

이 명령은 `dist/`에 배포 파일을 만듭니다. 프레임워크나 패키지 설치는 필요하지 않습니다.
