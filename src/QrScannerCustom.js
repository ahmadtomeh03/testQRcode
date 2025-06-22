import { useRef, useState } from "react";
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
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          alert(`select table: ${decodedText}`);
          html5QrCode.stop().then(() => setScanning(false));
        },
        (err) => {
          console.warn("error : ", err);
        }
      )
      .catch((err) => {
        console.error("error in camera", err);
        setScanning(false);
      });
    qrRef.current = html5QrCode;
  };

  return (
    <div className="qr-container">
      <div className="qr-card">
        <img src="/healthy.png" alt="coffee Logo" className="coffee-icon" />
        {!scanning && (
          <button className="scan-btn" onClick={startScan}>
            Click To Scan QR code
          </button>
        )}
        <div id="reader" className="qr-reader-box"></div>
      </div>
    </div>
  );
};

export default QrScannerCustom;
