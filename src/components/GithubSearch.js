import React, { useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { RiBuildingFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import "./GithubSearch.css";

const GithubSearch = () => {
  // Store input value in state
  const [username, setUsername] = useState("");
  // Store response in state
  const [profile, setProfile] = useState(null);
  // Error message if request fails
  const [error, setError] = useState(null);

  // handling the form submission
  const submitHandler = async (e) => {
    //prevent page refresh on form submission
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      console.log(response.data);
      setProfile(response.data);
      setError(null);
    } catch (error) {
      setProfile(null);
      setError("User Not Found!");
    }
  };

  return (
    <div className="mainContainer">
      <h1 className="mainHeading">Github Profile Detective</h1>
      <form className="searchForm" onSubmit={submitHandler}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="searchInput"
          placeholder="Enter GitGub Username.."
        />
        <button type="submit" className="searchBtn">
          Search
        </button>
      </form>

      {error && <p className="errorMsg">{error}</p>}
      {profile && (
        <div className="profileContainer">
          <div className="profileContent">
            <div className="profileImg">
              <img
                src={profile.avatar_url}
                className="ProfileAvatar"
                alt="Avatar"
              />
            </div>
            <div className="profileDetails">
              <div className="profileDes">
                <h2 className="profileName">{profile.login}</h2>
                <p className="profileCreatedDt">
                  Joined: {new Date(profile.created_at).toLocaleDateString()}
                </p>
              </div>
              <a
                href={profile.html_url}
                className="profileUsername"
                target="_blank"
                rel="noreferrer"
              >
                @{profile.login}
              </a>
              <p className="profileBio">{profile.bio}</p>
              <div className="profileStats">
                <p className="profileRepos">
                  Repositories <br />
                  <span className="stats">{profile.public_repos}</span>
                </p>
                <p className="profileFollowers">
                  Followers <br />
                  <span className="stats">{profile.followers}</span>
                </p>
                <p className="profileFollowing">
                  Following <br />
                  <span className="stats">{profile.following}</span>
                </p>
              </div>
              <div className="profileInfo">
                <p className="profileLocation">
                  <FaMapMarkerAlt />
                  {profile.location}
                </p>
                <p className="profileCompany">
                  <RiBuildingFill />
                  {profile.company}
                </p>
              </div>
              <div className="profileLinks">
                <a
                  href={`https://twitter.com/${profile.twitter_username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="twitterLink"
                >
                  <FaXTwitter />
                  {profile.twitter_username}
                </a>
                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="githubLink"
                >
                  <FaGithub /> View Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GithubSearch;
