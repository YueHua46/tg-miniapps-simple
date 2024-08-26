function Invite() {
  const userId = "12345"; // 假设这是当前用户的ID
  const inviteLink = `${window.location.origin}/invite/${userId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    alert("Link copied to clipboard!");
  };

  return (
    <div>
      <h3>Share your invite link:</h3>
      <p>{inviteLink}</p>
      <button onClick={copyToClipboard}>Copy Invite Link</button>
      <button
        onClick={() =>
          window.open(
            `https://wa.me/?text=Join%20me%20on%20this%20awesome%20app%20via%20this%20link:%20${encodeURIComponent(
              inviteLink
            )}`,
            "_blank"
          )
        }
      >
        Share via WhatsApp
      </button>
      <button
        onClick={() =>
          window.open(
            `mailto:?subject=Join%20me&body=Join%20me%20on%20this%20awesome%20app%20via%20this%20link:%20${encodeURIComponent(
              inviteLink
            )}`,
            "_blank"
          )
        }
      >
        Share via Email
      </button>
    </div>
  );
}

export default Invite;
