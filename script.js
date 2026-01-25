const toggleBtn = document.querySelector(`.toggle-btn`);
const detail = document.querySelector(`.detail`);

toggleBtn.addEventListener(`click`, () => {
  detail.classList.toggle(`hidden`);
});

const menuBtn = document.querySelector(`.menu-btn`);
const menu = document.querySelector(`.menu`);

// メニューが開いているかどうか
let isMenuOpen = false;

// メニューを開く
function openMenu() {
  menu.classList.remove("hidden");
  isMenuOpen = true;
};

// メニューを閉じる
function closeMenu () {
  menu.classList.add("hidden");
  isMenuOpen = false;
};

// ボタンクリックで開閉
menuBtn.addEventListener(`click`, (e) => {
  // 外クリック判定に引っかからないようにする
  e.stopPropagation();

  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

// メニューを外クリックで閉じる
document.addEventListener(`click`, (e) =>{
  if(!isMenuOpen) return;

  if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
    closeMenu();
  }
});

// ESCキーで閉じる
document.addEventListener("keydown", (e) => {
  if(!isMenuOpen) return;

  if(e.key === "Escape") {
    closeMenu();
  }
});

const buttons = document.querySelectorAll(`.faq-btn`);

buttons.forEach((btn) => {
  btn.addEventListener(`click`, () => {
    // 今開いているものを全部閉じる
    document.querySelectorAll(`.faq-answer`).forEach((answer) => {
      answer.classList.add(`hidden`);
    });

    const answer = btn.nextElementSibling;
    answer.classList.toggle(`hidden`);
  });
});

// メニュー内リンクを押したら閉じる
menu.addEventListener("click", (e) =>{
  if (!isMenuOpen) return;
  if(e.target.tagName !== "A") return;

  closeMenu();
});

const form = document.getElementById("contact-form")
const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const messageInput = document.getElementById("message")
const errorText = document.getElementById("form-error");
const successText = document.getElementById("form-success");

function showError(message) {
  errorText.textContent = message;
  errorText.classList.remove("hidden");
}

function clearError() {
  errorText.textContent = "";
  errorText.classList.add("hidden");
}

function showSuccess(message) {
  successText.textContent = message;
  successText.classList.remove("hidden");
}

function clearSuccess() {
  successText.textContent = "";
  successText.classList.add("hidden")
}

[nameInput, emailInput, messageInput].forEach((el) => {
  el.addEventListener("input", () => {
    clearError();
    clearSuccess();
  });
});

function isValidEmail(value) {
  return value.includes("@");
}

form.addEventListener("submit" , (e) => {
  e.preventDefault();

 clearError();
 clearSuccess();

  if(!nameInput.value.trim()) {
    showError("お名前を入力してください")
    return;
  }

  if(!emailInput.value.trim()) {
    showError("メールアドレスを入力してください")
    return;
  }

  if(!isValidEmail(emailInput.value.trim())) {
    showError("メールアドレスの形式が正しくありません（例：aaa@example.com");
    return;
  }

  if(!messageInput.value.trim()) {
    showError("お問い合わせ内容を入力してください")
    return;
  }

  // 成功時（デモ）

  showSuccess("送信内容を受け付けました（これはデモです）");
  form.reset();     //入力欄を空にする
});