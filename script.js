const stars = document.querySelectorAll('.star');
const good = document.getElementById('good');
const bad = document.getElementById('bad');
const sendBtn = document.getElementById('sendBtn');

const GAS_URL = "https://script.google.com/macros/s/AKfycbxbj1lhRhgu6RcX3xyPua4M88DB_WuS7TEQfbwJqyLBuR9X-O5YI_DVSkNl4FaZt6cXEg/exec";
const SHOP_NAME = "リヨン ソレイユ"; 

// 星クリック
stars.forEach(star => {
  star.addEventListener('click', () => {
    let rating = parseInt(star.getAttribute('data-value'));

    stars.forEach(s => s.classList.remove('active'));
    for (let i = 0; i < rating; i++) {
      stars[i].classList.add('active');
    }

    // 高評価だけ送信
    if (rating >= 4) {
      fetch(GAS_URL, {
        method: "POST",
        body: JSON.stringify({
          shop: SHOP_NAME,
          rating: rating,
          comment: ""
        })
      });
    }

    if (rating >= 4) {
      good.classList.remove('hidden');
      bad.classList.add('hidden');
    } else {
      bad.classList.remove('hidden');
      good.classList.add('hidden');
    }
  });
});

// 低評価送信
if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const comment = document.getElementById('feedback').value;
    const rating = document.querySelectorAll('.star.active').length;

    fetch(GAS_URL, {
      method: "POST",
      body: JSON.stringify({
        shop: SHOP_NAME,
        rating: rating,
        comment: comment
      })
    });

    setTimeout(() => {
      window.location.href = "thanks.html";
    }, 500);
  });
}