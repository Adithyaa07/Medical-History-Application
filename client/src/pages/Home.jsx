import { Button } from "flowbite-react";
import HeroImage from "../assets/HeroImage.png";
import HospitalLoginImage from "../assets/HospitalLoginImage.png";
import { Link } from "react-router-dom";

const Services = [
  {
    name: "Medical Records Management",
    description:
      "Efficiently manage medical records with our advanced system. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum laudantium beatae quidem.",
    image: "https://picsum.photos/200/300",
    bgColor: "bg-blue-500/70",
  },
  {
    name: "Appointment Scheduling",
    description:
      "Easily schedule appointments and manage patient bookings. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum laudantium beatae quidem.",
    image: "https://picsum.photos/200/301",
    bgColor: "bg-lime-500/70",
  },
  {
    name: "Billing and Payment",
    description:
      "Streamline billing and payment processes for patients. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum laudantium beatae quidem.",
    image: "https://picsum.photos/200/302",
    bgColor: "bg-fuchsia-500/70",
  },
  {
    name: "Data Security",
    description:
      "Ensure the security and confidentiality of medical data. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum laudantium beatae quidem.",
    image: "https://picsum.photos/200/303",
    bgColor: "bg-orange-500/70",
  },
];

const Home = () => {
  return (
    <>
      <section className="container flex h-[650px] flex-col items-center justify-center md:h-[500px] dark:bg-gray-900 dark:text-gray-300">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          {/* dark:text-white  */}
          <div
            data-aos="fade-right"
            data-aos-duration="400"
            data-aos-once="true"
            className="flex flex-col items-center gap-4 text-center md:items-center md:text-center md:ml-8 px-9"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl">DOC VAULT</h1>
            <p className="text-lg">
              Our aim is to develop a solution for nationwide health information
              network that brings patient and hospitals to a single platform.
            </p>
            <div className="space-x-4">
              <Link to="/sign-in">
                <Button className="rounded-md border-2 border-teal-400 px-4 py-2 text-sm  transition-colors duration-300 hover:bg-primary/80 dark:border-white dark:hover:bg-primary/80">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="400"
            data-aos-once="true"
            className="mx-auto max-w-md p-4"
          >
            <img
              src={HeroImage}
              alt="No image"
              className="hover:drop-shadow-md w-full md:w-96 h-full"
            />
          </div>
        </div>
      </section>
      <div className="min-h-[550px] ">
        <div className="min-h-[550px] flex justify-center items-center backdrop-blur-xl py-12 sm:py-0 ">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* Image section */}
              <div data-aos="flip-up">
                <img
                  src={HospitalLoginImage}
                  alt="Hospital Login"
                  className="max-w-[450px] h-[350px] w-full mx-auto drop-shadow-[5px_5px_12px_rgba(0,0,0,0.7)] object-cover"
                />
              </div>
              {/* text content section */}
              <div className="flex flex-col justify-center gap-6 sm:pt-0 lg:px-16">
                <h1
                  data-aos="fade-up"
                  className="text-3xl sm:text-4xl font-bold"
                >
                  Welcome to DOC-VAULT
                </h1>
                <p
                  data-aos="fade-up"
                  className="text-sm text-gray-500 tracking-wide leading-8"
                >
                  We offer a comprehensive medical records management system to
                  streamline your operations and improve patient care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className=" py-10">
        <div className="container flex flex-col items-center">
          <h1 className="inline-block text-3xl text-center font-bold mb-3 border-b-2 border-primary pb-1">
            Services
          </h1>
          <p className="text-slate-500 text-center md:w-[50%] mx-auto">
            Explore our range of services designed to enhance your medical
            practice.
          </p>
        </div>
        <div>
          <section className="my-10 container">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Services.map(({ name, description, image, bgColor }) => (
                <div
                  key={name}
                  className={` ${bgColor} rounded-xl  bg-blue-500/70 text-white  bg-[url('${image}')] bg-cover bg-no-repeat bg-center bg-blend-overlay`}
                >
                  <div className="p-3 md:p-16 backdrop-blur-sm space-y-3 rounded-xl">
                    <h1 className="text-2xl font-bold">{name}</h1>
                    <p>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Home;
