(function(){
  var DATA = {
    settlement: {
      q: "정산금은 언제 입금되나요?",
      a: "정산은 앨범 발매 월(M) 기준 2개월 뒤(M+2)에 지급됩니다.\n\n📅 정산 일정\n• 매월 15일 — 정산 리포트 제공\n• 매월 말일 — 정산금 입금\n\n예시) 1월 발매 → 3월 15일 리포트 → 3월 말 입금\n\n📍 확인 경로\n로그인 > 통계 및 정산 > 정산\n\n※ 해외 플랫폼은 특성상 최대 6개월~1년 소요될 수 있습니다."
    },
    refund: {
      q: "환불은 어떻게 진행되나요?",
      a: "환불은 자동 처리되지 않으며, 직접 해지 신청이 필요합니다.\n\n📍 신청 경로\n1. 로그인\n2. [계정관리] → [상품가입정보] → [상품 해지]\n\n⏱ 처리 기간\n해지 완료 후 카드사 승인 취소까지 영업일 기준 약 3~5일이 소요될 수 있습니다."
    },
    cancel: {
      q: "상품 해지는 어떻게 하나요?",
      a: "아래 순서로 진행해 주세요.\n\n1. 로그인\n2. [계정관리] → [상품가입정보] → [상품 해지]\n\n추가 문의는 이메일로 연락해 주세요.\n📧 rele.help@kt.com"
    },
    stop: {
      q: "발매 중지는 어떻게 요청하나요?",
      a: "아래 순서로 진행해 주세요.\n\n1. 로그인\n2. [내 음악] → [발매 완료] → [앨범 선택] → [발매 중지 요청]\n\n※ 요청이 정상 접수된 이후 서비스 중단이 진행됩니다."
    },
    transfer: {
      q: "서비스 종료 시 앨범 이관이 가능한가요?",
      a: "별도의 앨범 이관 작업은 지원되지 않습니다.\n\n다만 서비스 종료 요청이 접수된 경우, 타 유통사 이관에 필요한 데이터(UPC, ISRC 코드 등)는 전달해 드리고 있습니다.\n\n데이터를 받지 못하셨다면 고객센터로 문의해 주세요.\n📧 rele.help@kt.com"
    }
  };

  var CSS = `
#grw-container { position: fixed !important; bottom: 0 !important; right: 0 !important; z-index: 2147483647 !important; width: auto !important; height: auto !important; font-family: -apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo','Malgun Gothic',sans-serif !important; box-sizing: border-box !important; }
#grw-container * { box-sizing: border-box !important; }
#grw-bubble{position:fixed!important;bottom:28px!important;right:28px!important;width:58px!important;height:58px!important;background:#0096FF!important;border-radius:50%!important;display:flex!important;align-items:center!important;justify-content:center!important;cursor:pointer!important;box-shadow:0 4px 18px rgba(0,150,255,.38)!important;z-index:2147483647!important;border:none!important;padding:0!important;margin:0!important;transition:transform .18s!important;left:auto!important;top:auto!important}
#grw-bubble:hover{transform:scale(1.07)!important}
#grw-window{position:fixed!important;bottom:100px!important;right:28px!important;width:358px!important;height:550px!important;background:#fff!important;border-radius:18px!important;box-shadow:0 10px 44px rgba(0,0,0,.15)!important;flex-direction:column!important;overflow:hidden!important;z-index:2147483646!important;display:none!important;left:auto!important;top:auto!important;font-size:14px!important;color:#222!important}
#grw-window.grw-on{display:flex!important}
#grw-head{background:#0096FF!important;padding:13px 16px!important;display:flex!important;align-items:center!important;gap:10px!important;flex-shrink:0!important}
#grw-head-icon{width:34px!important;height:34px!important;border-radius:50%!important;background:rgba(255,255,255,.2)!important;display:flex!important;align-items:center!important;justify-content:center!important;flex-shrink:0!important}
#grw-head-txt{flex:1!important}
#grw-head-name{color:#fff!important;font-size:13px!important;font-weight:700!important;margin:0!important;padding:0!important;background:none!important;border:none!important}
#grw-head-sub{color:rgba(255,255,255,.75)!important;font-size:11px!important;margin:2px 0 0!important;padding:0!important}
#grw-close{background:none!important;border:none!important;cursor:pointer!important;color:rgba(255,255,255,.85)!important;width:28px!important;height:28px!important;display:flex!important;align-items:center!important;justify-content:center!important;border-radius:50%!important;padding:0!important;flex-shrink:0!important}
#grw-close:hover{background:rgba(255,255,255,.15)!important}
#grw-msgs{flex:1!important;overflow-y:auto!important;padding:16px 13px!important;display:flex!important;flex-direction:column!important;gap:12px!important;background:#f7f8fa!important;scroll-behavior:smooth!important}
#grw-msgs::-webkit-scrollbar{width:3px!important}
#grw-msgs::-webkit-scrollbar-thumb{background:#ddd!important;border-radius:3px!important}
.grw-msg{display:flex!important;flex-direction:column!important;gap:3px!important;max-width:88%!important}
.grw-msg.grw-bot{align-self:flex-start!important}
.grw-msg.grw-user{align-self:flex-end!important}
.grw-bbl{padding:9px 13px!important;font-size:12.5px!important;line-height:1.65!important;margin:0!important;word-break:keep-all!important;white-space:pre-line!important}
.grw-bot .grw-bbl{background:#fff!important;color:#222!important;border-radius:4px 14px 14px 14px!important;border:1px solid #eaeaea!important}
.grw-user .grw-bbl{background:#0096FF!important;color:#fff!important;border-radius:14px 4px 14px 14px!important}
.grw-time{font-size:10px!important;color:#bbb!important;padding:0 3px!important;margin:0!important}
.grw-bot .grw-time{align-self:flex-start!important}
.grw-user .grw-time{align-self:flex-end!important}
.grw-typing-wrap{align-self:flex-start!important}
.grw-typing{display:flex!important;align-items:center!important;gap:4px!important;padding:10px 14px!important;background:#fff!important;border:1px solid #eaeaea!important;border-radius:4px 14px 14px 14px!important}
.grw-dot{width:6px!important;height:6px!important;border-radius:50%!important;background:#bbb!important;display:inline-block!important;animation:grw-blink 1.2s infinite!important}
.grw-dot:nth-child(2){animation-delay:.2s!important}
.grw-dot:nth-child(3){animation-delay:.4s!important}
@keyframes grw-blink{0%,80%,100%{opacity:.2}40%{opacity:1}}
#grw-faq{border-top:1px solid #efefef!important;flex-shrink:0!important;background:#fff!important;padding:11px 13px 14px!important}
#grw-faq-label{font-size:10.5px!important;color:#aaa!important;font-weight:600!important;margin:0 0 8px!important;padding:0!important}
#grw-chips{display:flex!important;flex-wrap:wrap!important;gap:6px!important;margin:0 0 9px!important;padding:0!important;list-style:none!important}
.grw-chip{padding:6px 12px!important;border:1px solid #e2e8f0!important;border-radius:18px!important;font-size:11.5px!important;font-weight:500!important;color:#444!important;background:#f8fafc!important;cursor:pointer!important;display:inline-flex!important;align-items:center!important;gap:5px!important;transition:all .12s!important;font-family:inherit!important;line-height:1!important;margin:0!important}
.grw-chip:hover{background:#e8f4ff!important;border-color:#0096FF!important;color:#0096FF!important}
#grw-mail{width:100%!important;display:flex!important;align-items:center!important;gap:8px!important;padding:9px 13px!important;background:#f0f7ff!important;border:1px solid #cce4ff!important;border-radius:11px!important;cursor:pointer!important;font-size:12px!important;font-weight:600!important;color:#0096FF!important;transition:background .12s!important;font-family:inherit!important;text-align:left!important;margin:0!important}
#grw-mail:hover{background:#ddeeff!important}
#grw-mail span{flex:1!important}
  `;

  function injectCSS() {
    var s = document.createElement('style');
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function getTime() {
    return new Date().toLocaleTimeString('ko-KR', {hour:'2-digit', minute:'2-digit'});
  }

  function addMsg(text, role) {
    var msgs = document.getElementById('grw-msgs');
    if(!msgs) return;
    var d = document.createElement('div');
    d.className = 'grw-msg grw-' + role;
    var b = document.createElement('p');
    b.className = 'grw-bbl';
    b.textContent = text;
    var s = document.createElement('span');
    s.className = 'grw-time';
    s.textContent = getTime();
    d.appendChild(b); d.appendChild(s);
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping() {
    var msgs = document.getElementById('grw-msgs');
    if(!msgs) return;
    var d = document.createElement('div');
    d.className = 'grw-typing-wrap'; d.id = 'grw-ty';
    d.innerHTML = '<div class="grw-typing"><span class="grw-dot"></span><span class="grw-dot"></span><span class="grw-dot"></span></div>';
    msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
  }

  function hideTyping() {
    var el = document.getElementById('grw-ty');
    if (el) el.parentNode.removeChild(el);
  }

  function ask(key) {
    var item = DATA[key]; if (!item) return;
    addMsg(item.q, 'user');
    showTyping();
    setTimeout(function(){ hideTyping(); addMsg(item.a, 'bot'); }, 350);
  }

  function buildHTML() {
    // 중복 생성 방지
    if(document.getElementById('grw-container')) return;

    var container = document.createElement('div');
    container.id = 'grw-container';
    
    container.innerHTML = `
<button id="grw-bubble" type="button" aria-label="고객센터 열기">
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
</button>
<div id="grw-window">
  <div id="grw-head">
    <div id="grw-head-icon">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
    </div>
    <div id="grw-head-txt">
      <p id="grw-head-name">genie rele 고객센터</p>
      <p id="grw-head-sub">지니릴리 음원 유통 서비스</p>
    </div>
    <button id="grw-close" type="button" aria-label="닫기">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>
  <div id="grw-msgs">
    <div class="grw-msg grw-bot">
      <p class="grw-bbl">안녕하세요! genie rele 고객센터입니다 😊\n\n자주 묻는 질문을 아래에서 선택해 주세요.\n해당 내용이 없으면 이메일로 문의해 주세요.</p>
      <span class="grw-time" id="grw-init-time"></span>
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
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0096FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
      <span>해당 내용이 없다면 이메일로 문의하기</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0096FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </button>
  </div>
</div>`;
    
    document.body.appendChild(container);
  }

  function init() {
    injectCSS();
    buildHTML();

    var it = document.getElementById('grw-init-time');
    if (it) it.textContent = getTime();

    var bubble = document.getElementById('grw-bubble');
    var win = document.getElementById('grw-window');

    if(bubble && win) {
      bubble.onclick = function(e) {
        e.stopPropagation(); e.preventDefault();
        win.classList.toggle('grw-on');
        return false;
      };
    }

    var closeBtn = document.getElementById('grw-close');
    if(closeBtn && win) {
      closeBtn.onclick = function(e) {
        e.stopPropagation();
        win.classList.remove('grw-on');
      };
    }

    var chips = document.querySelectorAll('.grw-chip');
    for (var i = 0; i < chips.length; i++) {
      (function(chip){
        chip.onclick = function(e) {
          e.stopPropagation();
          ask(chip.getAttribute('data-key'));
        };
      })(chips[i]);
    }

    var mailBtn = document.getElementById('grw-mail');
    if(mailBtn) {
      mailBtn.onclick = function(e) {
        e.stopPropagation();
        addMsg("이메일로 문의하고 싶어요.", 'user');
        showTyping();
        setTimeout(function(){
          hideTyping();
          addMsg("아래 이메일로 문의해 주시면 빠르게 답변드리겠습니다 😊\n📧 rele.help@kt.com", 'bot');
        }, 350);
      };
    }
  }

  // 실서버 로드가 끝난 상태(콘솔 주입)여도 즉시 실행되도록 보완
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
