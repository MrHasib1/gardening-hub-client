import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router";
import { MdDelete, MdEmail } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BsMessenger } from "react-icons/bs";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import Loading from "../components/Loading";

// Tip Card Component
const TipCard = ({ tip, onUpdate, onDelete }) => {
  return (
    <div className="card bg-white shadow-lg border border-green-200">
      <figure>
        <img
          src={tip.image}
          className="h-48 w-full object-cover"
          alt={tip.title}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-green-700">{tip.title}</h2>
        <p className="text-gray-600">{tip.description}</p>
        <div className="flex justify-between mt-2">
          <button
            onClick={() => onUpdate(tip._id)}
            className="btn btn-sm bg-pink-500 text-white"
          >
            <FaEdit /> Update
          </button>
          <button
            onClick={() => onDelete(tip._id)}
            className="btn btn-sm bg-red-500 text-white"
          >
            <MdDelete /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// MyTips Page
const MyTips = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const chatEndRef = useRef(null);

  const [tipsData, setTipsData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch tips & messages
  useEffect(() => {
    if (!user) return;

    fetch("https://gardening-hub-server-chi.vercel.app/allTipsData")
      .then((res) => res.json())
      .then((allData) => {
        const userTips = allData.filter(
          (tip) => tip.email === user.email
        );
        setTipsData(userTips);
      });

    fetch("https://gardening-hub-server-chi.vercel.app/getMessage")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, [user]);

  // Loading control (FeatureGardeners pattern)
  useEffect(() => {
    if (Array.isArray(tipsData) && Array.isArray(messages)) {
      setLoading(false);
    }
  }, [tipsData, messages]);

  // Auto scroll to bottom (Messenger behavior)
  useEffect(() => {
    if (isChatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isChatOpen]);

  // Send message
  const handleMessage = (e) => {
    e.preventDefault();
    const message = e.target.message.value.trim();
    if (!message) return;

    const newMessage = {
      sender: user.email,
      name: user.displayName,
      photo: user.photoURL,
      message,
      time: Date.now(),
    };

    fetch("https://gardening-hub-server-chi.vercel.app/chatting", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setMessages((prev) => [
            ...prev,
            { ...newMessage, _id: data.insertedId },
          ]);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Message sent!",
            showConfirmButton: false,
            timer: 900,
          });
        }
        e.target.reset();
      });
  };

  // Delete tip
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this tip?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://gardening-hub-server-chi.vercel.app/allTipsData/${_id}`,
          { method: "DELETE" }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire(
                "Deleted!",
                "Your tip has been removed.",
                "success"
              );
              setTipsData((prev) =>
                prev.filter((tip) => tip._id !== _id)
              );
            }
          });
      }
    });
  };

  // Loading screen
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>GardeningHub | MyTips</title>
      </Helmet>

      <div className="min-h-screen py-5 px-3 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-5 bg-gray-100 shadow-md p-5 rounded-lg border border-green-200">
          <div className="flex items-center gap-5">
            <div className="avatar">
              <div className="w-20 h-20 rounded-full ring ring-green-400 ring-offset-2">
                <img src={user?.photoURL} alt={user?.displayName} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-700">
                {user?.displayName}
              </h2>
              <div className="flex gap-1 items-center">
                <MdEmail className="text-green-500 text-xl" />
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
          </div>

          <button
            className="btn btn-sm mt-4 md:mt-0"
            onClick={() => setIsChatOpen(true)}
          >
            <BsMessenger className="text-xl text-green-600" />
            <span className="text-green-600 ml-1">GreenChat</span>
          </button>
        </div>

        {/* Chat Modal */}
        {isChatOpen && (
          <dialog open className="modal">
            <div className="modal-box w-full max-w-3xl h-[80vh] flex flex-col">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setIsChatOpen(false)}
              >
                ✕
              </button>

              <h3 className="font-bold text-lg mb-2">🌿 GreenChat</h3>

              <div className="flex-1 overflow-y-auto bg-gray-100 p-3 rounded-lg mb-3 border border-green-200">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`flex items-start gap-2 mb-3 ${
                      msg.sender === user.email ? "justify-end" : ""
                    }`}
                  >
                    {msg.sender !== user.email && (
                      <>
                        {msg.photo ? (
                          <img
                            src={msg.photo}
                            className="w-12 h-12 rounded-full"
                            alt="avatar"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                            {msg.name?.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </>
                    )}

                    <div
                      className={`p-2 rounded-xl max-w-[70%] ${
                        msg.sender === user.email
                          ? "bg-green-500 text-white"
                          : "bg-white border text-black"
                      }`}
                    >
                      <p>{msg.message}</p>
                      <p className="text-sm font-bold">{msg.name}</p>
                    </div>
                  </div>
                ))}

                {/* Scroll anchor */}
                <div ref={chatEndRef}></div>
              </div>

              <form onSubmit={handleMessage} className="flex gap-2">
                <input
                  name="message"
                  placeholder="Type a message..."
                  className="input input-bordered w-full"
                />
                <button className="btn bg-green-600 text-white">
                  Send
                </button>
              </form>
            </div>
          </dialog>
        )}

        {/* Tips Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tipsData.length ? (
            tipsData.map((tip) => (
              <TipCard
                key={tip._id}
                tip={tip}
                onUpdate={(id) => navigate(`/updateTip/${id}`)}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No tips found. Share some tips!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyTips;
