import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./QrScanner.css";

const QrScanner = () => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );
    const onScanSuccess = (decodedText) => {
      alert(`read QR: ${decodedText}`);
      scanner.clear();
    };
    scanner.render(onScanSuccess);
    return () => scanner.clear().catch((e) => console.error(e));
  }, []);

  return (
    <div className="qr-container">
      <div id="reader"></div>
    </div>
  );
};

export default QrScanner;
