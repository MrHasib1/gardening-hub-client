import React, { use, useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router";
import { FaLeaf, FaEnvelope, FaUser, FaLayerGroup } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const TipsDetails = () => {
  const { user } = use(AuthContext);
  const tipsData = useLoaderData();
  const { id } = useParams();
  const [tip, setTip] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const foundTip = tipsData.find((tipData) => tipData._id === id);
    setTip(foundTip);
    if (foundTip) setLikeCount(foundTip.totalLiked || 0);
  }, [tipsData, id]);

  const handleLike = async () => {
    if (!tip) return;
    const newLikes = likeCount + 1;
    setLikeCount(newLikes);
    setIsLiked(true);

    try {
      await fetch(
        `https://gardening-hub-server-chi.vercel.app/browseTips/${tip._id}`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ totalLiked: newLikes }),
        }
      );
    } catch (err) {
      console.error("Failed to update like count:", err);
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const name = user.displayName;
    const photo = user.photoURL;

    const newComment = { name, photo, comment, id };
    const form = e.target;
    // console.log(newComment);

    fetch("https://gardening-hub-server-chi.vercel.app/comment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.insertedId) {
          setComments((prev) => [...prev, newComment]);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Share comment Successfully",
            color: "#065f46",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: "mt-6 rounded-2xl shadow-lg border border-green-200",
            },
          });
          form.reset();
        }
      });
  };

  useEffect(() => {
    fetch("https://gardening-hub-server-chi.vercel.app/getComment")
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  }, []);

  if (!tip)
    return (
      <div className="min-h-screen flex justify-center items-center text-green-700">
        Loading tip details... 🌿
      </div>
    );

  return (
    <div>
      <Helmet>
        <title>GardeningHub | Tip-Details</title>
      </Helmet>
      <header>
        <Navbar></Navbar>
      </header>

      <main>
        <div className="min-h-screen bg-gradient-to-b from-green-50  to-green-200 py-10 px-5">
          <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-green-200 overflow-hidden">
            {/* Header image */}
            <div className="relative">
              <img
                src={tip.image}
                alt={tip.title}
                className="w-full h-80 object-cover rounded-t-2xl"
              />
            </div>

            {/* Tip Details */}
            <div className="p-6 space-y-3">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-green-100 rounded-xl p-2 border border-green-300 shadow-md">
                <h1 className="text-3xl md:text-4xl font-bold text-green-800 text-center md:text-left leading-snug max-w-3xl">
                  {tip.title}
                </h1>

                {/* Like Box */}
                <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm px-3 py-3 rounded-2xl border border-green-300 shadow-md hover:shadow-lg transition-all duration-300">
                  <p className="text-sm font-medium text-green-700 mb-2">
                    Is this tip helpful?
                  </p>
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      isLiked
                        ? "bg-pink-100 text-pink-600 border border-pink-400"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    <BiSolidLike className="text-xl" />
                    <span className="font-semibold">{likeCount}</span>
                  </button>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                {tip.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <p className="flex items-center gap-2">
                  <FaLayerGroup className="text-green-600" />
                  <span className="font-semibold">Category:</span>{" "}
                  {tip.category}
                </p>
                <p className="flex items-center gap-2">
                  <FaLeaf className="text-green-600" />
                  <span className="font-semibold">Level:</span>{" "}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tip.level === "easy"
                        ? "bg-green-200 text-green-700"
                        : tip.level === "medium"
                        ? "bg-yellow-200 text-yellow-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {tip.level}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <FaUser className="text-green-600" />
                  <span className="font-semibold">Publisher:</span> {tip.name}
                </p>
                <p className="flex items-center gap-2">
                  <FaEnvelope className="text-green-600" />
                  <span className="font-semibold">Email:</span> {tip.email}
                </p>
                <p>
                  <span className="font-semibold text-green-700">Topic:</span>{" "}
                  {tip.topic}
                </p>
                <p>
                  <span className="font-semibold text-green-700">
                    Availability:
                  </span>{" "}
                  {tip.availability}
                </p>
              </div>
              <div className="flex justify-end">
                <Link to="/browseTips">
                  <button className="btn btn-primary">
                    <IoMdArrowRoundBack />
                    Back
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleComment}
            className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 border border-green-300 space-y-4 mt-5"
          >
            <h2 className="text-2xl font-semibold text-green-700 text-center">
              Comment
            </h2>

            <input
              name="comment"
              placeholder="Write your comment here..."
              className="input-ghost w-full h-10 border-2 rounded-xl border-b-2 border-dashed p-3 border-b-black focus:outline-none focus:ring-2 focus:ring-green-400"
            ></input>

            <input
              type="submit"
              value="Submit"
              className="w-full btn bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl transition-all duration-300 cursor-pointer"
            />
          </form>

          <div className=" bg-gray-200 py-3 px-5 mt-5">
            <div className="max-w-2xl mx-auto mt-10 space-y-4">
              {/* Section Title */}
              <h2 className="text-3xl font-bold text-green-800 mb-4 text-center">
                User Comments 🌿
              </h2>

              {/* Show "No Comments" message OR comment list */}
              {comments.filter((c) => c.id === id).length === 0 ? (
                <p className="text-gray-600 text-center bg-white p-4 rounded-xl shadow-md border border-green-200">
                  No comments yet. Be the first to comment! 🌱
                </p>
              ) : (
                comments
                  .filter((c) => c.id === id)
                  .map((comment) => (
                    <div
                      key={comment._id}
                      className="bg-gradient-to-r from-green-200 via-teal-200 to-green-100 p-4 rounded-xl shadow-md border border-green-300 flex gap-4 hover:shadow-xl transition-all duration-300"
                    >
                      <img
                        src={comment.photo}
                        alt="User"
                        className="w-12 h-12 rounded-full border border-green-300 object-cover shadow-sm"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold text-green-800 text-lg">
                          {comment.name}
                        </h3>
                        <p className="text-gray-700 mt-1">{comment.comment}</p>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </main>

      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default TipsDetails;
