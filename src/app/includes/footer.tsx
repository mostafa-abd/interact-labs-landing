import Image from "next/image";
import Facebook from "../assets/images/facebook.svg";
import Instagram from "../assets/images/instagram.svg";
import X from "../assets/images/x.svg";
import Snap from "../assets/images/snap.svg";
import Tiktok from "../assets/images/tiktok.svg";

export default function Footer() {
  return (
    <footer>
      <h3>Copyright © 2025 Interact Labs. All Rights Reserved.</h3>
      <div className="social">
        <a href="" target="_blank">
          <Image src={Facebook} alt="Interact Labs facebook" />

        </a>
           <a href="" target="_blank">
          <Image src={Instagram} alt="Interact Labs facebook" />

        </a>
           <a href="" target="_blank">
          <Image src={X} alt="Interact Labs facebook" />

        </a>
                       <a href="" target="_blank">
          <Image src={Snap} alt="Interact Labs facebook" />

        </a>
           <a href="" target="_blank">
          <Image src={Tiktok} alt="Interact Labs facebook" />

        </a>   
    
      </div>
    </footer>
  );
}
