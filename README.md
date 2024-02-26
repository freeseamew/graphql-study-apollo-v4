## 0. Graphql Study 실습 자료(apollo server v4)

apollo server v4로 세팅된 Graphql 실습 서버입니다. 


## 1. nvm을 이용한 nodejs 설치

nvm 공식 사이트
```
https://github.com/nvm-sh/nvm
```

1-1. windows
: 다음 경로에서 nvm-setup.exe 또는 nvm-setup.zip를 다운받고 압축풀어 실행해서 설치
```
https://github.com/coreybutler/nvm-windows/releases
```

> windows에서 nvm 설치 후 nvm으로 node를 선택하지 못하거나 node명령 자체가 안되는 경우가 있습니다. 이때는 터미널을 관리자 권한으로 실행 후  에서 use로 버전을 선택하길 권합니다. 참고로 그 후에는 다시 관리자 권한 없이도 nvm이 됩니다. 

1-1-2. windows용 bash 터미널 설치
다음 사이트에서 다운 받아 설치하고 비주얼스튜디오 코드에서 git_bash 라는 터미널로 작업

> https://git-scm.com/


1-2. Mac os
: 맥에서는 brew라는 것을 설치 후 다음명령어를 이용해 설치가 가능합니다. 
```
brew install nvm
```

1-3. Linux
: 터미널에 다음 명령어를 복사해 실행
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

1-4. 환경설정
Mac과 Linux의 경우 터미널 버전에 따라 다음 vi(터미널에서 문서편집툴) 설정파일을 만든 후 내용을 추가해서 실행해 주어야 한다. 

```
vi ~/.bashrc
또는
vi ~/.bash_profile
또는
vi ~/.zshrc
```

스크립트 내용
```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

또는 

```
export NVM_DIR="/home/smartadmin/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

그리고 터미널 환경에 다라 다음 명령어를 실행

```
bash: source ~/.bashrc

또는

zsh: source ~/.zshrc
```

정상적으로 nvm이 설치되었으면 터미널에서 다음 명령어들로 nvm 실행가능


```
// node 설치
nvm install 14

// 설치된 node 버전 목록
nvm list 

// 버전선택
nvm use 14

```

> 참고로 현재 windows환경의 경우 14버전의 nodejs에서만 meteor가 실행 가능함.


## 2. meteorjs 설치


터미널에서 다음 명령어 실행

```
npm install -g meteor
```

## 3. 기본예제 관련

: 해당 git 코드를 다운 받고 압축 푼 다음 해당 폴더에서 다음 명령어 실행해 필요 패키지 설치

```
npm i
```

## 4. meteor 서버 구동

터미널에서 다음 명령어 실행
```
DISABLE_WEBSOCKETS=true meteor run
```

## 5. 브라우저에서 다음 주소로 접속해 Sandbox 툴을 실행

```
http://localhost:3000/graphql
```

