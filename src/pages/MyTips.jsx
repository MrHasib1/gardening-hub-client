import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useLoaderData, useNavigate } from "react-router";
import { MdDelete, MdEmail } from "react-icons/md";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";

const MyTips = () => {
  const { user } = useContext(AuthContext);
  const allData = useLoaderData();
  const navigate = useNavigate();

  const userEmail = user?.email;
  const userData = allData.filter((data) => data.email === userEmail);

  const [tipsData, setTipsData] = useState(userData);
  console.log(tipsData);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You wan't to delete this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      // console.log(_id, result.isConfirmed);
      if (result.isConfirmed) {
        //start delete in the db
        fetch(`http://localhost:3000/allTipsData/${_id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            console.log("after delete", data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted Successfully!",
                text: "Your Tips has been deleted.",
                icon: "success",
              });

              // remove the tips from the state
              const remainingTips = tipsData.filter((tip) => tip._id !== _id);
              setTipsData(remainingTips);
            }
          });
      }
    });
  };

  return (
    <div className="min-h-screen  py-5 px-5">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-5 bg-gray-100 shadow-md p-5 rounded-lg border border-green-200">
        <div className="flex items-center gap-5">
          <div className="avatar">
            <div className="w-20 h-20 rounded-full ring ring-green-400 ring-offset-base-100 ring-offset-2">
              <img src={user?.photoURL} />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-green-700">
              {user?.displayName}
            </h2>
            <div className="flex gap-1 items-center">
              <MdEmail className="text-green-500 text-xl" />
              <p className="text-gray-600">Email: {user?.email}</p>
            </div>
          </div>
        </div>

        <div className="text-right mt-4 md:mt-0">
          <h3 className="text-xl font-semibold text-green-700">
            My Total Tips:{" "}
            <span className="text-green-600">{tipsData.length}</span>
          </h3>
        </div>
      </div>

      {/* My Tips Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tipsData.map((tip) => (
          <div
            key={tip._id}
            className="card bg-white shadow-lg border border-green-200 hover:shadow-2xl transition-all"
          >
            <figure>
              <img
                src={tip.image}
                alt={tip.title}
                className="h-48 w-full object-cover rounded-t-xl"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-green-700">{tip.title}</h2>
              <p className="text-green-600 font-bold text-sm mb-2">
                <span className="font-semibold text-black">Category:</span>{" "}
                {tip.category}
              </p>
              <p className="text-gray-700 text-sm line-clamp-3">
                {tip.description}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-green-600 font-bold capitalize">
                  <span className="text-black">Availability:</span>{" "}
                  {tip.availability}
                </p>
                <p className="font-bold text-black">
                  Level: <span className="text-green-600 ">{tip.level}</span>{" "}
                </p>
              </div>
              <div className="flex justify-between items-center ">
                <p className="font-bold">
                  <span className="text-black">Topic:</span>{" "}
                  <span className="text-green-500">{tip.topic}</span>
                </p>
                <p className="text-sm font-bold">
                  👍<span className="text-black"> {tip.totalLiked || 0}</span>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => navigate(`/updateTip/${tip._id}`)}
                  className="btn btn-sm bg-pink-500 hover:bg-pink-600 text-white"
                >
                  <FaEdit className="text-base" />
                  Update
                </button>
                <button
                  onClick={() => handleDelete(tip._id)}
                  className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                >
                  {" "}
                  <MdDelete className="text-base" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {userData.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          You haven’t shared any garden tips yet 🌱
        </p>
      )}
    </div>
  );
};

export default MyTips;
