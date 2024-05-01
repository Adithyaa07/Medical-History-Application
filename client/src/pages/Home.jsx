import HeroImage from '../assets/HeroImage.png';
import HospitalLoginImage from '../assets/HospitalLoginImage.png';
import HospitalRegisterImage from '../assets/HospitalRegisterImage.png';
const Services = [
  {
    name: "Medical Records Management",
    description:
      "Efficiently manage medical records with our advanced system. ",
    
    bgColor: "bg-blue-500/70",
  },
  {
    name: "Improved Care Quality",
    description:
      "A medical record management system enables physicians to access patients' medical information. ",
   
    bgColor: "bg-lime-500/70",
  },
  {
    name: "Data Integration",
    description:
      "The health information stored on medical records is vital for patients as it influences providers' treatment decisions.",
   
    bgColor: "bg-fuchsia-500/70",
  },
  {
    name: "Data Security",
    description:
      "Ensure the security and confidentiality of medical data.",
    
    bgColor: "bg-orange-500/70",
  },
];

const Home = () => {
  return (
    <>
      <div   data-aos="fade-up"
            data-aos-delay="300"
            className="min-h-[550px]  ">
        <div className="min-h-[550px] flex justify-center items-center backdrop-blur-xl py-12 sm:py-0 ">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">

              <div className="flex flex-col justify-center gap-6 sm:pt-0 lg:px-16">
                <h1
                  data-aos="fade-up"
                  className="text-3xl sm:text-4xl font-bold"
                >
                  Welcome to DOC-VAULT
                </h1>
                <p
                  data-aos="fade-up"
                  className="text-xl text-white-500 tracking-wide leading-8"
                >
                  We offer a comprehensive medical records management system to streamline your operations and improve patient care.
                </p>
              </div>
              <div data-aos="flip-up">
                <img
                  src={HeroImage}
                  alt="Hospital Login"
                  className="  max-w-[450px] h-[350px] w-full mx-auto drop-shadow-[5px_5px_12px_rgba(0,0,0,0.7)] object-cover hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div   data-aos="fade-up"
            data-aos-delay="300"
            className="min-h-[550px]  ">
        <div className="min-h-[550px] flex justify-center items-center backdrop-blur-xl py-12 sm:py-0 ">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* Image section */}
              <div data-aos="flip-up">
                <img
                  src={HospitalLoginImage}
                  alt="Hospital Login"
                  className="  max-w-[450px] h-[350px] w-full mx-auto drop-shadow-[5px_5px_12px_rgba(0,0,0,0.7)] object-cover hover:scale-110"
                />
              </div>
              {/* text content section */}
              <div className="flex flex-col justify-center gap-6 sm:pt-0 lg:px-16">
                <h1
                  data-aos="fade-up"
                  className="text-3xl sm:text-4xl font-bold"
                >
                  What does  DOC-VAULT do...
                </h1>
                <p
                  data-aos="fade-up"
                  className="text-xl text-white-500 tracking-wide leading-8"
                >
                  Medical records management is organizing and handling patients’ health information in a way convenient for medical professionals to access and carry out healthcare workflows. Patient records are created when people walk into a clinic or healthcare center for the first time. Health records management involves rules, regulations, procedures, and protocols to manage health records throughout their existence. This involves updating, modifying, communicating with other providers, and ensuring privacy and integrity. Managing health records is important since the data it contains leads to treatment decisions by doctors.  
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section data-aos="fade-up"
            data-aos-delay="700" className="py-10">
  <div className="container px-8 mx-auto flex flex-col items-center">
    <h1 className="inline-block text-3xl text-center font-bold mb-3 border-b-2 border-primary pb-1">
      Services
    </h1>
    <p className="text-white-500 text-center md:w-[50%] mx-auto text-xl  ">
      Explore our range of services designed to enhance your medical practice.
    </p>
  </div>
  <div>
    <section className="my-10 container px-4 mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 5">
        {Services.map(({ name, description, image, bgColor }) => (
          <div
            key={name}
            className={`${bgColor} rounded-xl bg-blue-500/70 text-white bg-[url('${image}')] bg-cover bg-no-repeat  bg-center bg-blend-overlay`}
          >
            <div className="p-3 hover:scale-125 md:p-16 space-y-3 rounded-xl">
              <h1 className="text-2xl font-bold">{name}</h1>
              <p>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
    </section>
 
<div   data-aos="fade-up"
            data-aos-delay="300"
            className="min-h-[550px]  ">
        <div className="min-h-[550px] flex justify-center items-center backdrop-blur-xl py-12 sm:py-0 ">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* Image section */}
              
              {/* text content section */}
              <div className="flex flex-col justify-center gap-6 sm:pt-0 lg:px-16">
                <h1
                  data-aos="fade-up"
                  className="text-3xl sm:text-4xl font-bold"
                >
         Your Patients Notes Are Safe and Secure with the DOC-VAULT         
                </h1>
                <p
                  data-aos="fade-up"
                  className="text-xl text-white-500 tracking-wide leading-8"
                >
Doc-vault is GDPR compliant and makes data security a top priority.
We store personally identifiable information completely separately from medical data.                  
                </p>
              </div>
              <div data-aos="flip-up">
                <img
                  src={HospitalRegisterImage}
                  alt="Hospital Login"
                  className="  max-w-[450px] h-[350px] w-full mx-auto drop-shadow-[5px_5px_12px_rgba(0,0,0,0.7)] object-cover hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1 className=" text-center text-3xl  font-bold  h-14 ">
            Solutions We Offer
          </h1>       
                    <div  data-aos="fade-up" data-aos-delay="700" className="min-h-[265px]">
            <section className="blogs gap-9 flex justify-center">

              <div className="max-w-sm p-6 bg-white border-4 hover:scale-110 border-cyan-400 rounded-lg shadow dark:bg-gray-800 dark:border-white-700 ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 stroke-cyan-500 hover:stroke-cyan-700 animate-bounce h-6">
            <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875Z" />
            <path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 0 0 1.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 0 0 1.897 1.384C6.809 12.164 9.315 12.75 12 12.75Z" />
            <path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 15.914 9.315 16.5 12 16.5Z" />
            <path d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 19.664 9.315 20.25 12 20.25Z" />
          </svg>

                <a href="#">
                  <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-cyan-400">Medical Records Management</h5>
                </a>
                <p className="mb-3 font-normal text-gray-900 dark:text-cyan-400">Explore our medical records management system for efficient and secure storage of patient records.</p>
                
              </div>


              <div className="max-w-sm  p-6 bg-white border-4 hover:scale-110 border-cyan-400 rounded-lg shadow dark:bg-gray-800 dark:border-white-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 stroke-cyan-500 hover:stroke-cyan-700 animate-bounce h-6">
            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
          </svg>

                <a href="#">
                  <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-cyan-400">Appointment Scheduling</h5>
                </a>
                <p className="mb-3 font-normal text-gray-900 dark:text-cyan-400">Efficiently manage patient appointments and schedules with our intuitive scheduling system.</p>
                
              </div>

              <div className="max-w-sm p-6 bg-white border-4 hover:scale-110 border-cyan-400 rounded-lg shadow dark:bg-gray-800 dark:border-white-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 stroke-cyan-500 hover:stroke-cyan-700 animate-bounce h-6">
            <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
          </svg>

                <a href="#">
                  <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-cyan-400">Patient Portal</h5>
                </a>
                <p className="mb-3 font-normal text-gray-900 dark:text-cyan-400">Empower patients with access to their medical records, appointment history, and more through our secure patient portal.</p>
                    </div>
            </section>
          </div>
<div  data-aos="fade-up" data-aos-delay="700" className="min-h-[275px]">
<section className="blogs gap-9 flex justify-center">

<div className="max-w-sm p-6 bg-white border-4 hover:scale-110 border-cyan-400 rounded-lg shadow dark:bg-gray-800 dark:border-white-700 ">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" stroke-cyan-500 hover:stroke-cyan-700 animate-bounce w-6 h-6">
  <path d="M11.625 16.5a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75Z" />
  <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm6 16.5c.66 0 1.277-.19 1.797-.518l1.048 1.048a.75.75 0 0 0 1.06-1.06l-1.047-1.048A3.375 3.375 0 1 0 11.625 18Z" clipRule="evenodd" />
  <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
</svg>


  <a href="#">
    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-cyan-400">Remote patient Monitoring</h5>
  </a>
  <p className="mb-3 font-normal text-gray-900 dark:text-cyan-400">Explore our medical records management system for efficient and secure storage of patient records.</p>
  
</div>


<div className="max-w-sm  p-6 bg-white border-4 hover:scale-110 border-cyan-400 rounded-lg shadow dark:bg-gray-800 dark:border-white-700">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 stroke-cyan-400 animate-bounce">
  <path d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49ZM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276ZM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985Z" clipRule="evenodd" />
</svg>


  <a href="#">
    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-cyan-400">Healthcare Integration</h5>
  </a>
  <p className="mb-3 font-normal text-gray-900 dark:text-cyan-400">Efficiently manage patient appointments and schedules with our intuitive scheduling system.</p>
  
</div>

<div className="max-w-sm p-6 bg-white border-4 hover:scale-110 border-cyan-400 rounded-lg shadow dark:bg-gray-800 dark:border-white-700">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 stroke-cyan-400 animate-bounce">
  <path fillRule="evenodd" d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.54 15h6.42l.5 1.5H8.29l.5-1.5Zm8.085-8.995a.75.75 0 1 0-.75-1.299 12.81 12.81 0 0 0-3.558 3.05L11.03 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 0 0 1.146-.102 11.312 11.312 0 0 1 3.612-3.321Z" clipRule="evenodd" />
</svg>




  <a href="#">
    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-cyan-400">Healthcare Analytics</h5>
  </a>
  <p className="mb-3 font-normal text-gray-900 dark:text-cyan-400">Empower patients with access to their medical records, appointment history, and more through our secure patient portal.</p>
  
</div>


</section>
</div>


    </>
  );
}

export default Home;