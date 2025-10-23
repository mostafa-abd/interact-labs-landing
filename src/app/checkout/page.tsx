'use client';

import "../assets/css/checkout.css";
export default function Checkout() {
  return (
    <section className="checkout">
      <form action="">
        <h2>Delivery Information</h2>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" placeholder="Your name" id="name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Your email" id="email" />
        </div>

        <div>
          <label htmlFor="Country">Country</label>
<select name="country" id="Country"></select>        
<option disabled selected >Select Country</option>
</div>
        <div>
          <label htmlFor="City">City</label>
          <input type="text" placeholder="Your city" id="City" />
        </div>
        <div className="phone">
          <label htmlFor="City">Phone number</label>
          <input type="text" placeholder="Your city" id="City" />
        </div>
      </form>
      <div className="order-summary"></div>
    </section>
  );
}
