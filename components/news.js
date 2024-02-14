export async function fetchNews(limit) {
  try {
    const url = `https://content.newtonschool.co/v1/pr/64e3d1b73321338e9f18e1a1/inshortsnews?limit=${limit}`;
    const resp = await fetch(url, {
      method: "GET",
    });
    return await resp.json();
  } catch (error) {
    console.log("couldn't fetch news api", error);
  }
}
