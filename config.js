window.HR_CONFIG = { endpoint: "https://script.google.com/macros/s/AKfycbxSa5hg1HUmdhMKrr-1ckNFYULto1Elnym9C2yMDTS4Xun2L8_-pzm5XQUJdPOOrXLs/exec" };

if (!document.querySelector('link[href*="candidate-reading.css"]')) {
  const readingStyle = document.createElement('link');
  readingStyle.rel = 'stylesheet';
  readingStyle.href = './candidate-reading.css?v=1';
  document.head.append(readingStyle);
  import('./candidate-reading.js?v=1');
}
