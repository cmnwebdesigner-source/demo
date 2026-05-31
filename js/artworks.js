const artworkData = [
  {
    "title": "Tradition",
    "price": "700 EUR",
    "size": "90 x 70 cm",
    "technique": "Acrylic",
    "images": [
      "assets/images/tradition-wall.jpg",
      "assets/images/tradition-detail.jpg"
    ],
    "desc": "This painting embodies both feminine tenderness and strength — a quiet power woven through generations. Women’s traditions form the soul of folk culture, preserving ancient customs, beauty, and timeless wisdom that still inspire us today.\n\nTo accurately reflect the original colors and texture, the artwork is photographed in natural light and interior ambient light.\n\nA celebration of heritage, femininity, and the deep connection between past and present.\n\nEvery detail carries emotion, memory, and the spirit of tradition reimagined through contemporary art.\n\nOriginal Painting for Sale\n\nCertificate of Authenticity included"
  },
  {
    "title": "Fragility Woven from Light",
    "price": "1000 EUR",
    "size": "100 x 100 cm",
    "technique": "Original painting",
    "images": [
      "assets/images/fragility-wall.jpg",
      "assets/images/fragility-detail.jpg"
    ],
    "desc": "A soul woven from light, strength, and scars.\n\nWhere fragility becomes beauty... and every crack tells a story.\n\nOriginal Painting for Sale\n\nCertificate of Authenticity included"
  },
  {
    "title": "Eternal Protection",
    "price": "1000 EUR",
    "size": "100 x 100 cm",
    "technique": "Mixed technique Knife painting",
    "images": [
      "assets/images/eternal-protection-wall.jpg",
      "assets/images/eternal-protection-detail.jpg"
    ],
    "desc": "Some wounds are silent.\n\nSome battles are invisible.\n\nAnd some souls survive because something unseen keeps protecting them.\n\n\"Eternal Protection\" speaks about hidden emotions, inner strength, and the quiet darkness people carry behind their smiles.\n\nCreated entirely by hand using palette knife techniques, every texture holds movement, tension, and emotion.\n\nOriginal hand-painted artwork by Eliart\n\nCertificate of Authenticity"
  },
  {
    "title": "Enchanted",
    "price": "1000 EUR",
    "size": "100 x 100 cm",
    "technique": "Original painting",
    "images": [
      "assets/images/enchanted-wall.jpg",
      "assets/images/enchanted-detail.jpg"
    ],
    "desc": "A soul woven from light, strength, and scars.\n\nWhere fragility becomes beauty... and every crack tells a story.\n\nOriginal Painting for Sale\n\nCertificate of Authenticity included"
  },
  {
    "title": "Black & white",
    "price": "900 EUR",
    "size": "80 x 70 cm",
    "technique": "Original artwork",
    "images": [
      "assets/images/silken-thought-wall.jpg",
      "assets/images/silken-thought-detail.jpg"
    ],
    "desc": "A woman suspended between silence and emotion...\n\nBlack & white realism touched by flowing pink silk like thoughts you can almost see, but never fully hold.\n\nThe silk becomes memory, emotion, time...\n\nsoftly weaving through her face, her breath, her story.\n\nFreedom. Longing. Femininity. Strength.\n\nCertificate of Authenticity included"
  },
  {
    "title": "Emerald Silence",
    "price": "350 EUR",
    "size": "50 x 70 cm",
    "technique": "Mixed Technique",
    "images": [
      "assets/images/emerald-silence-wall.jpg",
      "assets/images/emerald-silence-detail.jpg"
    ],
    "desc": "Original Painting for Sale\n\nHand-painted original artwork\n\nCertificate of Authenticity included\n\nA portrait of mystery, feminine strength, and hidden emotions wrapped in vibrant color and gold textures."
  },
  {
    "title": "Silk Thoughts",
    "price": "900 EUR",
    "size": "90 x 70 cm",
    "technique": "Original painting available",
    "images": [
      "assets/images/silk-thoughts-wall.jpg",
      "assets/images/silk-thoughts-detail.jpg"
    ],
    "desc": "Sometimes the loudest feelings exist in complete silence.\n\nThis painting was created in one of those moments when the world faded away and only emotion remained between me and the canvas. The soft pink ribbon became a symbol of thoughts, memories, and invisible emotions we carry inside ourselves.\n\nCertificate of Authenticity included"
  }
];

let artworkSavedScrollY = 0;
let artworkCloseTimer = null;

function lockArtworkPageScroll() {
  artworkSavedScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
  document.documentElement.classList.add('modal-open');
  document.body.classList.add('modal-open');
  document.body.style.position = 'fixed';
  document.body.style.top = `-${artworkSavedScrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
  document.body.style.overflow = 'hidden';
}

function unlockArtworkPageScroll(restoreScroll = true) {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  document.body.style.overflow = '';
  document.documentElement.classList.remove('modal-open');
  document.body.classList.remove('modal-open');
  if (restoreScroll) {
    window.scrollTo(0, artworkSavedScrollY);
  }
}

function openArtwork(index) {
  const data = artworkData[index];
  if (!data) return;

  const modal = document.getElementById('artwork-modal');
  const image = document.getElementById('artwork-modal-image');
  const title = document.getElementById('artwork-modal-title');
  const info = document.getElementById('artwork-modal-info');
  const desc = document.getElementById('artwork-modal-desc');
  const thumbs = document.getElementById('artwork-modal-thumbs');

  image.src = data.images[0];
  image.alt = data.title;
  title.textContent = data.title;
  info.innerHTML = `<span>${data.size}</span><span>${data.technique}</span><strong>${data.price}</strong>`;
  desc.innerHTML = data.desc
    .split('\n')
    .filter(Boolean)
    .map(line => {
      const cleanLine = line.trim();
      const isCertificateLine = /certificate/i.test(cleanLine) && /(authenticity|autenticitate)/i.test(cleanLine);
      return `<p${isCertificateLine ? ' class="certificate-highlight"' : ''}>${escapeHtml(cleanLine)}</p>`;
    })
    .join('');
  thumbs.innerHTML = data.images.map((src, i) => `
    <button type="button" class="artwork-thumb ${i === 0 ? 'active' : ''}" onclick="setArtworkImage('${src.replace(/'/g, "\\'")}', this, '${data.title.replace(/'/g, "\\'")}')">
      <img src="${src}" alt="${escapeHtml(data.title)} ${i + 1}">
    </button>
  `).join('');

  if (artworkCloseTimer) {
    clearTimeout(artworkCloseTimer);
    artworkCloseTimer = null;
  }

  modal.classList.remove('hidden');
  modal.scrollTop = 0;
  const panel = modal.querySelector('.artwork-modal-panel');
  if (panel) panel.scrollTop = 0;
  lockArtworkPageScroll();
  requestAnimationFrame(() => modal.classList.add('is-open'));
}

function setArtworkImage(src, btn, title) {
  const image = document.getElementById('artwork-modal-image');
  image.src = src;
  image.alt = title;
  document.querySelectorAll('.artwork-thumb').forEach(item => item.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

function closeArtworkModal() {
  const modal = document.getElementById('artwork-modal');
  if (!modal) return;

  modal.classList.remove('is-open');
  unlockArtworkPageScroll(true);

  artworkCloseTimer = setTimeout(() => {
    modal.classList.add('hidden');
    artworkCloseTimer = null;
  }, 220);
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeArtworkModal();
});
