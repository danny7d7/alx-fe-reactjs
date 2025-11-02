// src/components/UserProfile.jsx
function UserProfile({ name, age, bio }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>{bio}</p>
    </div>
  );
}

export default UserProfile;
