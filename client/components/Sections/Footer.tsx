import React from "react";

const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="w-full gap-4 h-full grid grid-cols-1 gap-y-20 sm:grid-cols-2 lg:grid-cols-3 text-white justify-center p-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl ">Restaurant</h1>
          <p className="flex flex-col gap-2">
            <span>Tigatto, Buhangin,</span>
            <span>Davao City, Davao del sur</span>
          </p>
          <p>Phone: +63 9773443205</p>
          <p>Email: info@prcoffee.com</p>
        </div>
        {/* <div className="flex flex-col gap-4">
          <h1>Useful Links</h1>
          <p>Home</p>
          <p>About</p>
          <p>Login</p>
          <p>Order</p>
        </div> */}
        <div className="flex flex-col gap-4">
          <h1>Customer Service</h1>
          <p>FAQ</p>
          <p>Returns & refunds</p>
          <p>Terms and conditions</p>
          <p>Policy</p>
        </div>
        <div className="flex flex-col gap-4">
          <h1>Our Newsletter</h1>
          <p>
            Stay updated with our exclusive content. Subscribe now for the
            latest news.
          </p>
          <div className="relative w-full flex rounded-full h-10">
            <input
              type="email"
              className="bg-stone-800 absolute left-0 w-full rounded-full h-full p-4 text-white"
            ></input>
            <button className="absolute right-0 w-[140px] bg-orange-300 text-white rounded-full h-full">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
