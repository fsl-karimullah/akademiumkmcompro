const OurClient = () => {
  const Clients = ["MNC.png", "MNC.png", "MNC.png", "MNC.png", "MNC.png", "MNC.png", "MNC.png", "MNC.png", "MNC.png"];
  const reversedClients = [...Clients].reverse();

  return (
    <div className="flex flex-col gap-4">
      <div className="text-[18px] font-semibold text-black text-center gap-4">
        <h1>Telah dipercaya membantu</h1>
        <h1>
          <span className="text-[var(--themeRed)]">100 ribu+ </span>perusahaan ternama
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {reversedClients.map((client, index) => (
          <div key={index} className="w-64">
            <img src={client} alt="" className="w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurClient;
