/* eslint-disable no-unused-vars */
import { MdOutlineMessage } from "react-icons/md";
import {
  Alert,
  Button,
  Label,
  Modal,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Campaigns() {
  const { currentHospital } = useSelector((state) => state.hospital);
  const [formData, setFormData] = useState({});
  const [campaign, setCampaign] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await fetch(
          "/api/campaign/getCampaign"
          // ?userId=${currentHospital._id}
        );
        const data = await res.json();
        if (res.ok) {
          setCampaign(data.campaigns);
          if (data.campaigns.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCampaign();
  }, []);

  const handleShowMore = async () => {
    const startIndex = campaign.length;
    try {
      const res = await fetch(
        `/api/campaign/getCampaign?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setCampaign((prev) => [...prev, ...data.campaigns]);
        if (data.campaigns.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.offer || !formData.hospital || !formData.Message) {
      return setErrorMessage("Please fill in all fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/campaign/createCampaign", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.errorMessage || "Failed to add Campaign");
      }

      setLoading(false);
      navigate("/dashboard?tab=campaigns");
      setShowModal(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="table-auto w-4/5 overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <h1 className="text-left text-2xl my-7 font-semibold rounded-lg flex-col">
        Available Campaigns
      </h1>

      <div onClick={() => setShowModal(true)} className="py-5 flex justify-end">
        <Button>Add Campaign +</Button>
      </div>

      {campaign &&
        campaign.map((doc, index) => (
          <div key={index} className="w-full border border-teal-500 hover:border-2 rounded-lg mt-3 overflow-hidden sm:w-[430px] p-2 transition-all gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center m-1 rounded bg-pink-500">
                <MdOutlineMessage size={20} color="white" />
              </div>
              <div>
                <div className="text-sm">Offer: {doc.offer}</div>
                <div className="text-sm">By: {doc.hospital}</div>
              </div>
            </div>
            <div className="border-b my-4"></div>
            <div className="font-bold">Message</div>
            <div className="text-sm italic">{doc.Message}</div>
            <div className="border-b my-4"></div>
            <div className="text-sm">
              Created at: {new Date(doc.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}

      <div>
        <Modal show={showModal} onClose={() => setShowModal(false)} popup>
          <Modal.Header>
            <div className="text-center p-3 text-2xl my-7 font-bold">
              Add New Campaigns
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="w-900 h-900">
              <form className="flex flex-col gap-2 w-700" onSubmit={handleSubmit}>
                <div className="gap-3 mt-2 py-2">
                  <Label className="text-gray-600">Campaign Offer</Label>
                  <TextInput className="border rounded-md w-full" type="text" placeholder="Offer" id="offer" onChange={handleChange} />

                  <Label className="text-gray-600">Offered By</Label>
                  <TextInput className="border rounded-md w-full" type="text" id="hospital" onChange={handleChange} />
                </div>
                <div>
                  <Label className="text-gray-600 gap-1 text-wrap p-3">
                    Message
                  </Label>
                  <TextInput className="border p-2 rounded-md" id="Message" onChange={handleChange} />
                </div>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-md hover:from-pink-500 hover:to-purple-500 transition-all duration-300" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner size="sm" />
                      <span className="pl-3">Loading</span>
                    </>
                  ) : (
                    "Add Campaign"
                  )}
                </Button>
              </form>
            </div>
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Campaigns;
