// import { Helmet } from "react-helmet";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Footer from "../components/things/Footer";
import Navbar from "../components/things/Navbar";

const About = () => {
  return (
    <div className="bg-gradient-to-r from-zinc-100/60 to-blue-100/40">
      {/* <Helmet> */}
      <title>PennyPal   |  About</title>
      {/* </Helmet> */}

      <Navbar />
      <div className="pt-32 pb-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-medium text-primary bg-primary/10 rounded-full">
            Our Story
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Bringing Clarity to Your Finances
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gray-600 mb-6 text-lg">
                At Clarity, we believe that financial management should be
                simple, intuitive, and accessible to everyone. Our mission is to
                help people gain control over their finances and achieve their
                financial goals with confidence.
              </p>
              <p className="text-gray-600 mb-6">
                Founded in 2020, Clarity has grown from a small startup to a
                trusted financial management platform used by thousands of
                people worldwide. We're committed to continuous improvement and
                innovation, always putting our users' needs first.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <IoMdCheckmarkCircleOutline className="h-5 w-5 text-primary mt-0.5 mr-3" />

                  <p>
                    Built with simplicity and ease-of-use as our guiding
                    principles
                  </p>
                </div>
                <div className="flex items-start">
                  <IoMdCheckmarkCircleOutline className="h-5 w-5 text-primary mt-0.5 mr-3" />

                  <p>
                    Committed to best-in-class security and privacy protection
                  </p>
                </div>
                <div className="flex items-start">
                  <IoMdCheckmarkCircleOutline className="h-5 w-5 text-primary mt-0.5 mr-3" />

                  <p>Continuous development based on user feedback and needs</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG9mZmljZSUyMHRlYW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
                alt="Team working together"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-4 md:px-6 ">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 mb-6 text-xs font-medium text-primary bg-primary/10 rounded-full bg-green-200/70 text-green-700">
              Our Values
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1  md:grid-cols-3 gap-8 mb-20">
            {[
              {
                title: "Simplicity",
                description:
                  "We believe in making financial management straightforward and accessible to everyone, regardless of their financial background.",
              },
              {
                title: "Transparency",
                description:
                  "We're committed to being open about how we operate and ensuring our users understand their financial data.",
              },
              {
                title: "Security",
                description:
                  "Your financial data is sensitive, and we take its protection seriously with industry-leading security measures.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-gradient-to-r from-blue-200 to-green-200 border border-gray-100 shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
