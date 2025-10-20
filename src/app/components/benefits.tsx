import Image from "next/image";
import Compatible from '../assets/images/Compatible.svg';
import Durable from '../assets/images/Durable.svg';
import Monitors from '../assets/images/Monitors.svg';
import Effective from '../assets/images/Effective.svg';
import users from '../assets/images/users.svg';

export default function Benefits() {
  return (
    <section className="benefits">
      <h1>TACT Benefits</h1>
      <div className="benefits-boxes">
        <div>
          <span>
            <Image src={Durable} alt="Unlike electronic boards that are easily damaged with  wear and tear."/>
          </span>
          <h4>Durable</h4>
          <p>Unlike electronic boards that are easily damaged with  wear and tear.</p>
        </div>
        <div>
          <span>
             <Image src={Compatible} alt="Works with any Projector, any TV screen, any software."/>
          </span>
          <h4>Compatible</h4>
          <p>Works with any Projector, any TV screen, any software.</p>
        </div>
        <div>
          <span>
             <Image src={Monitors} alt="Transforms large screens/monitors into a fast and accurate interactive surface up to 150 inches."/>
          </span>
          <h4>Large Monitors</h4>
          <p>Transforms large screens/monitors into a fast and accurate </p>
        </div>
        <div>
          <span>
             <Image src={Effective} alt="Cost less than half the price of an electronic board."/>
          </span>
          <h4>Cost Effective</h4>
          <p>Cost less than half the price of an electronic board.</p>
        </div>
        <div>
          <span>
             <Image src={users} alt="The number of interacting users at the same time can reach 4 users"/>
          </span>
          <h4>Up to 4 users</h4>
          <p>The number of interacting users at the same time can reach 4 users</p>
        </div>
      </div>
    </section>
  );
}
