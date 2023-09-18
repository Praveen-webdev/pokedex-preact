

function ProfileCard({image,title}) {
  return (
    <div class='profile-card rounded btn-shadow-inset push-btn' >
    <img src={image} class='profile-img' alt='' role='presentation' />
    <h4 class='profile-title'>{title}</h4>
  </div>
  );
}

export default ProfileCard;