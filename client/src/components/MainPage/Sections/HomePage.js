import React from "react";
import Settingpage from "../../SettingPage/SettingPage";
import MyRoutine from "../../utils/MyRoutine";

// what we use?
// base : dialog [ x title save]
// 박스에 담아야하나?
// 텍스트필드
// 플로팅액션버튼 (운동추가)

// util
//아코디언 in mainpage [rm, adj, start]
// 포함해야 할 내용 [ 루틴이름, 루틴 내 운동개수,
//루틴 내 각각의 운동이름과 횟수]

function HomePage() {
  return (
    <div>
      반갑습니다
      <Settingpage state="C" />
      <MyRoutine />
    </div>
  );
}

export default HomePage;
