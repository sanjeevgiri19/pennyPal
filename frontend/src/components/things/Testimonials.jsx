import React from 'react'

const Testimonials = () => {

  const testimonials = [
    {
      quote:
        "PennyPal has completely transformed how I manage my personal finances. The interface is beautiful and intuitive.",
      author: "Sarah Johnson",
      role: "Marketing Director",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      quote:
        "I've tried many expense tracking apps, but PennyPal is by far the most elegant and user-friendly solution.",
      author: "Michael Chen",
      role: "Software Engineer",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    {
      quote:
        "The analytics are incredibly insightful. I can finally understand where my money is going without any hassle.",
      author: "Emily Rodriguez",
      role: "Freelance Designer",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];


  return (
    <div className="">
      {/* <div className="">
        <h2 className="text-sm text-[#0070f0] mx-auto  text-center rounded-full items-center justify-center  w-28 py-1 bg-[#0070f0]/10">
          Testimonials
        </h2>

        <h2 className=" flex flex-col text-center items-center justify-center text-4xl mt-6 md:text-4xl text-[#020817] font-bold">
          Loved by thousands of users
        </h2>

        <h2 className="text-zinc-600 text-[19px] font- mx-auto w-[50%] mt-6 px-5 text-center">
          Here's what some of our users have to say about their experience with
          Clarity.
        </h2>
      </div> */}

      <section className="py-20 px-4 md:px-6 bg-gradient-to-l from-green-100/80 to-blue-100/80">
        <div className="container mx-auto max-w-6xl">
          <div className="">
            <h2 className="text-sm text-green-600 mx-auto  text-center rounded-full items-center justify-center  w-28 py-1 bg-green-200/40">
              Testimonials
            </h2>

            <h2 className=" flex flex-col text-center items-center justify-center text-4xl mt-6 md:text-4xl text-[#020817] font-bold">
              Loved by thousands of users
            </h2>

            <h2 className="text-zinc-600 text-[19px] font- mx-auto w-[50%] mt-6 px-5 text-center">
              Here's what some of our users have to say about their experience
              with Clarity.
            </h2>
          </div>

          <div className="grid grid-cols-1 my-16 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 rounded-xl bg-gradient-to-r from-blue-100 to-green-100 border border-gray-100 relative"
              >
                <div className="absolute -top-5 -left-2 text-primary text-6xl opacity-20">
                  "
                </div>
                <p className="text-gray-700 mb-6 relative z-10">
                  {testimonial.quote}
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-medium">{testimonial.author}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Testimonials