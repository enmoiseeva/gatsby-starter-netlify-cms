import React from "react";
import In from "../../assets/in.svg";
import Mail from "../../assets/mail.svg";
import Twitter from "../../assets/twitter.svg";

export function Social() {
  return (
    <div className="is-flex social">
      <a
        title="twitter"
        href="https://twitter.com/Tat1anaMoiseeva"
        className="twitter-icon"
        target="_blank"
      >
        <Twitter />
      </a>
      <a
        title="linkedin"
        href="https://www.linkedin.com/in/tatiana-moiseeva-382b4b54/"
        className="in-icon"
        target="_blank"
      >
        <In />
      </a>
      <a
        title="mail"
        href="mailto:tatiana.moiseeva@taltech.ee"
        className="mail-icon"
      >
        <Mail />
      </a>
    </div>
  );
}
