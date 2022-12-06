const exchangeCodeForToken = async (code) => {
  console.log('CALLING MOCK exchangeCodeForToken!');
  return 'MOCK TOKEN FOR CODE';
};

const getGithubProfile = async (token) => {
  console.log('CALLING MOCK getGithubProfile');
  return {
    login: 'fake_github_user',
    avatar_url: 'https://www.placecage.com/gif/300/300',
    email: 'not-real@example.com',
  };
};

module.exports = { exchangeCodeForToken, getGithubProfile };
