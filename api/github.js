const GITHUB_API_BASE = "https://api.github.com";

const getGithubHeaders = () => {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
};

const countRecentPushCommits = (events) => {
  if (!Array.isArray(events)) return 0;

  return events.reduce((total, event) => {
    if (event.type !== "PushEvent") return total;
    return total + (event.payload?.commits?.length || 0);
  }, 0);
};

export default async function handler(req, res) {
  const username = String(req.query.username || "").trim();

  if (!username) {
    return res.status(400).json({ error: "GitHub username is required." });
  }

  try {
    const headers = getGithubHeaders();
    const [profileResponse, eventsResponse] = await Promise.all([
      fetch(`${GITHUB_API_BASE}/users/${encodeURIComponent(username)}`, { headers }),
      fetch(`${GITHUB_API_BASE}/users/${encodeURIComponent(username)}/events/public?per_page=100`, { headers }),
    ]);

    if (!profileResponse.ok) {
      return res.status(profileResponse.status).json({ error: "GitHub profile request failed." });
    }

    const profile = await profileResponse.json();
    const events = eventsResponse.ok ? await eventsResponse.json() : [];

    return res.status(200).json({
      repos: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
      recentCommits: countRecentPushCommits(events),
    });
  } catch (error) {
    return res.status(500).json({ error: "GitHub stats unavailable." });
  }
}
