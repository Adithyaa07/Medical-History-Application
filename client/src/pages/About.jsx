const testimonialData = [
  {
    name: "Dr. Smith",
    image: "",
    description:
      "The medical records management system has revolutionized the way we handle patient data. It's efficient, secure, and user-friendly.",
    aosDelay: "0",
  },
  {
    name: "Nurse Emily",
    image: "",
    description:
      "I've been using the system for months now, and I can't imagine going back to the old way of managing records. It's made my job much easier.",
    aosDelay: "300",
  },
  {
    name: "Patient Sarah",
    image: "",
    description:
      "As a patient, I appreciate how the system streamlines the process of accessing my medical records. It saves time and ensures accuracy.",
    aosDelay: "1000",
  },
];

function About() {
  return (
    <div>
      <div className="dark:bg-black dark:text-white py-14 sm:pb-24">
        <div className="container">
          {/* Header */}
          <div className="space-y-4 pb-12">
            <p
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              What Our Clients Say About Us
            </p>
            <p data-aos="fade-up" className="text-center sm:px-44">
              Hear from our clients about their experience with our medical
              records management system.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-black dark:text-white">
            {testimonialData.map((testimonial) => (
              <div
                key={testimonial.name}
                data-aos="fade-up"
                data-aos-delay={testimonial.aosDelay}
                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-12 dark:bg-white/20 bg-gray-100 duration-300  rounded-lg "
              >
                <div className="grid place-items-center ">
                  <img
                    src="https://picsum.photos/200"
                    alt=""
                    className="rounded-full w-20 h-20"
                  />
                </div>
                <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                <p>{testimonial.description}</p>
                <p className="text-center font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
