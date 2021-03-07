# fe-w4-martian

![](https://images.theconversation.com/files/96726/original/image-20150930-19533-1by0fu3.jpg?ixlib=rb-1.1.0&rect=0%2C0%2C2000%2C970&q=45&auto=format&w=1356&h=668&fit=crop)

## 학습 키워드

- ES Module방식 개발
- 함수형 프로그래밍
- Promise

## 해야할 것

- [ ] 1. myPromise 객체 만들기
- [ ] 2. 미션 구현

## 동작 순서도

- 현재 버그 사항

1. 문자를 입력한다
2. 16진수로 변환한다
3. 수신기가 5초 간격으로 해석한 문자를 하나씩 읽어온다
4. 문자가 [송수신정보]에 표시되면, 2초간 가르키고, 그동안 애니메이션을 진행한다
5. 다 받아오면, [해석하기] 버튼이 활성화된다
6. [해석하기]를 누르면, [해석본]에 띄운다

**마션 -> 지구 (송신)**

1. [발신정보입력]에 문자를 입력한다
2. 실시간으로 번역되는 내용을 [발신정보]에 띄운다
3. [지구로보내기] 버튼을 누르면, [발신정보]에 있는 내용을 하나씩 [송수신정보]에 띄우고 수신기가 2초간 가르키면서 애니메이션 진행한다

**애니메이션 구상도**
(문자를 받으면, 2초간 해당 문자에 화살표를 고정시키고, 2초간 해당 문자를 깜빡거리게 한다.)

1. [송수신정보]에 문자가 입력되면 화살표무빙 함수를 호출한다. (o)
2. 해당 문자에 맞는 각도로 화살표를 움직인다. (o)
3. 움직일때는 최소 각도로 움직인다. (일단 보류)
4. 움직이고 나서 -> setInterval로 색을 깜빡인다. (o // class add)
5. 2초가 지나면 setInterval을 끈다. (o // class remove)
6. 다시 문자가 입력될 것이고 똑같이 화살표 무빙을 한다. (o)

**현재 버그 사항**

1. [지구로 보내기] delayTime이 안먹음
2. [지구로 보내기]랑 초기 print랑 데이터 겹침
3. blink 지워지는 타이밍 (일단 500ms x 4로 타이밍 맞춤)
