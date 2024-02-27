import React from "react";

// const clients = ["Logo1.webp", "Logo2.webp"];
const ClientList = () => {
  const Clients = ["colosseum.webp", "donatnumnum.webp", "glazestore.webp", "L1.webp", "L2.webp"];

  return (
    <div className="flex flex-nowrap justify-center gap-4">
      {Clients.map((client, index) => (
        <div key={index} className="w-64">
          <img src={client} alt="" className="w-full" />
        </div>
      ))}
    </div>
  );
};

const ClientListComponent = ({ pageType, clients }) => {
  return (
    <div className={pageType === "/" ? "" : "text-center w-full h-fit p-4 md:p-0 flex flex-col items-center justify-center gap-16 mt-10"}>
      {pageType === "/" ? (
        <div>
          <div className="text-[18px] font-semibold text-black text-center gap-4">
            <h1>Telah dipercaya membantu</h1>
            <h1>
              <span className="text-[var(--themeRed)]">100 ribu+ </span>perusahaan ternama
            </h1>
          </div>
          <ClientList clients={clients} reversed />
        </div>
      ) : (
        <div className="w-full">
          <h1 className="text-base md:text-xl font-semibold ">
            Kami telah membantu dan dipercayai oleh <span className="text-[var(--themeRed)]">100+ </span> umkm ternama
          </h1>
          <div className="text-wrapper flex flex-row items-center justify-center">
            <ClientList clients={clients} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientListComponent;
