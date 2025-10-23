"use client";
import "../assets/css/checkout.css";
import Select from "react-select";
import { Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import Image from "next/image";
import ProductImage from '../assets/images/Product Card.svg'
export default function Checkout() {
  const [isClient, setIsClient] = useState(false);
  const [countries, setCountries] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryPhone, setcountryPhone] = useState(null);

  useEffect(() => {
    setIsClient(true);
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  const countriesNames = countries.map((c) => ({
    value: c.isoCode,
    label: c.name,
  }));

  const handleCountryChange = (selected) => {
    setSelectedCountry(selected);
    const states = State.getStatesOfCountry(selected.value) || [];
    setStateOptions(
      states.map((state) => ({
        label: state.name,
        value: state.name,
      }))
    );
    const selectedData = countries.find((c) => c.isoCode === selected.value);
    setcountryPhone(selectedData ? `${selectedData.phonecode}` : "");
  };

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
          {isClient ? (
            <Select
              placeholder="Select Country"
              isSearchable
              options={countriesNames}
              onChange={handleCountryChange}
              classNamePrefix="select"
            />
          ) : (
            <div></div>
          )}
        </div>
        <div>
          <label htmlFor="State">State </label>
          {isClient ? (
            <Select
              placeholder="Select State"
              isSearchable
              isDisabled={!selectedCountry}
              options={stateOptions}
              classNamePrefix="select"
            />
          ) : (
            <div></div>
          )}
        </div>
        <div className="phone">
          <label htmlFor="Phone">Phone number</label>
          {selectedCountry ? <span>+{countryPhone}</span> : <span></span>}
          <input
            type="text"
            placeholder="Your phone"
            id="Phone"
            pattern="^[0-9]{0,10}$"
            title="Phone number must be up to 10 digits"
            onInput={(e) => {
              e.target.value = e.target.value
                .replace(/[^0-9]/g, "")
                .slice(0, 10);
            }}
          />
        </div>
        <div>
          <label htmlFor="Address">Address</label>
          <input type="text" placeholder="Delivery Address" id="Address" />
        </div>
        <button type="submit">Continue to payment</button>
      </form>

      <div className="order-summary">
        <h2>Order Summary</h2>
        <div>

          <div className="product-Image">
           <Image
           src={ProductImage}
           alt="Interact Labs"
           priority/>
          </div>
          <div className="product-info">
            <h4>TACT ProLine</h4>
            <span>Qty: <b>1</b></span>
            <p>8400 EGP</p>
          </div>
        </div>
        <hr/>

        <div>
        <span>Subtotal</span>
        <span>8400 EGP</span>
        </div>
        <div>
          <span>Shipping</span>
        <span>Free Shipping</span>
        </div>
        <hr/>
        <div>
        <span>Total <br/> Including 14% VAT</span>
        <span>8400 EGP</span>
        </div>

      </div>
    </section>
  );
}
