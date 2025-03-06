const HomeCard = () => {
  const datas = [
    {
      logo: (
        <i className="ri-bar-chart-fill rounded-full px-2 py-[5px] text-2xl bg-gradient-to-r   from-green-500 to-blue-400  text-white"></i>
      ),
      title: "Expense Tracking",
      description:
        "Keep track of all your expenses in one place with intuitive categorization and tagging.",
    },
    {
      logo: (
        <i className="ri-line-chart-line rounded-full px-2 py-[5px] text-2xl bg-gradient-to-r   from-green-500 to-blue-400  text-white"></i>
      ),
      title: "Spending Analytics",
      description:
        "Visualize your spending habits with beautiful charts and gain insights on where your money goes.",
    },
    {
      logo: (
        <i className="ri-pie-chart-line rounded-full px-2 py-[5px] text-2xl bg-gradient-to-r   from-green-500 to-blue-400  text-white"></i>
      ),
      title: "Financial Reports",
      description:
        "Generate detailed reports to understand your finances and make better decisions.",
    },
  ];

  const smDatas = [
    {
      logo: (
        <i className="ri-group-line rounded-full px-2 py-[5px] text-2xl bg-gradient-to-r   from-green-500 to-blue-400  text-white"></i>
      ),
      desc: "Active Users",
      stat: "10,000+",
    },
    {
      logo: (
        <i className="ri-bank-card-fill rounded-full px-2 py-[5px] text-2xl bg-gradient-to-r   from-green-500 to-blue-400  text-white"></i>
      ),
      desc: "Expenses Tracked",
      stat: "$100K+",
    },
    {
      logo: (
        <i className="ri-money-dollar-circle-line rounded-full px-2 py-[5px] text-2xl bg-gradient-to-r   from-green-500 to-blue-400 text-white"></i>
      ),
      desc: "User Satisfaction",
      stat: "96%",
    },
    {
      logo: (
        <i className="ri-bar-chart-line rounded-full px-2 py-[5px] text-2xl bg-gradient-to-r   from-green-500 to-blue-400  text-white"></i>
      ),
      desc: "Transaction Managed",
      stat: "95K+",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100/40">
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {datas.map((data, index) => (
          <div
            key={index}
            className=" border-[1px] bg-gradient-to-r from-blue-100 to-green-100 border-zinc-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-sm p-6 text-center"
          >
            <div className="flex justify-center mb-3">{data.logo}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {data.title}
            </h2>
            <p className="text-gray-600">{data.description}</p>
          </div>
        ))}
      </div>

      {/* <div className="flex justify-center mt-5 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full px-4">
          {smDatas.map((data, index) => (
            <div
              key={index}
              className="border-[1px] bg-gradient-to-r from-blue-100 to-green-100 border-zinc-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 px-8 py-6 text-center"
            >
              <div className="flex text-2xl justify-center mb-3">
                {data.logo}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {data.stat}
              </h2>
              <p className="text-gray-600">{data.desc}</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default HomeCard;
