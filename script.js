const sendBtn = document.getElementById('sendBtn');
const feedback = document.getElementById('feedback');

const GAS_URL = "https://script.google.com/macros/s/AKfycbxbj1lhRhgu6RcX3xyPua4M88DB_WuS7TEQfbwJqyLBuR9X-O5YI_DVSkNl4FaZt6cXEg/exec";
const SHOP_NAME = "リヨン ソレイユ";

// 店舗へのご意見送信
if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const comment = feedback.value.trim();

    if (!comment) {
      alert("ご意見を入力してください。");
      return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = "送信中...";

    sendToGas({
      shop: SHOP_NAME,
      rating: "",
      comment: comment
    }).finally(() => {
      setTimeout(() => {
        window.location.href = "thanks.html";
      }, 500);
    });
  });
}

// GAS送信用
function sendToGas(data) {
  return fetch(GAS_URL, {
    method: "POST",
    body: JSON.stringify(data)
  }).catch(error => {
    console.error("送信エラー:", error);
  });
}
