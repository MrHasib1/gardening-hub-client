import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useLoaderData, useNavigate } from "react-router";
import { MdDelete, MdEmail } from "react-icons/md";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { BsMessenger } from "react-icons/bs";

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

const MyTips = () => {
  const { user } = useContext(AuthContext);
  const allData = useLoaderData();
  const navigate = useNavigate();
  const chatRef = useRef();

  const [tipsData, setTipsData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const userEmail = user?.email;

  // Filter user tips dynamically
  useEffect(() => {
    if (allData && userEmail) {
      const userTips = allData.filter((data) => data.email === userEmail);
      setTipsData(userTips);
    }
  }, [allData, userEmail]);

  // Load messages
  useEffect(() => {
    fetch("http://localhost:3000/getMessage")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

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

    fetch("http://localhost:3000/chatting", {
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
        fetch(`http://localhost:3000/allTipsData/${_id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire("Deleted!", "Your tip has been removed.", "success");
              setTipsData((prev) => prev.filter((tip) => tip._id !== _id));
            }
          });
      }
    });
  };

  return (
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

        {/* Messenger Button */}
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
          {/* LARGE RESPONSIVE MODAL */}
          <div className="modal-box w-full max-w-xl md:max-w-3xl lg:max-w-4xl h-[80vh] flex flex-col">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setIsChatOpen(false)}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg mb-2">🌿 GreenChat</h3>

            {/* Chat List */}
            <div
              ref={chatRef}
              className="flex-1 overflow-y-auto bg-gray-100 p-3 rounded-lg mb-3 border border-green-200"
            >
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`flex items-start gap-2 mb-3 ${
                    msg.sender === user.email ? "justify-end" : ""
                  }`}
                >
                  {msg.sender !== user.email && (
                    <img
                      src={msg.photo}
                      className="w-8 h-8 rounded-full"
                      alt="avatar"
                    />
                  )}

                  {/* Bubble Style */}
                  <div
                    className={`p-2 rounded-xl max-w-[70%] ${
                      msg.sender === user.email
                        ? "bg-green-500 text-white"
                        : "bg-white border text-black"
                    }`}
                  >
                    <p className="text-sm font-bold">{msg.name}</p>
                    <p>{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Send Message */}
            <form onSubmit={handleMessage} className="flex gap-2">
              <input
                name="message"
                placeholder="Type a message..."
                className="input input-bordered w-full"
              />
              <button className="btn bg-green-600 text-white">Send</button>
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
  );
};

export default MyTips;
