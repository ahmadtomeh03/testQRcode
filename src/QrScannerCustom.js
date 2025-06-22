import React, { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import "./QrScanner.css";

const QrScannerCustom = () => {
  const [scanning, setScanning] = useState(false);
  const qrRef = useRef(null);

  const startScan = () => {
    const html5QrCode = new Html5Qrcode("reader");
    setScanning(true);

    html5QrCode
      .start(
        { facingMode: "environment" }, // الكاميرا الخلفية
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          alert(`تم تحديد الطاولة: ${decodedText}`);
          html5QrCode.stop().then(() => setScanning(false));
        },
        (err) => {
          console.warn("خطأ في القراءة:", err);
        }
      )
      .catch((err) => {
        console.error("خطأ في بدء الكاميرا:", err);
        setScanning(false);
      });

    qrRef.current = html5QrCode;
  };

  return (
    <div className="qr-container">
      <img src="/coffee-icon.png" alt="coffee logo" className="coffee-icon" />
      {!scanning && (
        <button className="scan-btn" onClick={startScan}>
          ☕️ امسح QR للطاولة
        </button>
      )}
      <div id="reader" className="qr-reader-box"></div>
    </div>
  );
};

export default QrScannerCustom;
