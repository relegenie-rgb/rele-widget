(function(){
  // 기존에 있던 위젯 컨테이너가 있다면 먼저 깨끗하게 제거
  var old = document.getElementById('grw-container');
  if(old) old.remove();

  // 1. FAQ 데이터 영역 (친절하고 세련된 토스/채널톡 대화체)
  var DATA = {
    settlement: { 
      q: "정산금은 언제 입금되나요?", 
      a: "정산금은 앨범이 발매된 달(M)을 기준으로 2개월 뒤(M+2)에 지급해 드려요.\n\n📅 정산 일정 안내\n• 매월 15일: 정산 리포트 발행\n• 매월 말일: 정산금 입금\n\n💡 예시\n1월 발매 ➡️ 3월 15일 리포트 확인 ➡️ 3월 말 정산금 입금\n\n📍 확인 경로\n로그인 > 통계 및 정산 > 정산\n\n※ 해외 플랫폼의 경우, 정산 데이터 정리에 정산월 기준 최대 6개월에서 1년까지 소요될 수 있는 점 양해 부탁드립니다." 
    },
    refund: { 
      q: "환불은 어떻게 진행되나요?", 
      a: "환불은 자동으로 처리되지 않아서, 직접 해지 신청을 해주셔야 해요.\n\n📍 신청 경로\n1. 로그인\n2. [계정관리] ➡️ [상품가입정보] ➡️ [상품 해지]\n\n⏱️ 처리 기간\n해지가 완료된 후 카드사 승인 취소까지 평일 기준 약 3~5일 정도 소요될 수 있습니다." 
    },
    cancel: { 
      q: "상품 해지는 어떻게 하나요?", 
      a: "아래 순서대로 차근차근 진행해 주세요.\n\n1. 로그인\n2. [계정관리] ➡️ [상품가입정보] ➡️ [상품 해지]\n\n이용 중 궁금한 점이 있으시다면 언제든 이메일로 말씀해 주세요!\n📧 rele.help@kt.com" 
    },
    stop: { 
      q: "발매 중지는 어떻게 요청하나요?", 
      a: "발매 중지는 아래 경로를 통해 직접 요청하실 수 있어요.\n\n1. 로그인\n2. [내 음악] ➡️ [발매 완료] ➡️ [앨범 선택] ➡️ [발매 중지 요청]\n\n※ 요청이 정상적으로 접수되면, 플랫폼별 순차적으로 서비스가 중단됩니다." 
    },
    transfer: { 
      q: "서비스 종료 시 앨범 이관이 가능한가요?", 
      a: "아쉽게도 타 유통사로의 자동 앨범 이관 작업은 지원되지 않아요.\n\n다만, 상품 해지나 서비스 중지 요청을 해주시면 다른 유통사로 옮기실 때 꼭 필요한 데이터(UPC, ISRC 코드 등)를 꼼꼼히 정리해서 전달해 드리고 있습니다.\n\n혹시 필요한 데이터를 아직 받지 못하셨다면 고객센터로 연락해 주세요!\n📧 rele.help@kt.com" 
    }
  };

  // 2. 스타일시트 주입
  var CSS = `
#grw-container { position: fixed !important; bottom: 30px !important; right: 30px !important; z-index: 2147483647 !important; width: auto !important; height: auto !important; display: block !important; visibility: visible !important; opacity: 1 !important; font-family: -apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo','Malgun Gothic',sans-serif !important; box-sizing: border-box !important; line-height: normal !important; }
#grw-container * { box-sizing: border-box !important; }
#grw-bubble{position:relative!important;width:58px!important;height:58px!important;background:#0096FF!important;border-radius:50%!important;display:flex!important;align-items:center!important;justify-content:center!important;cursor:pointer!important;box-shadow:0 4px 18px rgba(0,150,255,.38)!important;z-index:2147483647!important;border:none!important;padding:0!important;margin:0!important;transition:transform .18s!important}
#grw-bubble:hover{transform:scale(1.07)!important}
#grw-window{position:absolute!important;bottom:75px!important;right:0!important;width:358px!important;height:550px!important;background:#fff!important;border-radius:18px!important;box-shadow:0 10px 44px rgba(0,0,0,.15)!important;flex-direction:column!important;overflow:hidden!important;z-index:2147483646!important;display:none!important;font-size:14px!important;color:#222!important}
#grw-window.grw-on{display:flex!important}
#grw-head{background:#0096FF!important;padding:13px 16px!important;display:flex!important;align-items:center!important;gap:10px!important;flex-shrink:0!important}
#grw-head-icon{width:34px!important;height:34px!important;border-radius:50%!important;background:rgba(255,255,255,.2)!important;display:flex!important;align-items:center!important;justify-content:center!important;flex-shrink:0!important}
#grw-head-txt{flex:1!important}
#grw-head-name{color:#fff!important;font-size:13px!important;font-weight:700!important;margin:0!important}
#grw-head-sub{color:rgba(255,255,255,.75)!important;font-size:11px!important;margin:2px 0 0!important}
#grw-close{background:none!important;border:none!important;cursor:pointer!important;color:rgba(255,255,255,.85)!important;width:28px!important;height:28px!important;display:flex!important;align-items:center!important;justify-content:center!important;border-radius:50%}
#grw-close:hover{background:rgba(255,255,255,.15)!important}
#grw-msgs{flex:1!important;overflow-y:auto!important;padding:16px 13px!important;display:flex!important;flex-direction:column!important;gap:12px!important;background:#f7f8fa!important;scroll-behavior:smooth!important}
.grw-msg{display:flex!important;flex-direction:column!important;gap:3px!important;max-width:88%!important}
.grw-msg.grw-bot{align-self:flex-start!important}
.grw-msg.grw-user{align-self:flex-end!important}
.grw-bbl{padding:9px 13px!important;font-size:12.5px!important;line-height:1.65!important;margin:0!important;word-break:keep-all!important;white-space:pre-line!important}
.grw-bot .grw-bbl{background:#fff!important;color:#222!important;border-radius:4px 14px 14px 14px!important;border:1px solid #eaeaea!important}
.grw-user .grw-bbl{background:#0096FF!important;color:#fff!important;border-radius:14px 4px 14px 14px!important}
#grw-faq{border-top:1px solid #efefef!important;background:#fff!important;padding:11px 13px 14px!important;flex-shrink:0!important}
#grw-faq-label{font-size:10.5px!important;color:#aaa!important;font-weight:600!important;margin:0 0 8px!important}
#grw-chips{display:flex!important;flex-wrap:wrap!important;gap:6px!important;margin:0 0 9px!important;padding:0!important;list-style:none!important}
.grw-chip{padding:6px 12px!important;border:1px solid #e2e8f0!important;border-radius:18px!important;font-size:11.5px!important;color:#444!important;background:#f8fafc!important;cursor:pointer!important;transition:all .12s!important}
.grw-chip:hover{background:#e8f4ff!important;border-color:#0096FF!important;color:#0096FF!important}
#grw-mail{width:100%!important;display:flex!important;align-items:center!important;gap:8px!important;padding:9px 13px!important;background:#f0f7ff!important;border:1px solid #cce4ff!important;border-radius:11px!important;cursor:pointer!important;font-size:12px!important;color:#0096FF!important;font-weight:600!important;text-align:left!important;transition:background .12s!important}
#grw-mail:hover{background:#ddeeff!important}
#grw-mail span{flex:1!important}

.grw-typing { display: flex !important; align-items: center !important; gap: 4px !important; padding: 12px 16px !important; background: #fff !important; border: 1px solid #eaeaea !important; border-radius: 4px 14px 14px 14px !important; max-width: 70px !important; align-self: flex-start !important; }
.grw-dot { width: 6px !important; height: 6px !important; background: #888 !important; border-radius: 50% !important; animation: grwBounce 1.4s infinite ease-in-out both !important; }
.grw-dot:nth-child(1) { animation-delay: -0.32s !important; }
.grw-dot:nth-child(2) { animation-delay: -0.16s !important; }
@keyframes grwBounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
  `;

  var style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  // 3. HTML 레이아웃 구조 생성
  var container = document.createElement('div');
  container.id = 'grw-container';
  container.innerHTML = `
<button id="grw-bubble" type="button">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4M8 15h.01M16 15h.01"/>
  </svg>
</button>
<div id="grw-window">
  <div id="grw-head">
    <div id="grw-head-icon"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></div>
    <div id="grw-head-txt">
      <p id="grw-head-name" style="margin:0;color:#fff;font-weight:bold;">genie rele 고객센터</p>
      <p id="grw-head-sub" style="margin:0;color:rgba(255,255,255,0.7);font-size:11px;">지니릴리 음원 유통 서비스</p>
    </div>
    <button id="grw-close" type="button" style="color:#fff;background:none;border:none;cursor:pointer;font-size:16px;">X</button>
  </div>
  <div id="grw-msgs">
    <div class="grw-msg grw-bot">
      <p class="grw-bbl">안녕하세요! genie rele 고객센터입니다 😊\n\n자주 묻는 질문을 아래에서 선택해 주세요.\n해당 내용이 없으면 이메일로 문의해 주세요.</p>
    </div>
  </div>
  <div id="grw-faq">
    <p id="grw-faq-label">자주 묻는 질문</p>
    <div id="grw-chips">
      <button type="button" class="grw-chip" data-key="settlement">💰 정산금 입금</button>
      <button type="button" class="grw-chip" data-key="refund">💳 환불 방법</button>
      <button type="button" class="grw-chip" data-key="cancel">🚫 상품 해지</button>
      <button type="button" class="grw-chip" data-key="stop">⏹ 발매 중지</button>
      <button type="button" class="grw-chip" data-key="transfer">📦 앨범 이관</button>
    </div>
    <button type="button" id="grw-mail">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0096FF" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
      <span>원하는 답변을 찾지 못했다면? 이메일 문의하기</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0096FF" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </button>
  </div>
</div>`;

  // 4. 지니릴리 레이어 안으로 안전하게 안착시키는 주입 함수
  function injectWidget() {
    var target = document.querySelector('.main_introduction_container') || document.body;
    if (target) {
      target.appendChild(container);
      initEvents();
    } else {
      setTimeout(injectWidget, 30);
    }
  }

  // 5. 버튼 클릭 및 애니메이션 이벤트 바인딩
  function initEvents() {
    var bubble = document.getElementById('grw-bubble');
    var win = document.getElementById('grw-window');
    var mBox = document.getElementById('grw-msgs');
    
    bubble.onclick = function() { win.classList.toggle('grw-on'); };
    document.getElementById('grw-close').onclick = function() { win.classList.remove('grw-on'); };

    window.addMsg = function(text, type) {
      var msgClass = type === 'user' ? 'grw-msg grw-user' : 'grw-msg grw-bot';
      mBox.innerHTML += `<div class="${msgClass}"><p class="grw-bbl">${text}</p></div>`;
      mBox.scrollTop = mBox.scrollHeight;
    };

    window.showTyping = function() {
      var typingDiv = document.createElement('div');
      typingDiv.id = 'grw-loading-dots';
      typingDiv.className = 'grw-typing';
      typingDiv.innerHTML = '<div class="grw-dot"></div><div class="grw-dot"></div><div class="grw-dot"></div>';
      mBox.appendChild(typingDiv);
      mBox.scrollTop = mBox.scrollHeight;
    };

    window.hideTyping = function() {
      var dots = document.getElementById('grw-loading-dots');
      if(dots) dots.remove();
    };

    var chips = document.querySelectorAll('.grw-chip');
    chips.forEach(function(chip) {
      chip.onclick = function() {
        var item = DATA[chip.getAttribute('data-key')];
        addMsg(item.q, 'user');
        showTyping();
        setTimeout(function(){
          hideTyping();
          addMsg(item.a, 'bot');
        }, 350);
      };
    });

    document.getElementById('grw-mail').onclick = function(e) {
      e.stopPropagation();
      addMsg("이메일로 문의하고 싶어요.", 'user');
      showTyping();
      setTimeout(function(){
        hideTyping();
        addMsg("아래 이메일로 문의해 주시면 빠르게 답변드리겠습니다 😊\n📧 rele.help@kt.com", 'bot');
      }, 350);
    };
  }

  injectWidget();
  console.log("🚀 [Git 배포용] 최신 트렌디 봇 위젯 로드 완료!");
})();
