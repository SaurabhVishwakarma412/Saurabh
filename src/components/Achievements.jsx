import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { achievements, personalInfo } from "../utils/constants";

const fallbackGithub = {
  repos: achievements.github.repos,
  recentCommits: achievements.github.commits,
  followers: achievements.github.followers,
  following: achievements.github.following,
};

const fallbackLeetcode = {
  solved: achievements.leetcode.solved,
  easy: achievements.leetcode.easy,
  medium: achievements.leetcode.medium,
  hard: achievements.leetcode.hard,
};

const getGithubUsername = (url) => {
  try {
    return new URL(url).pathname.split("/").filter(Boolean)[0];
  } catch {
    return "SaurabhVishwakarma412";
  }
};

const getLeetcodeUsername = (url) => {
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    return parts[0] === "u" ? parts[1] : parts[0];
  } catch {
    return "Saurabh_Vishwakarma01";
  }
};

const normalizeLeetcodeStats = (data) => ({
  solved: data.totalSolved ?? data.solvedProblem ?? fallbackLeetcode.solved,
  easy: data.easySolved ?? fallbackLeetcode.easy,
  medium: data.mediumSolved ?? fallbackLeetcode.medium,
  hard: data.hardSolved ?? fallbackLeetcode.hard,
});

const LiveStats = () => {
  const githubUsername = useMemo(() => getGithubUsername(personalInfo.github), []);
  const leetcodeUsername = useMemo(() => getLeetcodeUsername(personalInfo.leetcode), []);
  const [github, setGithub] = useState(fallbackGithub);
  const [leetcode, setLeetcode] = useState(fallbackLeetcode);
  const [status, setStatus] = useState({
    github: "loading",
    leetcode: "loading",
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchGithub = async () => {
      try {
        const [profileResponse, eventsResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${githubUsername}`, {
            signal: controller.signal,
          }),
          fetch(`https://api.github.com/users/${githubUsername}/events/public?per_page=100`, {
            signal: controller.signal,
          }),
        ]);

        if (!profileResponse.ok) {
          throw new Error("GitHub profile request failed");
        }

        const profile = await profileResponse.json();
        let recentCommits = fallbackGithub.recentCommits;

        if (eventsResponse.ok) {
          const events = await eventsResponse.json();
          recentCommits = Array.isArray(events)
            ? events.reduce((total, event) => {
                if (event.type !== "PushEvent") return total;
                return total + (event.payload?.commits?.length || 0);
              }, 0)
            : fallbackGithub.recentCommits;
        }

        setGithub({
          repos: profile.public_repos ?? fallbackGithub.repos,
          recentCommits,
          followers: profile.followers ?? fallbackGithub.followers,
          following: profile.following ?? fallbackGithub.following,
        });
        setStatus((current) => ({ ...current, github: "live" }));
      } catch (error) {
        if (error.name !== "AbortError") {
          setStatus((current) => ({ ...current, github: "fallback" }));
        }
      }
    };

    const fetchLeetcode = async () => {
      try {
        const endpoints = [
          `https://leetcode-api-faisalshohag.vercel.app/${leetcodeUsername}`,
          `https://alfa-leetcode-api.onrender.com/${leetcodeUsername}/solved`,
          `https://leetcode-stats-api.herokuapp.com/${leetcodeUsername}`,
        ];

        let stats = null;

        for (const endpoint of endpoints) {
          try {
            const response = await fetch(endpoint, { signal: controller.signal });
            if (!response.ok) continue;

            const data = await response.json();
            if (data.status === "error") continue;

            stats = normalizeLeetcodeStats(data);
            break;
          } catch (error) {
            if (error.name === "AbortError") throw error;
          }
        }

        if (!stats) {
          throw new Error("LeetCode stats unavailable");
        }

        setLeetcode(stats);
        setStatus((current) => ({ ...current, leetcode: "live" }));
      } catch (error) {
        if (error.name !== "AbortError") {
          setStatus((current) => ({ ...current, leetcode: "fallback" }));
        }
      }
    };

    fetchGithub();
    fetchLeetcode();

    return () => controller.abort();
  }, [githubUsername, leetcodeUsername]);

  const Card = ({ title, icon, href, sourceStatus, children }) => (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-purple-500/30 transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 opacity-0 hover:opacity-100 transition duration-500"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3 text-white text-lg font-semibold">
            <span className="p-2 rounded-lg bg-white/10">{icon}</span>
            {title}
          </div>
          <span className="text-xs text-purple-200 bg-white/10 border border-white/10 px-3 py-1 rounded-full">
            {sourceStatus === "loading" ? "Loading" : sourceStatus === "live" ? "Live" : "Cached"}
          </span>
        </div>
        {children}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-purple-200 hover:text-white transition-colors duration-300"
        >
          View More <FiExternalLink />
        </a>
      </div>
    </motion.div>
  );

  const Stat = ({ label, value }) => (
    <div className="flex justify-between items-center py-1">
      <span className="text-indigo-300 text-sm">{label}</span>
      <span className="text-white font-bold text-lg">{value}</span>
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-br from-[#181435] to-[#2d1c43]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">
          Live Stats
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Card
            title="GitHub"
            icon={<FiGithub className="text-purple-400 text-xl" />}
            href={personalInfo.github}
            sourceStatus={status.github}
          >
            <div className="space-y-2">
              <Stat label="Repositories" value={github.repos} />
              <Stat label="Recent Commits" value={github.recentCommits} />
              <Stat label="Followers" value={github.followers} />
              <Stat label="Following" value={github.following} />
            </div>
          </Card>

          <Card
            title="LeetCode"
            icon={<SiLeetcode className="text-yellow-400 text-xl" />}
            href={personalInfo.leetcode}
            sourceStatus={status.leetcode}
          >
            <div className="space-y-2">
              <Stat label="Solved" value={leetcode.solved} />
              <Stat label="Easy" value={leetcode.easy} />
              <Stat label="Medium" value={leetcode.medium} />
              <Stat label="Hard" value={leetcode.hard} />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LiveStats;
